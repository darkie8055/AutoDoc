"use client"

import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../App"
import BottomNav from "../components/BottomNav"
import Card from "../components/Card"
import Icon from "react-native-vector-icons/Feather"
import { useState } from "react"

type Props = NativeStackScreenProps<RootStackParamList, "Settings">

export default function SettingsScreen({ navigation }: Props) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [biometricEnabled, setBiometricEnabled] = useState(false)

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <TouchableOpacity style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.profileAvatar}>
              <Icon name="user" size={24} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.profileName}>John Anderson</Text>
              <Text style={styles.profileEmail}>john@example.com</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={20} color="#6B7280" />
        </TouchableOpacity>

        {/* Preferences */}
        <Text style={styles.sectionTitle}>Preferences</Text>

        <Card style={styles.settingsCard}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIcon}>
                <Icon name="bell" size={20} color="#6B7280" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingName}>Notifications</Text>
                <Text style={styles.settingDescription}>Expiry alerts & security</Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#D1D5DB", true: "#14B8A6" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.settingItem, styles.settingItemLast]}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIcon}>
                <Icon name="lock" size={20} color="#6B7280" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingName}>Biometric Lock</Text>
                <Text style={styles.settingDescription}>Face ID / Fingerprint</Text>
              </View>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: "#D1D5DB", true: "#14B8A6" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </Card>

        {/* Security & Privacy */}
        <Text style={styles.sectionTitle}>Security & Privacy</Text>

        <Card style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.settingIcon, styles.tealIcon]}>
                <Icon name="shield" size={20} color="#14B8A6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingName}>Security Dashboard</Text>
                <Text style={styles.settingDescription}>View security score</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, styles.settingItemLast]}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIcon}>
                <Icon name="lock" size={20} color="#6B7280" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingName}>Change Password</Text>
                <Text style={styles.settingDescription}>Update your password</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </Card>

        {/* Support */}
        <Text style={styles.sectionTitle}>Support</Text>

        <Card style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIcon}>
                <Icon name="help-circle" size={20} color="#6B7280" />
              </View>
              <Text style={styles.settingName}>Help Center</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, styles.settingItemLast]}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIcon}>
                <Icon name="info" size={20} color="#6B7280" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingName}>About</Text>
                <Text style={styles.settingDescription}>Version 1.0.0</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </Card>

        {/* Log Out Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="log-out" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>SecureDoc v1.0.0</Text>
          <Text style={styles.footerSubtext}>© 2025 All rights reserved</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeTab="Settings" />
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
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F0FDFA",
    borderWidth: 2,
    borderColor: "#99F6E4",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#14B8A6",
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 12,
    color: "#6B7280",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  settingsCard: {
    padding: 0,
    marginBottom: 24,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  tealIcon: {
    backgroundColor: "#F0FDFA",
  },
  settingName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: "#6B7280",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#EF4444",
  },
  footer: {
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: "#9CA3AF",
  },
})
