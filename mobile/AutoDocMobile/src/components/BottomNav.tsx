import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../App"
import Icon from "react-native-vector-icons/Feather"

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

interface BottomNavProps {
  activeTab: "Home" | "Documents" | "Security" | "Settings"
}

export default function BottomNav({ activeTab }: BottomNavProps) {
  const navigation = useNavigation<NavigationProp>()

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("Home")}>
        <Icon name="home" size={24} color={activeTab === "Home" ? "#14B8A6" : "#9CA3AF"} />
        <Text style={[styles.label, activeTab === "Home" && styles.activeLabel]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("Documents")}>
        <Icon name="file-text" size={24} color={activeTab === "Documents" ? "#14B8A6" : "#9CA3AF"} />
        <Text style={[styles.label, activeTab === "Documents" && styles.activeLabel]}>Documents</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("Security")}>
        <Icon name="shield" size={24} color={activeTab === "Security" ? "#14B8A6" : "#9CA3AF"} />
        <Text style={[styles.label, activeTab === "Security" && styles.activeLabel]}>Security</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("Settings")}>
        <Icon name="settings" size={24} color={activeTab === "Settings" ? "#14B8A6" : "#9CA3AF"} />
        <Text style={[styles.label, activeTab === "Settings" && styles.activeLabel]}>Settings</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#9CA3AF",
  },
  activeLabel: {
    color: "#14B8A6",
  },
})
