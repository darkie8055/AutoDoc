import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../App"
import BottomNav from "../components/BottomNav"
import Card from "../components/Card"
import Icon from "react-native-vector-icons/Feather"

type Props = NativeStackScreenProps<RootStackParamList, "Websites">

export default function WebsitesScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Website Tracker</Text>
        <TouchableOpacity>
          <Icon name="plus" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#6B7280" />
          <TextInput style={styles.searchInput} placeholder="Search websites..." placeholderTextColor="#9CA3AF" />
        </View>

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Total Sites</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[styles.statNumber, styles.dangerText]}>3</Text>
            <Text style={styles.statLabel}>Suspicious</Text>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tracked Websites</Text>

          <TouchableOpacity>
            <Card style={styles.websiteCard}>
              <View style={styles.websiteIcon}>
                <Icon name="globe" size={24} color="#14B8A6" />
              </View>
              <View style={styles.websiteContent}>
                <Text style={styles.websiteName}>Online Banking</Text>
                <Text style={styles.websiteUrl}>bank.example.com</Text>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Verified</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={20} color="#9CA3AF" />
            </Card>
          </TouchableOpacity>

          <TouchableOpacity>
            <Card style={styles.websiteCard}>
              <View style={styles.websiteIcon}>
                <Icon name="globe" size={24} color="#14B8A6" />
              </View>
              <View style={styles.websiteContent}>
                <Text style={styles.websiteName}>Government Portal</Text>
                <Text style={styles.websiteUrl}>gov.in</Text>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Verified</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={20} color="#9CA3AF" />
            </Card>
          </TouchableOpacity>

          <TouchableOpacity>
            <Card style={styles.websiteCard}>
              <View style={[styles.websiteIcon, styles.warningIcon]}>
                <Icon name="alert-triangle" size={24} color="#F97316" />
              </View>
              <View style={styles.websiteContent}>
                <Text style={styles.websiteName}>Suspicious Link</Text>
                <Text style={styles.websiteUrl}>fake-bank.xyz</Text>
                <View style={[styles.statusBadge, styles.warningBadge]}>
                  <View style={[styles.statusDot, styles.warningDot]} />
                  <Text style={[styles.statusText, styles.warningText]}>Flagged</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={20} color="#9CA3AF" />
            </Card>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <BottomNav activeTab="Security" />
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
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "700",
    color: "#14B8A6",
    marginBottom: 4,
  },
  dangerText: {
    color: "#EF4444",
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  section: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  websiteCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    marginBottom: 12,
  },
  websiteIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F0FDFA",
    alignItems: "center",
    justifyContent: "center",
  },
  warningIcon: {
    backgroundColor: "#FFF7ED",
  },
  websiteContent: {
    flex: 1,
  },
  websiteName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  websiteUrl: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#D1FAE5",
    gap: 6,
  },
  warningBadge: {
    backgroundColor: "#FEF3C7",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
  },
  warningDot: {
    backgroundColor: "#F59E0B",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#065F46",
  },
  warningText: {
    color: "#92400E",
  },
})
