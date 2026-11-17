import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

import { DashboardScreen } from '../screens/main/DashboardScreen';
import { AICopilotScreen } from '../screens/main/AICopilotScreen';
import { AIInsightsScreen } from '../screens/main/AIInsightsScreen';
import { OrdersScreen } from '../screens/main/OrdersScreen';
import { InventoryScreen } from '../screens/main/InventoryScreen';

const Tab = createBottomTabNavigator();

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="AICopilotTab"
        component={AICopilotScreen}
        options={{
          tabBarLabel: 'AI Copilot',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.copilotTabIcon, focused && styles.copilotTabIconFocused]}>
              <Ionicons
                name={focused ? 'sparkles' : 'sparkles-outline'}
                size={22}
                color={focused ? '#090d16' : colors.primaryLight}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="AIInsightsTab"
        component={AIInsightsScreen}
        options={{
          tabBarLabel: 'Insights',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'trending-up' : 'trending-up-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="OrdersTab"
        component={OrdersScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'cart' : 'cart-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="InventoryTab"
        component={InventoryScreen}
        options={{
          tabBarLabel: 'Inventory',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'cube' : 'cube-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0c121e',
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    height: Platform.OS === 'ios' ? 88 : 65,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    paddingTop: 8,
    ...(Platform.OS === 'web'
      ? {
          maxWidth: 720,
          width: '100%',
          alignSelf: 'center' as const,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: colors.divider,
        }
      : {}),
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  copilotTabIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  copilotTabIconFocused: {
    backgroundColor: colors.primary,
  },
});
