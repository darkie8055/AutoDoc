"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { Alert } from "react-native"
import { storage } from "../utils/storage"
import { secureStorage } from "../utils/secureStorage"
import type { User, AuthState, LoginCredentials, SignupCredentials } from "../types"

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>
  signup: (credentials: SignupCredentials) => Promise<boolean>
  logout: () => Promise<void>
  updateUser: (user: Partial<User>) => Promise<void>
  enableBiometric: () => Promise<void>
  disableBiometric: () => Promise<void>
  authenticateWithBiometric: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    biometricEnabled: false,
  })

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = await storage.getItem<string>("authToken")
      const user = await storage.getItem<User>("user")
      const biometricEnabled = await storage.getItem<boolean>("biometricEnabled")

      if (token && user) {
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          biometricEnabled: biometricEnabled || false,
        })
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }))
      }
    } catch (error) {
      console.error("Error checking auth status:", error)
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const mockUser: User = {
        id: "user123",
        email: credentials.email,
        name: "User Name",
        createdAt: new Date().toISOString(),
      }
      const mockToken = "mock_jwt_token_" + Date.now()

      await storage.setItem("authToken", mockToken)
      await storage.setItem("user", mockUser)
      await secureStorage.setCredentials(credentials.email, credentials.password)

      setAuthState({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false,
        biometricEnabled: false,
      })

      return true
    } catch (error) {
      console.error("Login error:", error)
      Alert.alert("Login Failed", "Invalid credentials. Please try again.")
      return false
    }
  }

  const signup = async (credentials: SignupCredentials): Promise<boolean> => {
    try {
      if (credentials.password !== credentials.confirmPassword) {
        Alert.alert("Error", "Passwords do not match")
        return false
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: "user" + Date.now(),
        email: credentials.email,
        name: credentials.name,
        createdAt: new Date().toISOString(),
      }
      const mockToken = "mock_jwt_token_" + Date.now()

      await storage.setItem("authToken", mockToken)
      await storage.setItem("user", newUser)
      await secureStorage.setCredentials(credentials.email, credentials.password)

      setAuthState({
        user: newUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false,
        biometricEnabled: false,
      })

      return true
    } catch (error) {
      console.error("Signup error:", error)
      Alert.alert("Signup Failed", "Unable to create account. Please try again.")
      return false
    }
  }

  const logout = async () => {
    try {
      await storage.removeItem("authToken")
      await storage.removeItem("user")
      await storage.removeItem("biometricEnabled")

      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        biometricEnabled: false,
      })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const updateUser = async (updates: Partial<User>) => {
    if (!authState.user) return

    const updatedUser = { ...authState.user, ...updates }
    await storage.setItem("user", updatedUser)
    setAuthState((prev) => ({ ...prev, user: updatedUser }))
  }

  const enableBiometric = async () => {
    try {
      const isAvailable = await secureStorage.isBiometricAvailable()
      if (isAvailable) {
        await storage.setItem("biometricEnabled", true)
        setAuthState((prev) => ({ ...prev, biometricEnabled: true }))
        Alert.alert("Success", "Biometric authentication enabled")
      } else {
        Alert.alert("Not Available", "Biometric authentication is not available on this device")
      }
    } catch (error) {
      console.error("Enable biometric error:", error)
      Alert.alert("Error", "Failed to enable biometric authentication")
    }
  }

  const disableBiometric = async () => {
    await storage.setItem("biometricEnabled", false)
    setAuthState((prev) => ({ ...prev, biometricEnabled: false }))
  }

  const authenticateWithBiometric = async (): Promise<boolean> => {
    try {
      const credentials = await secureStorage.getCredentials()
      if (!credentials) {
        return false
      }

      const success = await secureStorage.authenticateWithBiometric()
      if (success) {
        return await login({ email: credentials.username, password: credentials.password })
      }
      return false
    } catch (error) {
      console.error("Biometric auth error:", error)
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        updateUser,
        enableBiometric,
        disableBiometric,
        authenticateWithBiometric,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
