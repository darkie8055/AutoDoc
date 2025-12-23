import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../App"
import Card from "../components/Card"
import Icon from "react-native-vector-icons/Feather"

type Props = NativeStackScreenProps<RootStackParamList, "Upload">

export default function UploadScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Upload</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Take Photo Card */}
        <TouchableOpacity style={styles.primaryCard}>
          <View style={styles.primaryIcon}>
            <Icon name="camera" size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.primaryTitle}>Take Photo</Text>
          <Text style={styles.primarySubtitle}>Use camera to capture document</Text>
        </TouchableOpacity>

        {/* Upload from Gallery Card */}
        <TouchableOpacity style={styles.secondaryCard}>
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
              <Text style={styles.tipText}>Ensure good lighting and clear visibility</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Keep the document flat and aligned</Text>
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
  primaryCard: {
    backgroundColor: "#14B8A6",
    borderRadius: 16,
    padding: 48,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
    shadowColor: "#14B8A6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  primaryTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  primarySubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
  secondaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 48,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  secondaryIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  secondaryTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  secondarySubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  tipsCard: {
    padding: 24,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  tipBullet: {
    fontSize: 14,
    color: "#14B8A6",
    fontWeight: "700",
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
})
