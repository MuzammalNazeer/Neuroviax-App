import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Onboarding & Splash
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';

// Auth Screens
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { VerifyOTPScreen } from '../screens/auth/VerifyOTPScreen';
import { ResetPasswordScreen } from '../screens/auth/ResetPasswordScreen';

// Main Tabs
import { MainTabNavigator } from './MainTabNavigator';

// Feature Screens
import { AICopilotScreen } from '../screens/main/AICopilotScreen';
import { AIInsightsScreen } from '../screens/main/AIInsightsScreen';
import { OrdersScreen } from '../screens/main/OrdersScreen';
import { InventoryScreen } from '../screens/main/InventoryScreen';
import { ProductsScreen } from '../screens/main/ProductsScreen';
import { CustomersScreen } from '../screens/main/CustomersScreen';
import { SuppliersScreen } from '../screens/main/SuppliersScreen';
import { FinanceScreen } from '../screens/main/FinanceScreen';
import { ReportsScreen } from '../screens/main/ReportsScreen';
import { TeamScreen } from '../screens/main/TeamScreen';
import { IntegrationsScreen } from '../screens/main/IntegrationsScreen';
import { SubscriptionScreen } from '../screens/main/SubscriptionScreen';
import { NotificationsScreen } from '../screens/main/NotificationsScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { AdminDashboardScreen } from '../screens/main/AdminDashboardScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* Starting Splash & Onboarding */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />

      {/* Auth Flow */}
      <Stack.Screen name="Auth" component={LoginScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

      {/* Main Bottom Tabs */}
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />

      {/* Primary & Stack Features */}
      <Stack.Screen name="AICopilot" component={AICopilotScreen} />
      <Stack.Screen name="AIInsights" component={AIInsightsScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
      <Stack.Screen name="Inventory" component={InventoryScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Customers" component={CustomersScreen} />
      <Stack.Screen name="Suppliers" component={SuppliersScreen} />
      <Stack.Screen name="Finance" component={FinanceScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
      <Stack.Screen name="Team" component={TeamScreen} />
      <Stack.Screen name="Integrations" component={IntegrationsScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
    </Stack.Navigator>
  );
};
