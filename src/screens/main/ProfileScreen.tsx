import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import { api, DEFAULT_API_URL } from '../../services/api';
import { showAlert } from '../../utils/alert';

export const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [apiUrl, setApiUrl] = useState(api.getBaseUrl() || DEFAULT_API_URL);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSaveApiUrl = async () => {
    await api.setBaseUrl(apiUrl);
    showAlert('Configuration Saved', `Active API Endpoint set to:\n${apiUrl}`);
  };

  const handleLogout = () => {
    showAlert('Confirm Sign Out', 'Are you sure you want to exit the Neuroviax cockpit?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          navigation.replace('Auth');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Executive Profile & Settings" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <Card style={styles.userCard} variant="glowing">
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>
              {user?.name ? user.name.split(' ').map((n) => n[0]).join('').substring(0, 2) : 'MN'}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'Muzammal Nazeer'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'admin@neuroviax.ai'}</Text>
          <View style={styles.tagRow}>
            <Badge label={user?.role || 'SUPER ADMIN'} variant="primary" size="sm" />
            <View style={{ width: 8 }} />
            <Badge label={`${user?.plan || 'ENTERPRISE'} TIER`} variant="success" size="sm" />
          </View>
        </Card>

        {/* Business Navigation Hub */}
        <Text style={styles.sectionTitle}>Enterprise Operations Hub</Text>
        <Card style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Customers')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="people-outline" size={20} color={colors.primary} />
              <Text style={styles.menuItemText}>Customers & CRM</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Suppliers')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="bus-outline" size={20} color={colors.secondaryLight} />
              <Text style={styles.menuItemText}>Supplier Logistics</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Reports')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="bar-chart-outline" size={20} color="#a78bfa" />
              <Text style={styles.menuItemText}>Audited BI & Reports</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Team')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="shield-outline" size={20} color="#fbbf24" />
              <Text style={styles.menuItemText}>Team Roles & RBAC</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Integrations')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="git-network-outline" size={20} color={colors.primaryLight} />
              <Text style={styles.menuItemText}>Channels & Webhooks</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Subscription')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="card-outline" size={20} color="#f472b6" />
              <Text style={styles.menuItemText}>Billing & Plan Management</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { borderBottomWidth: 0 }]}
            onPress={() => navigation.navigate('AdminDashboard')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="speedometer-outline" size={20} color={colors.danger} />
              <Text style={[styles.menuItemText, { color: '#f87171', fontWeight: '700' }]}>
                Super Admin Cockpit
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.danger} />
          </TouchableOpacity>
        </Card>

        {/* Security & System Settings */}
        <Text style={styles.sectionTitle}>Security & Hardware</Text>
        <Card style={styles.menuCard}>
          <View style={styles.switchRow}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="finger-print-outline" size={20} color={colors.textPrimary} />
              <Text style={styles.menuItemText}>Biometric / Face-ID Access</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: colors.inputBg, true: colors.primary }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={[styles.switchRow, { borderBottomWidth: 0 }]}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="notifications-outline" size={20} color={colors.textPrimary} />
              <Text style={styles.menuItemText}>AI Stockout Push Alerts</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.inputBg, true: colors.primary }}
              thumbColor="#ffffff"
            />
          </View>
        </Card>

        {/* API Server Endpoint Settings */}
        <Text style={styles.sectionTitle}>Backend Cloud Connection</Text>
        <Card style={styles.menuCard}>
          <Input
            label="API Gateway Base URL"
            value={apiUrl}
            onChangeText={setApiUrl}
            placeholder="http://10.0.2.2:5000/api"
            autoCapitalize="none"
            icon="server-outline"
          />
          <Button
            title="Update API Endpoint"
            variant="secondary"
            size="sm"
            onPress={handleSaveApiUrl}
          />
        </Card>

        {/* Sign Out Button */}
        <Button
          title="Sign Out of Cockpit"
          variant="danger"
          size="lg"
          icon="log-out-outline"
          onPress={handleLogout}
          style={{ marginTop: 10, marginBottom: 40 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  userCard: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 12,
  },
  avatarLargeText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  userEmail: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tagRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textMuted,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuCard: {
    padding: 0,
    marginBottom: 20,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 14,
    color: colors.textPrimary,
    marginLeft: 12,
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
});
