import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../App';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/Feather';

type Props = NativeStackScreenProps<MainStackParamList, 'DocumentDetail'>;

export default function DocumentDetailScreen({ navigation, route }: Props) {
  const { document } = route.params;

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'processing':
        return { label: 'Processing', color: '#F59E0B' };
      case 'ocr_done':
        return { label: 'Completed', color: '#10B981' };
      case 'failed':
        return { label: 'Failed', color: '#EF4444' };
      default:
        return { label: 'Unknown', color: '#6B7280' };
    }
  };

  const statusInfo = getStatusInfo(document.status);
  const uploadDate = document.uploadedAt?.toDate
    ? new Date(document.uploadedAt.toDate()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Unknown date';
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Document Details</Text>
        <TouchableOpacity>
          <Icon name="more-vertical" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.imageContainer}>
          <View style={styles.placeholderImage}>
            <Icon name="file-text" size={64} color="#14B8A6" />
            <Text style={styles.placeholderText}>Document Preview</Text>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Document Information</Text>

          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Document ID</Text>
              <Text style={styles.infoValue}>{document.id}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Upload Date</Text>
              <Text style={styles.infoValue}>{uploadDate}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Content Type</Text>
              <Text style={styles.infoValue}>
                {document.contentType || 'image/jpeg'}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: statusInfo.color },
                ]}
              >
                <Text style={styles.statusText}>{statusInfo.label}</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* STAGE 11: Extracted Text Section */}
        {document.status === 'ocr_done' && document.rawText && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Extracted Text</Text>
            <Card style={styles.textCard}>
              <ScrollView style={styles.textScrollView}>
                <Text style={styles.extractedText}>{document.rawText}</Text>
              </ScrollView>
            </Card>
          </View>
        )}

        {document.status === 'processing' && (
          <View style={styles.section}>
            <Card style={styles.processingCard}>
              <Icon name="clock" size={48} color="#F59E0B" />
              <Text style={styles.processingText}>
                OCR processing in progress...
              </Text>
            </Card>
          </View>
        )}

        {document.status === 'failed' && (
          <View style={styles.section}>
            <Card style={styles.errorCard}>
              <Icon name="x-circle" size={48} color="#EF4444" />
              <Text style={styles.errorTitle}>Processing Failed</Text>
              <Text style={styles.errorMessage}>
                {document.error || 'Unknown error occurred'}
              </Text>
            </Card>
          </View>
        )}

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share-2" size={20} color="#14B8A6" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Icon name="download" size={20} color="#14B8A6" />
            <Text style={styles.actionButtonText}>Download</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.dangerButton]}>
            <Icon name="trash-2" size={20} color="#EF4444" />
            <Text style={[styles.actionButtonText, styles.dangerText]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
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
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  imageContainer: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: 24,
  },
  placeholderImage: {
    height: 300,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  infoCard: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  textCard: {
    padding: 16,
    maxHeight: 400,
  },
  textScrollView: {
    maxHeight: 360,
  },
  extractedText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
  },
  processingCard: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
  },
  processingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
  },
  errorCard: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
  },
  errorTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#991B1B',
  },
  errorMessage: {
    marginTop: 8,
    fontSize: 14,
    color: '#DC2626',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dangerButton: {
    backgroundColor: '#FEE2E2',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#14B8A6',
  },
  dangerText: {
    color: '#EF4444',
  },
});
