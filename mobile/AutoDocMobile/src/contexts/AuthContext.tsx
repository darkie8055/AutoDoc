import type React from 'react';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

// STAGE 6: Auth listener + login + logout + signup
interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ONLY source of auth state - namespace API listener
    const unsubscribe = auth().onAuthStateChanged(firebaseUser => {
      console.log('🔥 Auth state changed:', firebaseUser?.email || 'null');
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  // STAGE 4: Login function - namespace API ONLY
  const login = async (email: string, password: string) => {
    // ✅ Use namespace API
    await auth().signInWithEmailAndPassword(email, password);
    // ❌ DO NOT update context here - onAuthStateChanged will handle it
  };

  // STAGE 5: Logout function - namespace API ONLY (CRITICAL)
  const logout = async () => {
    // ✅ ONLY call Firebase signOut - namespace API
    await auth().signOut();
    // ❌ DO NOT clear context manually
    // ❌ DO NOT reset navigation
    // ❌ DO NOT set isAuthenticated = false
    // onAuthStateChanged(null) will handle EVERYTHING
  };

  // STAGE 6: Signup function - namespace API ONLY
  const signup = async (
    email: string,
    password: string,
    displayName: string,
  ) => {
    // ✅ Create user with namespace API
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );

    // ✅ Update display name
    if (userCredential.user) {
      await userCredential.user.updateProfile({ displayName });
    }

    // ❌ DO NOT update context manually - onAuthStateChanged will handle it
    // User is automatically logged in after signup
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
