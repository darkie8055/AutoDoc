import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../App';
import BottomNav from '../components/BottomNav';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/Feather';
import { useState } from 'react';
import { useDocuments } from '../hooks/useDocuments';

type Props = NativeStackScreenProps<MainStackParamList, 'Documents'>;

// STAGE 11: Real document status display
const getStatusInfo = (status: string) => {
  switch (status) {
    case 'processing':
      return { label: 'Processing...', color: '#F59E0B', icon: 'clock' };
    case 'ocr_done':
      return { label: 'Completed', color: '#10B981', icon: 'check-circle' };
    case 'failed':
      return { label: 'Failed', color: '#EF4444', icon: 'x-circle' };
    default:
      return { label: 'Unknown', color: '#6B7280', icon: 'help-circle' };
  }
};

export default function DocumentsScreen({ navigation }: Props) {
  const { documents, loading } = useDocuments();
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'processing' | 'completed' | 'failed'
  >('all');

  const filteredDocuments = documents.filter((doc: any) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'processing') return doc.status === 'processing';
    if (activeFilter === 'completed') return doc.status === 'ocr_done';
    if (activeFilter === 'failed') return doc.status === 'failed';
    return true;
  });

  const counts = {
    all: documents.length,
    processing: documents.filter((d: any) => d.status === 'processing').length,
    completed: documents.filter((d: any) => d.status === 'ocr_done').length,
    failed: documents.filter((d: any) => d.status === 'failed').length,
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
        <Text style={styles.title}>My Documents</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search documents..."
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          <TouchableOpacity
            style={[
              styles.filterTab,
              activeFilter === 'all' && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter('all')}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === 'all' && styles.filterTextActive,
              ]}
            >
              All ({counts.all})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterTab,
              activeFilter === 'processing' && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter('processing')}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === 'processing' && styles.filterTextActive,
              ]}
            >
              Processing ({counts.processing})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterTab,
              activeFilter === 'completed' && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter('completed')}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === 'completed' && styles.filterTextActive,
              ]}
            >
              Completed ({counts.completed})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterTab,
              activeFilter === 'failed' && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter('failed')}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === 'failed' && styles.filterTextActive,
              ]}
            >
              Failed ({counts.failed})
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Add New Document Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Upload')}
        >
          <Icon name="plus" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add New Document</Text>
        </TouchableOpacity>

        {/* STAGE 11: Loading State */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#14B8A6" />
            <Text style={styles.loadingText}>Loading documents...</Text>
          </View>
        )}

        {/* STAGE 11: Empty State */}
        {!loading && documents.length === 0 && (
          <Card style={styles.emptyState}>
            <Icon name="inbox" size={48} color="#9CA3AF" />
            <Text style={styles.emptyStateTitle}>No documents yet</Text>
            <Text style={styles.emptyStateText}>
              Upload your first document to get started
            </Text>
          </Card>
        )}

        {/* STAGE 11: Documents List with Real Data */}
        {!loading && filteredDocuments.length > 0 && (
          <View style={styles.documentsList}>
            {filteredDocuments.map((doc: any) => {
              const statusInfo = getStatusInfo(doc.status);
              return (
                <TouchableOpacity
                  key={doc.id}
                  onPress={() =>
                    navigation.navigate('DocumentDetail', {
                      documentId: doc.id,
                      document: doc,
                    })
                  }
                >
                  <Card style={styles.documentCard}>
                    <View style={styles.documentHeader}>
                      <View style={styles.documentInfo}>
                        <View
                          style={[
                            styles.documentIcon,
                            { backgroundColor: `${statusInfo.color}20` },
                          ]}
                        >
                          <Icon
                            name={statusInfo.icon as any}
                            size={20}
                            color={statusInfo.color}
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <View style={styles.documentTitleRow}>
                            <Text style={styles.documentName}>{doc.id}</Text>
                          </View>
                          <Text style={styles.documentNumber}>
                            {doc.uploadedAt?.toDate
                              ? new Date(
                                  doc.uploadedAt.toDate(),
                                ).toLocaleDateString()
                              : 'Unknown date'}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.documentFooter}>
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: `${statusInfo.color}20` },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusBadgeText,
                            { color: statusInfo.color },
                          ]}
                        >
                          {statusInfo.label}
                        </Text>
                      </View>
                      {doc.rawText && (
                        <Text style={styles.textPreview} numberOfLines={2}>
                          {doc.rawText.substring(0, 50)}...
                        </Text>
                      )}
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeTab="Documents" />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  filterTabActive: {
    backgroundColor: '#14B8A6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#14B8A6',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 24,
    gap: 8,
    shadowColor: '#14B8A6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  documentsList: {
    gap: 16,
  },
  documentCard: {
    padding: 16,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  documentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  documentNumber: {
    fontSize: 12,
    color: '#6B7280',
  },
  documentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  documentLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  documentValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  expiringText: {
    color: '#F97316',
  },
  activeBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  expiringBadge: {
    backgroundColor: '#FED7AA',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  expiringBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EA580C',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    marginTop: 20,
  },
  emptyStateTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  emptyStateText: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  textPreview: {
    marginTop: 8,
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
});
