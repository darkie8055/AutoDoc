import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../App"
import BottomNav from "../components/BottomNav"
import Card from "../components/Card"
import Icon from "react-native-vector-icons/Feather"

type Props = NativeStackScreenProps<RootStackParamList, "Calendar">

export default function CalendarScreen({ navigation }: Props) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const currentMonth = new Date().getMonth()

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Calendar</Text>
        <TouchableOpacity>
          <Icon name="filter" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.monthSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {months.map((month, idx) => (
              <TouchableOpacity key={idx} style={[styles.monthChip, idx === currentMonth && styles.monthChipActive]}>
                <Text style={[styles.monthText, idx === currentMonth && styles.monthTextActive]}>{month}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Upcoming Reminders</Text>

          <Card style={styles.eventCard}>
            <View style={styles.eventDate}>
              <Text style={styles.eventDay}>15</Text>
              <Text style={styles.eventMonth}>Dec</Text>
            </View>
            <View style={styles.eventContent}>
              <Text style={styles.eventTitle}>Passport Renewal Due</Text>
              <Text style={styles.eventTime}>9:00 AM</Text>
              <View style={styles.eventTag}>
                <Text style={styles.eventTagText}>Important</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </Card>

          <Card style={styles.eventCard}>
            <View style={styles.eventDate}>
              <Text style={styles.eventDay}>22</Text>
              <Text style={styles.eventMonth}>Dec</Text>
            </View>
            <View style={styles.eventContent}>
              <Text style={styles.eventTitle}>Insurance Expiry</Text>
              <Text style={styles.eventTime}>All Day</Text>
              <View style={[styles.eventTag, styles.eventTagWarning]}>
                <Text style={styles.eventTagText}>Urgent</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </Card>

          <Card style={styles.eventCard}>
            <View style={styles.eventDate}>
              <Text style={styles.eventDay}>28</Text>
              <Text style={styles.eventMonth}>Dec</Text>
            </View>
            <View style={styles.eventContent}>
              <Text style={styles.eventTitle}>License Renewal</Text>
              <Text style={styles.eventTime}>2:00 PM</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#9CA3AF" />
          </Card>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <BottomNav activeTab="Calendar" />
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
  monthSelector: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  monthChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginRight: 8,
  },
  monthChipActive: {
    backgroundColor: "#14B8A6",
  },
  monthText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  monthTextActive: {
    color: "#FFFFFF",
  },
  eventsSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 12,
    padding: 16,
  },
  eventDate: {
    width: 56,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#F0FDFA",
  },
  eventDay: {
    fontSize: 24,
    fontWeight: "700",
    color: "#14B8A6",
  },
  eventMonth: {
    fontSize: 12,
    fontWeight: "500",
    color: "#14B8A6",
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  eventTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#DBEAFE",
  },
  eventTagWarning: {
    backgroundColor: "#FEF3C7",
  },
  eventTagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1E40AF",
  },
})
