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

export default function UploadScreen({ navigation }: Props) {
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);

  const handleImagePicked = async (response: ImagePickerResponse) => {
    console.log('Image picker response:', response);

    if (response.didCancel) {
      console.log('User cancelled');
      return;
    }

    if (response.errorCode) {
      console.log('Picker error:', response.errorCode, response.errorMessage);
      Alert.alert('Error', response.errorMessage || 'Failed to pick image');
      return;
    }

    const asset = response.assets?.[0];
    if (!asset?.uri) {
      console.log('No asset URI');
      Alert.alert('Error', 'No image selected');
      return;
    }

    console.log('Image picked:', asset.uri);

    try {
      setUploading(true);

      // Generate unique document ID
      const docId = `doc-${Date.now()}`;

      console.log('Uploading with docId:', docId);

      // Upload image and trigger OCR
      await uploadImageForOcr(asset.uri, docId);

      console.log('Upload complete');
      setUploading(false);
      setProcessing(true);

      // Listen to OCR status
      const unsubscribe = listenToOcrStatus(docId, result => {
        if (result) {
          setOcrResult(result);

          if (result.status === 'ocr_done') {
            setProcessing(false);
            Alert.alert(
              'OCR Complete!',
              `Extracted Text:\n\n${result.rawText?.substring(0, 200)}...`,
              [
                {
                  text: 'View Full Text',
                  onPress: () => console.log(result.rawText),
                },
                { text: 'OK' },
              ],
            );
            unsubscribe();
          } else if (result.status === 'failed') {
            setProcessing(false);
            Alert.alert('OCR Failed', result.error || 'Unknown error');
            unsubscribe();
          }
        }
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploading(false);
      setProcessing(false);
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
    console.log('Gallery button pressed');
    Alert.alert('Debug', 'Gallery button clicked');
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
        {/* Processing Status */}
        {(uploading || processing) && (
          <Card style={styles.statusCard}>
            <ActivityIndicator size="large" color="#14B8A6" />
            <Text style={styles.statusText}>
              {uploading ? 'Uploading image...' : 'Processing OCR...'}
            </Text>
          </Card>
        )}

        {/* Take Photo Card */}
        <TouchableOpacity
          style={styles.primaryCard}
          onPress={handleTakePhoto}
          disabled={uploading || processing}
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
          style={styles.secondaryCard}
          onPress={handlePickFromGallery}
          disabled={uploading || processing}
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
});
