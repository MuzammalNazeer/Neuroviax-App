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
import { MOCK_SUPPLIERS, SupplierItem } from '../../services/mockData';

export const SuppliersScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [suppliers] = useState<SupplierItem[]>(MOCK_SUPPLIERS);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Supplier Logistics"
        subtitle="Global Vendor Procurement"
        showBack
        onBack={() => navigation.goBack()}
      />

      <FlatList
        data={suppliers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.topRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.contact}>Attn: {item.contactPerson}</Text>
              </View>
              <Badge
                label={`${item.reliabilityScore}% RELIABLE`}
                variant="success"
                size="sm"
              />
            </View>

            <View style={styles.metaGrid}>
              <View style={styles.metaCol}>
                <Text style={styles.metaLabel}>Avg Lead Time</Text>
                <Text style={styles.metaVal}>{item.leadTimeDays} Days</Text>
              </View>
              <View style={styles.metaCol}>
                <Text style={styles.metaLabel}>Active Purchase Orders</Text>
                <Text style={styles.metaVal}>{item.activeOrders} in transit</Text>
              </View>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => Linking.openURL(`tel:${item.phone}`)}
              >
                <Ionicons name="call-outline" size={16} color={colors.primary} />
                <Text style={styles.actionBtnText}>Call Vendor</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => Linking.openURL(`mailto:${item.email}`)}
              >
                <Ionicons name="mail-outline" size={16} color={colors.secondaryLight} />
                <Text style={[styles.actionBtnText, { color: colors.secondaryLight }]}>
                  Send PO Request
                </Text>
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
  contact: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  metaGrid: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.divider,
  },
  metaCol: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  metaVal: {
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
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBgElevated,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 4,
  },
});
