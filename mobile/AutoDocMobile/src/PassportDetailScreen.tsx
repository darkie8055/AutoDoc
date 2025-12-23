import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../App"
import Card from "../components/Card"
import Icon from "react-native-vector-icons/Feather"

type Props = NativeStackScreenProps<RootStackParamList, "PassportDetail">

export default function PassportDetailScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Passport Details</Text>
        <TouchableOpacity>
          <Icon name="edit-2" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.photoCard}>
          <View style={styles.photoPlaceholder}>
            <Icon name="user" size={64} color="#14B8A6" />
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <Card style={styles.dataCard}>
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Full Name</Text>
              <Text style={styles.dataValue}>John Michael Doe</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Date of Birth</Text>
              <Text style={styles.dataValue}>15 Jan 1990</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Gender</Text>
              <Text style={styles.dataValue}>Male</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Nationality</Text>
              <Text style={styles.dataValue}>Indian</Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Passport Details</Text>

          <Card style={styles.dataCard}>
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Passport Number</Text>
              <Text style={styles.dataValue}>J1234567</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Issue Date</Text>
              <Text style={styles.dataValue}>10 Dec 2018</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Expiry Date</Text>
              <Text style={styles.dataValue}>09 Dec 2028</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Place of Issue</Text>
              <Text style={styles.dataValue}>Mumbai</Text>
            </View>
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
  photoCard: {
    padding: 0,
    overflow: "hidden",
    marginBottom: 24,
  },
  photoPlaceholder: {
    height: 200,
    backgroundColor: "#F0FDFA",
    alignItems: "center",
    justifyContent: "center",
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
