import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from './src/theme/colors';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import DocumentsScreen from './src/screens/DocumentsScreen';
import SecurityScreen from './src/screens/SecurityScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import UploadScreen from './src/screens/UploadScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import WebsitesScreen from './src/screens/WebsitesScreen';
import PhishingScreen from './src/screens/PhishingScreen';
import DocumentDataScreen from './src/screens/DocumentDataScreen';
import DocumentDetailScreen from './src/screens/DocumentDetailScreen';
import PassportDetailScreen from './src/screens/PassportDetailScreen';
import PANDetailScreen from './src/screens/PANDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
};

export type MainStackParamList = {
  Main: undefined;
  Home: undefined;
  Documents: undefined;
  Security: undefined;
  Settings: undefined;
  Upload: undefined;
  Calendar: undefined;
  Websites: undefined;
  Phishing: undefined;
  DocumentData: undefined;
  DocumentDetail: undefined;
  PassportDetail: undefined;
  PANDetail: undefined;
  Profile: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

function MainNavigator() {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Documents" component={DocumentsScreen} />
      <MainStack.Screen name="Security" component={SecurityScreen} />
      <MainStack.Screen name="Settings" component={SettingsScreen} />
      <MainStack.Screen name="Upload" component={UploadScreen} />
      <MainStack.Screen name="Calendar" component={CalendarScreen} />
      <MainStack.Screen name="Websites" component={WebsitesScreen} />
      <MainStack.Screen name="Phishing" component={PhishingScreen} />
      <MainStack.Screen name="DocumentData" component={DocumentDataScreen} />
      <MainStack.Screen
        name="DocumentDetail"
        component={DocumentDetailScreen}
      />
      <MainStack.Screen
        name="PassportDetail"
        component={PassportDetailScreen}
      />
      <MainStack.Screen name="PANDetail" component={PANDetailScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
    </MainStack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
    </AuthStack.Navigator>
  );
}

function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
