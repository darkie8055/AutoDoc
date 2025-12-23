export interface Document {
  id: string
  name: string
  type: "passport" | "pan" | "aadhar" | "license" | "other"
  dateAdded: string
  size: string
  thumbnail?: string
  extractedData?: Record<string, any>
}

export interface Website {
  id: string
  name: string
  url: string
  username: string
  password: string
  category: string
  lastModified: string
}

export interface SecurityAlert {
  id: string
  type: "phishing" | "malware" | "breach" | "warning"
  title: string
  description: string
  severity: "high" | "medium" | "low"
  timestamp: string
}

export interface CalendarEvent {
  id: string
  title: string
  date: string
  type: "expiry" | "renewal" | "reminder"
  documentId?: string
}

export interface UserProfile {
  name: string
  email: string
  phone: string
  avatar?: string
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar?: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  biometricEnabled: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  name: string
  email: string
  password: string
  confirmPassword: string
}
