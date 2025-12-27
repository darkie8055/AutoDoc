import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { colors } from '../theme/colors';
import { validation } from '../utils/validation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../App';

type SignupScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Signup'>;
};

export default function SignupScreen({ navigation }: SignupScreenProps) {
  // STAGE 6: Real signup function available
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const nameError = validation.name(formData.name);
    const emailError = validation.email(formData.email);
    const passwordError = validation.password(formData.password);
    const confirmPasswordError = validation.confirmPassword(
      formData.password,
      formData.confirmPassword,
    );

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        name: nameError || '',
        email: emailError || '',
        password: passwordError || '',
        confirmPassword: confirmPasswordError || '',
      });
      return;
    }

    setLoading(true);
    try {
      // STAGE 6: Call Firebase signup - onAuthStateChanged will update UI
      await signup(formData.email, formData.password, formData.name);
      // ✅ User is auto-logged in and navigation happens via auth state change
      console.log(
        '✅ Signup successful - waiting for auth listener to update UI',
      );
    } catch (error: any) {
      console.error('❌ Signup error:', error);

      // Handle specific Firebase errors
      let errorMessage = 'Unable to create account. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use a stronger password.';
      }

      setErrors({
        name: '',
        email: error.code === 'auth/email-already-in-use' ? errorMessage : '',
        password: error.code === 'auth/weak-password' ? errorMessage : '',
        confirmPassword: '',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Sign up to get started with SecureDoc
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            value={formData.name}
            onChangeText={text => updateField('name', text)}
            error={errors.name}
            placeholder="Enter your full name"
          />

          <Input
            label="Email"
            value={formData.email}
            onChangeText={text => updateField('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            value={formData.password}
            onChangeText={text => updateField('password', text)}
            secureTextEntry
            error={errors.password}
            placeholder="Create a password"
          />

          <Input
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={text => updateField('confirmPassword', text)}
            secureTextEntry
            error={errors.confirmPassword}
            placeholder="Confirm your password"
          />

          <Button
            title="Sign Up"
            onPress={handleSignup}
            loading={loading}
            style={styles.signupButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  loginLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
