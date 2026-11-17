import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { MOCK_CUSTOMERS, CustomerItem } from '../../services/mockData';

export const CustomersScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [customers] = useState<CustomerItem[]>(MOCK_CUSTOMERS);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Enterprise CRM"
        subtitle={`${customers.length} Accounts Segmented`}
        showBack
        onBack={() => navigation.goBack()}
      />

      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.topRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
              <Badge
                label={item.segment}
                variant={
                  item.segment === 'VIP Champions'
                    ? 'success'
                    : item.segment === 'Loyal'
                    ? 'info'
                    : 'warning'
                }
              />
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCol}>
                <Text style={styles.statLabel}>Total Spend</Text>
                <Text style={styles.statVal}>${item.totalSpent.toLocaleString()}</Text>
              </View>
              <View style={styles.statCol}>
                <Text style={styles.statLabel}>Orders</Text>
                <Text style={styles.statVal}>{item.ordersCount} completed</Text>
              </View>
              <View style={styles.statCol}>
                <Text style={styles.statLabel}>Last Active</Text>
                <Text style={styles.statVal}>{item.lastPurchase}</Text>
              </View>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.contactBtn}
                onPress={() => Linking.openURL(`tel:${item.phone}`)}
              >
                <Ionicons name="call-outline" size={16} color={colors.primary} />
                <Text style={styles.contactBtnText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.contactBtn}
                onPress={() => Linking.openURL(`mailto:${item.email}`)}
              >
                <Ionicons name="mail-outline" size={16} color={colors.secondaryLight} />
                <Text style={[styles.contactBtnText, { color: colors.secondaryLight }]}>Email</Text>
              </TouchableOpacity>
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
    marginBottom: 12,
    padding: 14,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  email: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.divider,
  },
  statCol: {
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  statVal: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 8,
  },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBgElevated,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  contactBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 4,
  },
});
