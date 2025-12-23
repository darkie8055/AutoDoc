"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Image, Dimensions } from "react-native"
import { Button } from "../components/Button"
import { colors } from "../theme/colors"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { AuthStackParamList } from "../../App"

const { width } = Dimensions.get("window")

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "Onboarding">
}

const slides = [
  {
    id: 1,
    title: "Secure Document Storage",
    description: "Store all your important documents safely in one place with military-grade encryption",
    image: "https://placeholder.svg?height=300&width=300&query=secure+document+vault",
  },
  {
    id: 2,
    title: "Smart Organization",
    description: "Automatically categorize and organize your documents with AI-powered recognition",
    image: "https://placeholder.svg?height=300&width=300&query=organized+files",
  },
  {
    id: 3,
    title: "Quick Access",
    description: "Access your documents anytime, anywhere with biometric authentication",
    image: "https://placeholder.svg?height=300&width=300&query=fingerprint+security",
  },
]

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handleSkip = () => {
    navigation.replace("Main")
  }

  const handleGetStarted = () => {
    navigation.replace("Main")
  }

  const slide = slides[currentSlide]

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: slide.image }} style={styles.image} resizeMode="contain" />

        <View style={styles.textContainer}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </View>

        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View key={index} style={[styles.dot, index === currentSlide && styles.activeDot]} />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        {currentSlide < slides.length - 1 ? (
          <>
            <Button title="Skip" onPress={handleSkip} variant="ghost" style={styles.button} />
            <Button title="Next" onPress={handleNext} style={styles.button} />
          </>
        ) : (
          <Button title="Get Started" onPress={handleGetStarted} style={styles.fullButton} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: 48,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
  pagination: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 24,
  },
  footer: {
    flexDirection: "row",
    padding: 24,
    gap: 12,
  },
  button: {
    flex: 1,
  },
  fullButton: {
    flex: 1,
  },
})
