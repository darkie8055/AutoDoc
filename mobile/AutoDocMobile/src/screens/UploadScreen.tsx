import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../App';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/Feather';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { useState, useEffect } from 'react';
import {
  uploadImageForOcr,
  listenToOcrStatus,
  OcrResult,
} from '../services/ocrService';

type Props = NativeStackScreenProps<MainStackParamList, 'Upload'>;

// STAGE 10: Upload states
type UploadState = 'idle' | 'uploading' | 'processing' | 'done' | 'failed';

export default function UploadScreen({ navigation }: Props) {
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImagePicked = async (response: ImagePickerResponse) => {
    if (response.didCancel) {
      return;
    }

    if (response.errorCode) {
      Alert.alert('Error', response.errorMessage || 'Failed to pick image');
      return;
    }

    const asset = response.assets?.[0];
    if (!asset?.uri) {
      Alert.alert('Error', 'No image selected');
      return;
    }

    try {
      setUploadState('uploading');
      setUploadProgress(0);
      setErrorMessage(null);

      // Generate unique document ID
      const docId = `doc-${Date.now()}`;

      // Simulate progress during upload (Firebase Storage doesn't provide real progress in RN)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      // Upload image and trigger OCR
      await uploadImageForOcr(asset.uri, docId);

      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadState('processing');

      // Listen to OCR status
      const unsubscribe = listenToOcrStatus(docId, result => {
        console.log('📱 Received OCR update:', result?.status);

        if (result) {
          setOcrResult(result);

          if (result.status === 'ocr_done') {
            console.log(
              '✅ OCR complete, extracted text length:',
              result.rawText?.length,
            );
            setUploadState('done');
            Alert.alert(
              'OCR Complete!',
              `Extracted Text:\n\n${result.rawText?.substring(0, 200)}...`,
              [
                {
                  text: 'OK',
                  onPress: () => {
                    setUploadState('idle');
                    setUploadProgress(0);
                  },
                },
              ],
            );
            unsubscribe();
          } else if (result.status === 'failed') {
            console.log('❌ OCR failed:', result.error);
            setUploadState('failed');
            setErrorMessage(result.error || 'OCR processing failed');
            Alert.alert('OCR Failed', result.error || 'Unknown error');
            unsubscribe();
          }
        }
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadState('failed');
      setErrorMessage(error.message || 'Failed to upload image');
      Alert.alert('Upload Failed', error.message || 'Failed to upload image');
    }
  };

  const handleTakePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.8,
        saveToPhotos: false,
      },
      handleImagePicked,
    );
  };

  const handlePickFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      handleImagePicked,
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Upload</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* STAGE 10: Upload Status with Progress */}
        {uploadState !== 'idle' && (
          <Card style={styles.statusCard}>
            {(uploadState === 'uploading' || uploadState === 'processing') && (
              <ActivityIndicator size="large" color="#14B8A6" />
            )}

            {uploadState === 'uploading' && (
              <>
                <Text style={styles.statusText}>Uploading image...</Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${uploadProgress}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{uploadProgress}%</Text>
              </>
            )}

            {uploadState === 'processing' && (
              <>
                <Text style={styles.statusText}>Processing OCR...</Text>
                <View style={styles.progressBar}>
                  <View
                    style={[styles.progressFill, styles.progressIndeterminate]}
                  />
                </View>
                <Text style={styles.progressText}>
                  Extracting text from document...
                </Text>
              </>
            )}

            {uploadState === 'done' && (
              <>
                <Icon name="check-circle" size={48} color="#10B981" />
                <Text style={styles.statusText}>OCR Complete!</Text>
              </>
            )}

            {uploadState === 'failed' && (
              <>
                <Icon name="x-circle" size={48} color="#EF4444" />
                <Text style={styles.statusText}>Upload Failed</Text>
                {errorMessage && (
                  <Text style={styles.errorText}>{errorMessage}</Text>
                )}
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={() => {
                    setUploadState('idle');
                    setErrorMessage(null);
                    setUploadProgress(0);
                  }}
                >
                  <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
              </>
            )}
          </Card>
        )}

        {/* Take Photo Card */}
        <TouchableOpacity
          style={[
            styles.primaryCard,
            (uploadState === 'uploading' || uploadState === 'processing') &&
              styles.cardDisabled,
          ]}
          onPress={handleTakePhoto}
          disabled={uploadState === 'uploading' || uploadState === 'processing'}
        >
          <View style={styles.primaryIcon}>
            <Icon name="camera" size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.primaryTitle}>Take Photo</Text>
          <Text style={styles.primarySubtitle}>
            Use camera to capture document
          </Text>
        </TouchableOpacity>

        {/* Upload from Gallery Card */}
        <TouchableOpacity
          style={[
            styles.secondaryCard,
            (uploadState === 'uploading' || uploadState === 'processing') &&
              styles.cardDisabled,
          ]}
          onPress={handlePickFromGallery}
          disabled={uploadState === 'uploading' || uploadState === 'processing'}
        >
          <View style={styles.secondaryIcon}>
            <Icon name="upload" size={40} color="#6B7280" />
          </View>
          <Text style={styles.secondaryTitle}>Upload from Gallery</Text>
          <Text style={styles.secondarySubtitle}>Choose from your files</Text>
        </TouchableOpacity>

        {/* Tips for Best Results */}
        <Card style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Icon name="file-text" size={20} color="#6B7280" />
            <Text style={styles.tipsTitle}>Tips for Best Results</Text>
          </View>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>
                Ensure good lighting and clear visibility
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>
                Keep the document flat and aligned
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Avoid shadows and glare</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Make sure all text is readable</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  primaryCard: {
    backgroundColor: '#14B8A6',
    borderRadius: 16,
    padding: 48,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#14B8A6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  primaryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  primarySubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  secondaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 48,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  secondaryIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  secondaryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  secondarySubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  tipsCard: {
    padding: 24,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  tipBullet: {
    fontSize: 14,
    color: '#14B8A6',
    fontWeight: '700',
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  statusCard: {
    padding: 24,
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#14B8A6',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#14B8A6',
    borderRadius: 4,
  },
  progressIndeterminate: {
    width: '100%',
    opacity: 0.6,
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  errorText: {
    marginTop: 8,
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#14B8A6',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cardDisabled: {
    opacity: 0.5,
  },
});
