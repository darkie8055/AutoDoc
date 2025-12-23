import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../App"
import Card from "../components/Card"
import Icon from "react-native-vector-icons/Feather"

type Props = NativeStackScreenProps<RootStackParamList, "PANDetail">

export default function PANDetailScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>PAN Card Details</Text>
        <TouchableOpacity>
          <Icon name="edit-2" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.cardPreview}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>INCOME TAX DEPARTMENT</Text>
            <Text style={styles.cardSubtitle}>GOVT. OF INDIA</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.photoPlaceholder}>
              <Icon name="user" size={48} color="#6B7280" />
            </View>
            <View style={styles.cardDetails}>
              <Text style={styles.panNumber}>ABCDE1234F</Text>
              <Text style={styles.cardName}>JOHN DOE</Text>
              <Text style={styles.cardDob}>15/01/1990</Text>
            </View>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extracted Data</Text>

          <Card style={styles.dataCard}>
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>PAN Number</Text>
              <Text style={styles.dataValue}>ABCDE1234F</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Name</Text>
              <Text style={styles.dataValue}>JOHN DOE</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Father's Name</Text>
              <Text style={styles.dataValue}>MICHAEL DOE</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Date of Birth</Text>
              <Text style={styles.dataValue}>15/01/1990</Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verification Status</Text>

          <Card style={styles.statusCard}>
            <View style={styles.statusIcon}>
              <Icon name="check-circle" size={32} color="#10B981" />
            </View>
            <Text style={styles.statusTitle}>Verified</Text>
            <Text style={styles.statusDescription}>This document has been verified with government records</Text>
          </Card>
        </View>

        <TouchableOpacity style={styles.exportButton}>
          <Icon name="download" size={20} color="#FFFFFF" />
          <Text style={styles.exportButtonText}>Export Data</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cardPreview: {
    padding: 20,
    backgroundColor: "#FFFBEB",
    marginBottom: 24,
  },
  cardHeader: {
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#D97706",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#92400E",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#92400E",
  },
  cardBody: {
    flexDirection: "row",
    gap: 16,
  },
  photoPlaceholder: {
    width: 80,
    height: 100,
    backgroundColor: "#FEF3C7",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  cardDetails: {
    flex: 1,
    justifyContent: "center",
  },
  panNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#92400E",
    marginBottom: 8,
    letterSpacing: 2,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#92400E",
    marginBottom: 4,
  },
  cardDob: {
    fontSize: 14,
    color: "#92400E",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  dataCard: {
    padding: 16,
  },
  dataRow: {
    paddingVertical: 12,
  },
  dataLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  dataValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  statusCard: {
    alignItems: "center",
    paddingVertical: 24,
  },
  statusIcon: {
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#10B981",
    marginBottom: 8,
  },
  statusDescription: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#14B8A6",
  },
  exportButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
})
