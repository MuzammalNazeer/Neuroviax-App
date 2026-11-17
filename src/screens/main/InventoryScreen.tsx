import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { MOCK_PRODUCTS, ProductItem } from '../../services/mockData';

export const InventoryScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [items, setItems] = useState<ProductItem[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [adjustAmount, setAdjustAmount] = useState('');

  const handleAdjustStock = (isAddition: boolean) => {
    if (!selectedProduct || !adjustAmount) return;
    const delta = parseInt(adjustAmount, 10) * (isAddition ? 1 : -1);
    const newStock = Math.max(0, selectedProduct.stock + delta);

    setItems((prev) =>
      prev.map((p) =>
        p.id === selectedProduct.id
          ? {
              ...p,
              stock: newStock,
              status: newStock === 0 ? 'out_of_stock' : newStock <= p.minStock ? 'low_stock' : 'in_stock',
            }
          : p
      )
    );

    Alert.alert('Stock Updated', `${selectedProduct.name} stock adjusted to ${newStock} units.`);
    setSelectedProduct(null);
    setAdjustAmount('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Warehouse Inventory"
        subtitle="Real-time Multi-Facility Tracking"
        rightAction={{
          icon: 'refresh-outline',
          onPress: () => Alert.alert('Inventory Synced', 'All warehouse nodes updated.'),
        }}
      />

      {/* Stock Health Banner */}
      <View style={styles.bannerContainer}>
        <Card style={styles.healthCard}>
          <View style={styles.healthRow}>
            <View style={styles.healthIcon}>
              <Ionicons name="cube" size={24} color={colors.primary} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.healthTitle}>Inventory Health: 92%</Text>
              <Text style={styles.healthSub}>2 items below safety threshold • Auto-PO armed</Text>
            </View>
          </View>
        </Card>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedProduct(item)} activeOpacity={0.8}>
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.sku}>SKU: {item.sku}</Text>
                </View>
                <Badge
                  label={item.status === 'in_stock' ? 'OPTIMAL' : 'CRITICAL'}
                  variant={item.status === 'in_stock' ? 'success' : 'danger'}
                  size="sm"
                />
              </View>

              <View style={styles.stockBarTrack}>
                <View
                  style={[
                    styles.stockBarFill,
                    {
                      width: `${Math.min(100, (item.stock / (item.reorderPoint * 2)) * 100)}%`,
                      backgroundColor: item.stock <= item.minStock ? colors.danger : colors.primary,
                    },
                  ]}
                />
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.stockCount}>
                  Available: <Text style={{ color: '#ffffff', fontWeight: '800' }}>{item.stock}</Text> units
                </Text>
                <Text style={styles.reorderText}>
                  Reorder trigger: {item.reorderPoint} units
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />

      {/* Stock Adjustment Modal */}
      <Modal visible={!!selectedProduct} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adjust Stock: {selectedProduct?.name}</Text>
              <TouchableOpacity onPress={() => setSelectedProduct(null)}>
                <Ionicons name="close" size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalCurrent}>
              Current Stock: <Text style={{ color: colors.primary, fontWeight: '800' }}>{selectedProduct?.stock} units</Text>
            </Text>

            <Input
              label="Quantity to Adjust"
              placeholder="e.g. 25"
              value={adjustAmount}
              onChangeText={setAdjustAmount}
              keyboardType="number-pad"
            />

            <View style={styles.modalButtons}>
              <Button
                title="+ Receive Stock"
                onPress={() => handleAdjustStock(true)}
                size="md"
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button
                title="- Reduce / Scrap"
                variant="danger"
                onPress={() => handleAdjustStock(false)}
                size="md"
                style={{ flex: 1 }}
              />
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
  bannerContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  healthCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    padding: 14,
    marginBottom: 8,
  },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  healthIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  healthSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 10,
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
  },
  sku: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  stockBarTrack: {
    width: '100%',
    height: 6,
    backgroundColor: colors.inputBg,
    borderRadius: 3,
    overflow: 'hidden',
    marginVertical: 10,
  },
  stockBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  reorderText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.cardBg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    flex: 1,
  },
  modalCurrent: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
