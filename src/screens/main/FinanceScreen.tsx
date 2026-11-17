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
import { MOCK_EXPENSES, ExpenseItem } from '../../services/mockData';

export const FinanceScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(MOCK_EXPENSES);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseItem['category']>('Operations');

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleAddExpense = () => {
    if (!title || !amount) {
      Alert.alert('Required', 'Please enter expense description and amount.');
      return;
    }
    const newExp: ExpenseItem = {
      id: String(Date.now()),
      title,
      category,
      amount: parseFloat(amount) || 0,
      date: 'Today',
      status: 'paid',
    };
    setExpenses([newExp, ...expenses]);
    setModalVisible(false);
    setTitle('');
    setAmount('');
    Alert.alert('Logged', 'Expense logged to financial ledger.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Finance & Expenses"
        subtitle="Ledger & Cash Flow Tracking"
        rightAction={{
          icon: 'add-circle-outline',
          onPress: () => setModalVisible(true),
        }}
      />

      {/* Financial Health Summary */}
      <View style={styles.summaryContainer}>
        <Card style={styles.summaryCard} variant="glowing">
          <Text style={styles.summaryLabel}>Total Monthly Operating Expenses</Text>
          <Text style={styles.summaryAmount}>${totalExpenses.toLocaleString()}</Text>
          <View style={styles.summaryRow}>
            <View style={styles.subStat}>
              <Text style={styles.subStatLabel}>Inflow (Paid)</Text>
              <Text style={[styles.subStatVal, { color: colors.primaryLight }]}>+$128,450</Text>
            </View>
            <View style={styles.subStat}>
              <Text style={styles.subStatLabel}>Net Runway</Text>
              <Text style={styles.subStatVal}>9.4 Months</Text>
            </View>
            <View style={styles.subStat}>
              <Text style={styles.subStatLabel}>Burn Rate</Text>
              <Text style={[styles.subStatVal, { color: '#fbbf24' }]}>Normal</Text>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Recent Operating Expenses</Text>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.expenseCard}>
            <View style={styles.expenseTop}>
              <View style={{ flex: 1 }}>
                <Text style={styles.expenseTitle}>{item.title}</Text>
                <Text style={styles.expenseDate}>{item.date} • {item.category}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.expenseAmount}>-${item.amount.toFixed(2)}</Text>
                <Badge
                  label={item.status}
                  variant={item.status === 'paid' ? 'success' : 'warning'}
                  size="sm"
                />
              </View>
            </View>
          </Card>
        )}
      />

      {/* Add Expense Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Record Operating Expense</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <Input
              label="Expense Description"
              placeholder="e.g. AWS GPU Server Instances"
              value={title}
              onChangeText={setTitle}
            />
            <Input
              label="Amount ($)"
              placeholder="e.g. 1500.00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />

            <Text style={styles.catLabel}>Category</Text>
            <View style={styles.categoryRow}>
              {(['Operations', 'Marketing', 'Logistics', 'Payroll', 'Software'] as const).map(
                (cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.catPill,
                      category === cat && styles.catPillActive,
                    ]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.catText,
                        category === cat && styles.catTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            <Button
              title="Record Expense to Ledger"
              onPress={handleAddExpense}
              size="lg"
              style={{ marginTop: 20 }}
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
  summaryContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  summaryCard: {
    padding: 16,
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryAmount: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    marginVertical: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  subStat: {
    flex: 1,
  },
  subStatLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  subStatVal: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
  },
  listHeader: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
  },
  listTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  list: {
    padding: 16,
  },
  expenseCard: {
    marginBottom: 10,
    padding: 14,
  },
  expenseTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  expenseDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  expenseAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
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
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  catLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  catPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.cardBgElevated,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  catPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  catText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  catTextActive: {
    color: '#090d16',
  },
});
