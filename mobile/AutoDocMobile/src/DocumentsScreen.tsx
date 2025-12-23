"use client"

import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../App"
import BottomNav from "../components/BottomNav"
import Card from "../components/Card"
import Icon from "react-native-vector-icons/Feather"
import { useState } from "react"

type Props = NativeStackScreenProps<RootStackParamList, "Documents">

export default function DocumentsScreen({ navigation }: Props) {
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "expiring" | "verified">("all")

  const allDocuments = [
    {
      id: 1,
      name: "Aadhaar Card",
      number: "1234 5678 9012",
      uploaded: "2023-12-01",
      status: "active" as const,
      verified: true,
    },
    {
      id: 2,
      name: "PAN Card",
      number: "ABCDE1234F",
      uploaded: "2023-12-02",
      status: "active" as const,
      verified: true,
    },
    {
      id: 3,
      name: "Passport",
      number: "K1234567",
      uploaded: "2023-12-03",
      expires: "2026-01-15",
      status: "expiring" as const,
      verified: true,
    },
    {
      id: 4,
      name: "Driving License",
      number: "MH01-20200012345",
      uploaded: "2023-12-04",
      expires: "2025-12-20",
      status: "expiring" as const,
      verified: false,
    },
  ]

  const filteredDocuments = allDocuments.filter((doc) => {
    if (activeFilter === "all") return true
    if (activeFilter === "active") return doc.status === "active"
    if (activeFilter === "expiring") return doc.status === "expiring"
    if (activeFilter === "verified") return doc.verified
    return true
  })

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>My Documents</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#9CA3AF" />
          <TextInput style={styles.searchInput} placeholder="Search documents..." placeholderTextColor="#9CA3AF" />
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterTab, activeFilter === "all" && styles.filterTabActive]}
            onPress={() => setActiveFilter("all")}
          >
            <Text style={[styles.filterText, activeFilter === "all" && styles.filterTextActive]}>All (4)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, activeFilter === "active" && styles.filterTabActive]}
            onPress={() => setActiveFilter("active")}
          >
            <Text style={[styles.filterText, activeFilter === "active" && styles.filterTextActive]}>Active (2)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, activeFilter === "expiring" && styles.filterTabActive]}
            onPress={() => setActiveFilter("expiring")}
          >
            <Text style={[styles.filterText, activeFilter === "expiring" && styles.filterTextActive]}>
              Expiring (2)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, activeFilter === "verified" && styles.filterTabActive]}
            onPress={() => setActiveFilter("verified")}
          >
            <Text style={[styles.filterText, activeFilter === "verified" && styles.filterTextActive]}>Verified</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Add New Document Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Upload")}>
          <Icon name="plus" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add New Document</Text>
        </TouchableOpacity>

        {/* Documents List */}
        <View style={styles.documentsList}>
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} style={styles.documentCard}>
              <View style={styles.documentHeader}>
                <View style={styles.documentInfo}>
                  <View style={styles.documentIcon}>
                    <Icon name="file-text" size={20} color="#6B7280" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.documentTitleRow}>
                      <Text style={styles.documentName}>{doc.name}</Text>
                      {doc.verified && <Icon name="check-circle" size={16} color="#14B8A6" />}
                    </View>
                    <Text style={styles.documentNumber}>{doc.number}</Text>
                  </View>
                </View>
                {doc.status === "expiring" && <Icon name="alert-triangle" size={20} color="#F97316" />}
              </View>

              <View style={styles.documentFooter}>
                <View>
                  <Text style={styles.documentLabel}>Uploaded</Text>
                  <Text style={styles.documentValue}>{doc.uploaded}</Text>
                </View>
                {doc.expires ? (
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.documentLabel}>Expires</Text>
                    <Text style={[styles.documentValue, styles.expiringText]}>{doc.expires}</Text>
                  </View>
                ) : (
                  <View style={styles.activeBadge}>
                    <Text style={styles.activeBadgeText}>active</Text>
                  </View>
                )}
              </View>

              {doc.status === "expiring" && (
                <View style={styles.expiringBadge}>
                  <Text style={styles.expiringBadgeText}>Expiring Soon</Text>
                </View>
              )}
            </Card>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeTab="Documents" />
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 16,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  filterTabActive: {
    backgroundColor: "#14B8A6",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#14B8A6",
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 24,
    gap: 8,
    shadowColor: "#14B8A6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  documentsList: {
    gap: 16,
  },
  documentCard: {
    padding: 16,
  },
  documentHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  documentInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    flex: 1,
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  documentTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  documentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  documentNumber: {
    fontSize: 12,
    color: "#6B7280",
  },
  documentFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  documentLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 2,
  },
  documentValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  expiringText: {
    color: "#F97316",
  },
  activeBadge: {
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#059669",
  },
  expiringBadge: {
    backgroundColor: "#FED7AA",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  expiringBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#EA580C",
  },
})
