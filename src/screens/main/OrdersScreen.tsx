import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { MOCK_ORDERS, OrderItem } from '../../services/mockData';
import { showAlert } from '../../utils/alert';

export const OrdersScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [orders, setOrders] = useState<OrderItem[]>(MOCK_ORDERS);
  const [filter, setFilter] = useState<'all' | 'completed' | 'processing' | 'pending'>('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = filter === 'all' || o.status === filter;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateOrderStatus = (newStatus: OrderItem['status']) => {
    if (!selectedOrder) return;
    setOrders((prev) =>
      prev.map((ord) => (ord.id === selectedOrder.id ? { ...ord, status: newStatus } : ord))
    );
    setSelectedOrder({ ...selectedOrder, status: newStatus });
    showAlert('Status Updated', `Order ${selectedOrder.orderNumber} is now ${newStatus}.`);
  };

  const handleCreateOrder = () => {
    const newOrd: OrderItem = {
      id: String(Date.now()),
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: 'Quick Counter Sale',
      customerEmail: 'counter@neuroviax.com',
      totalAmount: 499.00,
      status: 'completed',
      itemsCount: 2,
      date: 'Just now',
      paymentMethod: 'Credit Card',
    };
    setOrders([newOrd, ...orders]);
    showAlert('Order Created', `Order ${newOrd.orderNumber} logged successfully.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Sales Orders"
        subtitle={`${orders.length} Enterprise Transactions`}
        rightAction={{
          icon: 'add-circle-outline',
          onPress: handleCreateOrder,
        }}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color={colors.placeholder} style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search order # or customer..."
            placeholderTextColor={colors.placeholder}
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {(['all', 'completed', 'processing', 'pending'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setFilter(tab)}
            style={[styles.filterPill, filter === tab && styles.filterPillActive]}
          >
            <Text style={[styles.filterText, filter === tab && styles.filterTextActive]}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedOrder(item)} activeOpacity={0.75}>
            <Card style={styles.orderCard}>
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.orderNumber}>{item.orderNumber}</Text>
                  <Text style={styles.customerName}>{item.customerName}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.amount}>${item.totalAmount.toFixed(2)}</Text>
                  <Badge
                    label={item.status}
                    variant={
                      item.status === 'completed'
                        ? 'success'
                        : item.status === 'processing'
                          ? 'info'
                          : 'warning'
                    }
                    size="sm"
                  />
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.footerDate}>{item.date}</Text>
                <Text style={styles.footerMeta}>
                  {item.itemsCount} items • {item.paymentMethod}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />

      {/* Order Details Modal Sheet */}
      <Modal
        visible={!!selectedOrder}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedOrder(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>{selectedOrder?.orderNumber}</Text>
                <Text style={styles.modalSub}>{selectedOrder?.date}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedOrder(null)} style={styles.closeBtn}>
                <Ionicons name="close" size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Customer</Text>
                <Text style={styles.detailValue}>{selectedOrder?.customerName}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email</Text>
                <Text style={styles.detailValue}>{selectedOrder?.customerEmail}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total Amount</Text>
                <Text style={[styles.detailValue, { color: colors.primary, fontSize: 16, fontWeight: '800' }]}>
                  ${selectedOrder?.totalAmount.toFixed(2)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Payment Method</Text>
                <Text style={styles.detailValue}>{selectedOrder?.paymentMethod}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status</Text>
                <Badge
                  label={selectedOrder?.status || ''}
                  variant={selectedOrder?.status === 'completed' ? 'success' : 'info'}
                />
              </View>

              <Text style={styles.actionTitle}>Update Order Status:</Text>
              <View style={styles.statusButtonsRow}>
                <Button
                  title="Completed"
                  onPress={() => updateOrderStatus('completed')}
                  size="sm"
                  style={{ flex: 1, marginRight: 6 }}
                />
                <Button
                  title="Processing"
                  variant="secondary"
                  onPress={() => updateOrderStatus('processing')}
                  size="sm"
                  style={{ flex: 1, marginRight: 6 }}
                />
                <Button
                  title="Pending"
                  variant="secondary"
                  onPress={() => updateOrderStatus('pending')}
                  size="sm"
                  style={{ flex: 1 }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.background,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 10,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.cardBgElevated,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  filterPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: '#090d16',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  orderCard: {
    marginBottom: 10,
    padding: 14,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  customerName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  amount: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  footerDate: {
    fontSize: 11,
    color: colors.textMuted,
  },
  footerMeta: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.cardBg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  modalSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.cardBgElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    paddingVertical: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  detailLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 20,
    marginBottom: 10,
  },
  statusButtonsRow: {
    flexDirection: 'row',
  },
});
