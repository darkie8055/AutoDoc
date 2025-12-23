"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { colors } from "../theme/colors"
import { validation } from "../utils/validation"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { AuthStackParamList } from "../../App"

type SignupScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "Signup">
}

export default function SignupScreen({ navigation }: SignupScreenProps) {
  const { signup } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    const nameError = validation.name(formData.name)
    const emailError = validation.email(formData.email)
    const passwordError = validation.password(formData.password)
    const confirmPasswordError = validation.confirmPassword(formData.password, formData.confirmPassword)

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        name: nameError || "",
        email: emailError || "",
        password: passwordError || "",
        confirmPassword: confirmPasswordError || "",
      })
      return
    }

    setLoading(true)
    const success = await signup(formData)
    setLoading(false)

    if (success) {
      navigation.navigate("Onboarding")
    }
  }

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started with SecureDoc</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            value={formData.name}
            onChangeText={(text) => updateField("name", text)}
            error={errors.name}
            placeholder="Enter your full name"
          />

          <Input
            label="Email"
            value={formData.email}
            onChangeText={(text) => updateField("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            value={formData.password}
            onChangeText={(text) => updateField("password", text)}
            secureTextEntry
            error={errors.password}
            placeholder="Create a password"
          />

          <Input
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => updateField("confirmPassword", text)}
            secureTextEntry
            error={errors.confirmPassword}
            placeholder="Confirm your password"
          />

          <Button title="Sign Up" onPress={handleSignup} loading={loading} style={styles.signupButton} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  form: {
    marginBottom: 24,
  },
  signupButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  loginLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
})
