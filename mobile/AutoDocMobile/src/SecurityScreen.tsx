import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../App"
import BottomNav from "../components/BottomNav"
import Card from "../components/Card"
import Icon from "react-native-vector-icons/Feather"

type Props = NativeStackScreenProps<RootStackParamList, "Security">

export default function SecurityScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Security</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Security Score Card */}
        <Card style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <View>
              <Text style={styles.scoreTitle}>Security Score</Text>
              <Text style={styles.scoreSubtitle}>Based on your security practices</Text>
            </View>
            <View style={styles.scoreValueContainer}>
              <Text style={styles.scoreValue}>90</Text>
              <Text style={styles.scoreMax}>/ 100</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "90%" }]} />
          </View>

          <View style={styles.scoreStatus}>
            <Icon name="trending-up" size={16} color="#14B8A6" />
            <Text style={styles.scoreStatusText}>Excellent Security</Text>
          </View>
        </Card>

        {/* Security Stats Grid */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <View style={styles.statIcon}>
              <Icon name="lock" size={20} color="#14B8A6" />
            </View>
            <Text style={styles.statLabel}>ENCRYPTED</Text>
            <Text style={styles.statValue}>4/4</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statIcon}>
              <Icon name="check-circle" size={20} color="#14B8A6" />
            </View>
            <Text style={styles.statLabel}>VERIFIED</Text>
            <Text style={styles.statValue}>3/4</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={[styles.statIcon, styles.blueIcon]}>
              <Icon name="shield" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.statLabel}>SAFE SITES</Text>
            <Text style={styles.statValue}>3</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={[styles.statIcon, styles.redIcon]}>
              <Icon name="alert-triangle" size={20} color="#EF4444" />
            </View>
            <Text style={styles.statLabel}>BLOCKED</Text>
            <Text style={styles.statValue}>2</Text>
          </Card>
        </View>

        {/* Security Features */}
        <Text style={styles.sectionTitle}>Security Features</Text>

        <View style={styles.featuresList}>
          <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate("Websites")}>
            <View style={styles.featureInfo}>
              <View style={styles.featureIcon}>
                <Icon name="globe" size={20} color="#6B7280" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureName}>Website Tracker</Text>
                <Text style={styles.featureDescription}>Monitor where documents are used</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate("Phishing")}>
            <View style={styles.featureInfo}>
              <View style={[styles.featureIcon, styles.redFeatureIcon]}>
                <Icon name="alert-triangle" size={20} color="#EF4444" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureName}>Phishing Protection</Text>
                <Text style={styles.featureDescription}>2 threats blocked</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate("DocumentData")}>
            <View style={styles.featureInfo}>
              <View style={[styles.featureIcon, styles.tealFeatureIcon]}>
                <Icon name="eye" size={20} color="#14B8A6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureName}>Document Data</Text>
                <Text style={styles.featureDescription}>View extracted information</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate("Documents")}>
            <View style={styles.featureInfo}>
              <View style={[styles.featureIcon, styles.blueFeatureIcon]}>
                <Icon name="file-text" size={20} color="#3B82F6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureName}>Document Vault</Text>
                <Text style={styles.featureDescription}>4 documents stored</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Best Practices */}
        <Text style={styles.sectionTitle}>Security Best Practices</Text>

        <Card style={styles.practicesCard}>
          <View style={styles.practiceItem}>
            <Icon name="check-circle" size={16} color="#14B8A6" />
            <Text style={styles.practiceText}>All documents are encrypted end-to-end</Text>
          </View>
          <View style={styles.practiceItem}>
            <Icon name="check-circle" size={16} color="#14B8A6" />
            <Text style={styles.practiceText}>Automatic phishing detection is active</Text>
          </View>
          <View style={styles.practiceItem}>
            <Icon name="check-circle" size={16} color="#14B8A6" />
            <Text style={styles.practiceText}>Website tracking helps monitor document usage</Text>
          </View>
          <View style={styles.practiceItem}>
            <Icon name="check-circle" size={16} color="#14B8A6" />
            <Text style={styles.practiceText}>Expiry reminders keep documents updated</Text>
          </View>
        </Card>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
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
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scoreCard: {
    backgroundColor: "#F0FDFA",
    borderWidth: 2,
    borderColor: "#99F6E4",
    padding: 24,
    marginTop: 16,
    marginBottom: 24,
  },
  scoreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  scoreSubtitle: {
    fontSize: 12,
    color: "#6B7280",
  },
  scoreValueContainer: {
    alignItems: "flex-end",
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: "700",
    color: "#14B8A6",
    lineHeight: 56,
  },
  scoreMax: {
    fontSize: 12,
    color: "#6B7280",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#99F6E4",
    borderRadius: 4,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#14B8A6",
    borderRadius: 4,
  },
  scoreStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scoreStatusText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#14B8A6",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    width: "48%",
    alignItems: "center",
    paddingVertical: 16,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F0FDFA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  blueIcon: {
    backgroundColor: "#EFF6FF",
  },
  redIcon: {
    backgroundColor: "#FEF2F2",
  },
  statLabel: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  featureInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  redFeatureIcon: {
    backgroundColor: "#FEF2F2",
  },
  tealFeatureIcon: {
    backgroundColor: "#F0FDFA",
  },
  blueFeatureIcon: {
    backgroundColor: "#EFF6FF",
  },
  featureName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 12,
    color: "#6B7280",
  },
  practicesCard: {
    padding: 16,
    gap: 12,
  },
  practiceItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  practiceText: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
})
