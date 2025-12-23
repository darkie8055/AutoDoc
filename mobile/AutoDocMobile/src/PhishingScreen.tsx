import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../App"
import BottomNav from "../components/BottomNav"
import Card from "../components/Card"
import Icon from "react-native-vector-icons/Feather"

type Props = NativeStackScreenProps<RootStackParamList, "Phishing">

export default function PhishingScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Phishing Protection</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.alertCard}>
          <View style={styles.alertIcon}>
            <Icon name="shield" size={32} color="#14B8A6" />
          </View>
          <Text style={styles.alertTitle}>Protection Active</Text>
          <Text style={styles.alertDescription}>Your device is protected from phishing attacks</Text>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Threats Blocked</Text>

          <Card style={styles.threatCard}>
            <View style={styles.threatHeader}>
              <View style={styles.threatIcon}>
                <Icon name="alert-triangle" size={20} color="#EF4444" />
              </View>
              <View style={styles.threatContent}>
                <Text style={styles.threatTitle}>Fake Banking Site</Text>
                <Text style={styles.threatTime}>2 hours ago</Text>
              </View>
            </View>
            <Text style={styles.threatUrl}>hxxp://fake-bank-login.xyz</Text>
            <View style={styles.threatBadge}>
              <Text style={styles.threatBadgeText}>High Risk</Text>
            </View>
          </Card>

          <Card style={styles.threatCard}>
            <View style={styles.threatHeader}>
              <View style={styles.threatIcon}>
                <Icon name="alert-triangle" size={20} color="#EF4444" />
              </View>
              <View style={styles.threatContent}>
                <Text style={styles.threatTitle}>Suspicious Email Link</Text>
                <Text style={styles.threatTime}>1 day ago</Text>
              </View>
            </View>
            <Text style={styles.threatUrl}>hxxp://verify-account-now.com</Text>
            <View style={styles.threatBadge}>
              <Text style={styles.threatBadgeText}>High Risk</Text>
            </View>
          </Card>

          <Card style={styles.threatCard}>
            <View style={styles.threatHeader}>
              <View style={[styles.threatIcon, styles.warningIcon]}>
                <Icon name="info" size={20} color="#F97316" />
              </View>
              <View style={styles.threatContent}>
                <Text style={styles.threatTitle}>Untrusted Certificate</Text>
                <Text style={styles.threatTime}>3 days ago</Text>
              </View>
            </View>
            <Text style={styles.threatUrl}>hxxps://suspicious-site.net</Text>
            <View style={[styles.threatBadge, styles.warningBadge]}>
              <Text style={styles.threatBadgeText}>Medium Risk</Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Protection Tips</Text>

          <Card style={styles.tipCard}>
            <Icon name="check-circle" size={20} color="#14B8A6" />
            <Text style={styles.tipText}>Always verify sender email addresses</Text>
          </Card>

          <Card style={styles.tipCard}>
            <Icon name="check-circle" size={20} color="#14B8A6" />
            <Text style={styles.tipText}>Never share OTP or passwords via email</Text>
          </Card>

          <Card style={styles.tipCard}>
            <Icon name="check-circle" size={20} color="#14B8A6" />
            <Text style={styles.tipText}>Check for HTTPS before entering sensitive data</Text>
          </Card>
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
    paddingHorizontal: 16,
  },
  alertCard: {
    alignItems: "center",
    paddingVertical: 32,
    marginTop: 16,
    marginBottom: 24,
  },
  alertIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F0FDFA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  alertTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  alertDescription: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  threatCard: {
    padding: 16,
    marginBottom: 12,
  },
  threatHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  threatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
  },
  warningIcon: {
    backgroundColor: "#FFF7ED",
  },
  threatContent: {
    flex: 1,
  },
  threatTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  threatTime: {
    fontSize: 12,
    color: "#6B7280",
  },
  threatUrl: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
    fontFamily: "monospace",
  },
  threatBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#FEE2E2",
  },
  warningBadge: {
    backgroundColor: "#FEF3C7",
  },
  threatBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#DC2626",
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    marginBottom: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
})
