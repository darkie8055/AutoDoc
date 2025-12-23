import * as Keychain from "react-native-keychain"

export const secureStorage = {
  async setCredentials(username: string, password: string): Promise<void> {
    try {
      await Keychain.setGenericPassword(username, password, {
        service: "com.securedoc.auth",
      })
    } catch (error) {
      console.error("Error storing credentials:", error)
      throw error
    }
  },

  async getCredentials(): Promise<{ username: string; password: string } | null> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: "com.securedoc.auth",
      })
      if (credentials) {
        return {
          username: credentials.username,
          password: credentials.password,
        }
      }
      return null
    } catch (error) {
      console.error("Error retrieving credentials:", error)
      return null
    }
  },

  async removeCredentials(): Promise<void> {
    try {
      await Keychain.resetGenericPassword({
        service: "com.securedoc.auth",
      })
    } catch (error) {
      console.error("Error removing credentials:", error)
    }
  },

  async isBiometricAvailable(): Promise<boolean> {
    try {
      const result = await Keychain.getSupportedBiometryType()
      return result !== null
    } catch (error) {
      console.error("Error checking biometric availability:", error)
      return false
    }
  },

  async authenticateWithBiometric(): Promise<boolean> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: "com.securedoc.auth",
        authenticationPrompt: {
          title: "Authenticate",
          subtitle: "Use biometric to login",
          cancel: "Cancel",
        },
      })
      return credentials !== false
    } catch (error) {
      console.error("Biometric authentication error:", error)
      return false
    }
  },
}
