import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { MOCK_PRODUCTS, ProductItem } from '../../services/mockData';
import { showAlert } from '../../utils/alert';

export const ProductsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [products, setProducts] = useState<ProductItem[]>(MOCK_PRODUCTS);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleAddProduct = () => {
    if (!name || !price || !stock) {
      showAlert('Required', 'Please complete the product details.');
      return;
    }
    const newProd: ProductItem = {
      id: String(Date.now()),
      name,
      sku: sku || `SKU-${Math.floor(100 + Math.random() * 900)}`,
      category: category || 'General',
      price: parseFloat(price) || 0,
      cost: (parseFloat(price) || 0) * 0.6,
      stock: parseInt(stock, 10) || 0,
      minStock: 10,
      reorderPoint: 15,
      status: parseInt(stock, 10) > 10 ? 'in_stock' : 'low_stock',
    };
    setProducts([newProd, ...products]);
    setModalVisible(false);
    setName('');
    setSku('');
    setPrice('');
    setStock('');
    showAlert('Product Added', `${newProd.name} added to catalog.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Products Catalog"
        subtitle={`${products.length} Active SKUs`}
        showBack
        onBack={() => navigation.goBack()}
        rightAction={{
          icon: 'add-circle-outline',
          onPress: () => setModalVisible(true),
        }}
      />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card style={styles.productCard}>
            <View style={styles.rowTop}>
              <View style={{ flex: 1 }}>
                <Text style={styles.prodName}>{item.name}</Text>
                <Text style={styles.prodSku}>
                  {item.sku} • {item.category}
                </Text>
              </View>
              <Badge
                label={
                  item.status === 'in_stock'
                    ? 'IN STOCK'
                    : item.status === 'low_stock'
                      ? 'LOW STOCK'
                      : 'OUT OF STOCK'
                }
                variant={
                  item.status === 'in_stock'
                    ? 'success'
                    : item.status === 'low_stock'
                      ? 'warning'
                      : 'danger'
                }
                size="sm"
              />
            </View>

            <View style={styles.rowMetrics}>
              <View style={styles.metricCol}>
                <Text style={styles.metricLabel}>Retail Price</Text>
                <Text style={styles.metricValue}>${item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.metricCol}>
                <Text style={styles.metricLabel}>Current Stock</Text>
                <Text
                  style={[
                    styles.metricValue,
                    item.stock <= item.minStock && { color: colors.warning },
                  ]}
                >
                  {item.stock} units
                </Text>
              </View>
              <View style={styles.metricCol}>
                <Text style={styles.metricLabel}>Margin</Text>
                <Text style={[styles.metricValue, { color: colors.primary }]}>
                  {(((item.price - item.cost) / item.price) * 100).toFixed(0)}%
                </Text>
              </View>
            </View>
          </Card>
        )}
      />

      {/* Add Product Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Product</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <Input
              label="Product Title"
              placeholder="e.g. Neural Edge IoT Gateway"
              value={name}
              onChangeText={setName}
            />
            <Input
              label="SKU Code"
              placeholder="e.g. NEU-GW-003"
              value={sku}
              onChangeText={setSku}
            />
            <Input
              label="Category"
              placeholder="e.g. Hardware, Vision, Sensor"
              value={category}
              onChangeText={setCategory}
            />
            <Input
              label="Retail Price ($)"
              placeholder="e.g. 299.00"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
            />
            <Input
              label="Initial Stock Quantity"
              placeholder="e.g. 50"
              value={stock}
              onChangeText={setStock}
              keyboardType="number-pad"
            />

            <Button
              title="Save Product to ERP"
              onPress={handleAddProduct}
              size="lg"
              style={{ marginTop: 10 }}
            />
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
  listContent: {
    padding: 16,
    width: '100%',
    maxWidth: 1240,
    alignSelf: 'center',
  },
  productCard: {
    marginBottom: 12,
    padding: 14,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  prodName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  prodSku: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rowMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  metricCol: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
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
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
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
});
