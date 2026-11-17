import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { showAlert } from '../../utils/alert';

interface IntegrationChannel {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  category: string;
  connected: boolean;
  status: string;
}

const CHANNELS: IntegrationChannel[] = [
  { id: '1', name: 'Shopify Store Connector', icon: 'logo-amazon', category: 'E-Commerce', connected: true, status: 'Live Syncing Orders' },
  { id: '2', name: 'WooCommerce API', icon: 'cart-outline', category: 'E-Commerce', connected: true, status: '2-Way Inventory Sync' },
  { id: '3', name: 'Stripe Payment Gateway', icon: 'card-outline', category: 'Finance', connected: true, status: 'Webhooks Verified' },
  { id: '4', name: 'QuickBooks Ledger', icon: 'book-outline', category: 'Accounting', connected: false, status: 'Setup Required' },
  { id: '5', name: 'WhatsApp Business API', icon: 'logo-whatsapp', category: 'Customer Care', connected: true, status: 'AI Bot Responding' },
];

export const IntegrationsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [integrations, setIntegrations] = useState(CHANNELS);

  const toggleSwitch = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, connected: !item.connected } : item
      )
    );
    showAlert('Channel Updated', 'Connection state updated.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Connected Channels"
        subtitle="Multi-Platform ERP Webhooks"
        showBack
        onBack={() => navigation.goBack()}
      />

      <FlatList
        data={integrations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.row}>
              <View style={styles.iconWrap}>
                <Ionicons name={item.icon} size={24} color={colors.primary} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.status}>{item.status}</Text>
                <Badge
                  label={item.category}
                  variant="muted"
                  size="sm"
                />
              </View>
              <Switch
                value={item.connected}
                onValueChange={() => toggleSwitch(item.id)}
                trackColor={{ false: colors.inputBg, true: colors.primary }}
                thumbColor="#ffffff"
              />
            </View>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
    width: '100%',
    maxWidth: 1240,
    alignSelf: 'center',
  },
  card: {
    marginBottom: 10,
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  status: {
    fontSize: 12,
    color: colors.textSecondary,
    marginVertical: 3,
  },
});
