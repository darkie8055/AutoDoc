import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../App"
import BottomNav from "../components/BottomNav"
import Card from "../components/Card"
import Icon from "react-native-vector-icons/Feather"

type Props = NativeStackScreenProps<RootStackParamList, "DocumentData">

export default function DocumentDataScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Document Data</Text>
        <TouchableOpacity>
          <Icon name="download" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Extracted Information</Text>

        <TouchableOpacity onPress={() => navigation.navigate("PassportDetail")}>
          <Card style={styles.documentCard}>
            <View style={styles.documentIcon}>
              <Icon name="file-text" size={24} color="#14B8A6" />
            </View>
            <View style={styles.documentContent}>
              <Text style={styles.documentName}>Passport</Text>
              <Text style={styles.documentDetails}>Number: J1234567</Text>
              <Text style={styles.documentDetails}>Expiry: Dec 2028</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("PANDetail")}>
          <Card style={styles.documentCard}>
            <View style={styles.documentIcon}>
              <Icon name="credit-card" size={24} color="#14B8A6" />
            </View>
            <View style={styles.documentContent}>
              <Text style={styles.documentName}>PAN Card</Text>
              <Text style={styles.documentDetails}>Number: ABCDE1234F</Text>
              <Text style={styles.documentDetails}>Name: John Doe</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </Card>
        </TouchableOpacity>

        <TouchableOpacity>
          <Card style={styles.documentCard}>
            <View style={styles.documentIcon}>
              <Icon name="clipboard" size={24} color="#14B8A6" />
            </View>
            <View style={styles.documentContent}>
              <Text style={styles.documentName}>Aadhaar Card</Text>
              <Text style={styles.documentDetails}>Number: XXXX XXXX 1234</Text>
              <Text style={styles.documentDetails}>Verified</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </Card>
        </TouchableOpacity>

        <TouchableOpacity>
          <Card style={styles.documentCard}>
            <View style={styles.documentIcon}>
              <Icon name="home" size={24} color="#14B8A6" />
            </View>
            <View style={styles.documentContent}>
              <Text style={styles.documentName}>Address Proof</Text>
              <Text style={styles.documentDetails}>Utility Bill - Electricity</Text>
              <Text style={styles.documentDetails}>Date: Nov 2024</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </Card>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>

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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  documentCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    marginBottom: 12,
  },
  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F0FDFA",
    alignItems: "center",
    justifyContent: "center",
  },
  documentContent: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  documentDetails: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
})
