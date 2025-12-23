import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { colors } from "../theme/colors"

interface HeaderProps {
  title: string
  showBack?: boolean
  rightAction?: {
    icon: string
    onPress: () => void
  }
}

export const Header: React.FC<HeaderProps> = ({ title, showBack = false, rightAction }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}

      <Text style={styles.title}>{title}</Text>

      {rightAction ? (
        <TouchableOpacity onPress={rightAction.onPress} style={styles.action}>
          <Text style={styles.actionText}>{rightAction.icon}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.action} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    fontSize: 24,
    color: colors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    flex: 1,
    textAlign: "center",
  },
  action: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    fontSize: 20,
    color: colors.primary,
  },
})
