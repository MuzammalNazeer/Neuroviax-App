import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { StatCard } from '../../components/StatCard';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { useAuth } from '../../context/AuthContext';
import {
  MOCK_KPIS,
  MOCK_AI_ASSISTANTS,
  MOCK_ORDERS,
  KPIStats,
  AIAssistant,
  OrderItem,
} from '../../services/mockData';
import { api } from '../../services/api';

const { width } = Dimensions.get('window');

export const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuth();
  const [kpis, setKpis] = useState<KPIStats>(MOCK_KPIS);
  const [assistants, setAssistants] = useState<AIAssistant[]>(MOCK_AI_ASSISTANTS);
  const [orders, setOrders] = useState<OrderItem[]>(MOCK_ORDERS);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const kpiData = await api.getDashboardKPIs();
      const orderData = await api.getOrders();
      const assistantData = await api.getAssistants();
      setKpis(kpiData);
      setOrders(orderData);
      setAssistants(assistantData);
    } catch {
      // fallback
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top App Bar */}
      <View style={styles.topBar}>
        <View>
          <View style={styles.businessRow}>
            <Text style={styles.businessName} numberOfLines={1}>
              {user?.businessName || 'Neuroviax AI Labs'}
            </Text>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>AI AUTONOMOUS</Text>
            </View>
          </View>
          <Text style={styles.greeting}>Welcome back, {user?.name || 'Commander'}</Text>
        </View>

        <View style={styles.topActions}>
          <TouchableOpacity
            style={styles.actionIconBtn}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={20} color={colors.textPrimary} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionIconBtn, { marginLeft: 8 }]}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-circle-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        {/* KPI Grid */}
        <View style={styles.kpiRow}>
          <StatCard
            title="Total Revenue"
            value={`$${kpis.revenue.toLocaleString()}`}
            change={kpis.revenueChange}
            isPositive={kpis.revenueChange >= 0}
            icon="cash-outline"
            iconColor={colors.primary}
          />
          <StatCard
            title="Orders Processed"
            value={kpis.ordersCount}
            change={kpis.ordersChange}
            isPositive={kpis.ordersChange >= 0}
            icon="cart-outline"
            iconColor={colors.secondaryLight}
          />
        </View>
        <View style={styles.kpiRow}>
          <StatCard
            title="Net Cash Flow"
            value={`+$${kpis.netCashFlow.toLocaleString()}`}
            change={5.4}
            isPositive={true}
            icon="wallet-outline"
            iconColor="#10b981"
          />
          <StatCard
            title="Low Stock Alerts"
            value={kpis.lowStockCount}
            change={-12}
            isPositive={false}
            icon="alert-circle-outline"
            iconColor={colors.warning}
          />
        </View>

        {/* AI Copilot Quick Banner */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('AICopilot')}
          style={styles.copilotBannerWrapper}
        >
          <LinearGradient
            colors={['#064e3b', '#065f46', '#047857']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.copilotBanner}
          >
            <View style={styles.bannerLeft}>
              <View style={styles.bannerIconCircle}>
                <Ionicons name="sparkles" size={22} color="#ffffff" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.bannerTitle}>Executive AI Copilot</Text>
                <Text style={styles.bannerSubtitle}>
                  Ask: "Predict next month's sales" or "Review overdue invoices"
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Quick Operations Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Operations</Text>
        </View>
        <View style={styles.quickActionGrid}>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Orders')}
          >
            <View style={[styles.qaIconWrapper, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
              <Ionicons name="bag-add-outline" size={22} color={colors.primary} />
            </View>
            <Text style={styles.qaLabel}>Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Products')}
          >
            <View style={[styles.qaIconWrapper, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
              <Ionicons name="cube-outline" size={22} color={colors.secondaryLight} />
            </View>
            <Text style={styles.qaLabel}>Catalog</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Inventory')}
          >
            <View style={[styles.qaIconWrapper, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
              <Ionicons name="layers-outline" size={22} color={colors.warning} />
            </View>
            <Text style={styles.qaLabel}>Inventory</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Finance')}
          >
            <View style={[styles.qaIconWrapper, { backgroundColor: 'rgba(139, 92, 246, 0.15)' }]}>
              <Ionicons name="card-outline" size={22} color="#a78bfa" />
            </View>
            <Text style={styles.qaLabel}>Finance</Text>
          </TouchableOpacity>
        </View>

        {/* 6 Autonomous AI Assistants */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Autonomous AI Assistants</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AIInsights')}>
            <Text style={styles.sectionLink}>View All Insights</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.assistantScroll}>
          {assistants.map((ast) => (
            <TouchableOpacity
              key={ast.id}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('AIInsights')}
            >
              <Card style={styles.assistantCard} variant="elevated">
                <View style={styles.astTop}>
                  <View style={[styles.astIconWrap, { backgroundColor: `${ast.color}20` }]}>
                    <Ionicons name={ast.icon as any} size={20} color={ast.color} />
                  </View>
                  <Badge
                    label={`${ast.confidence}% CONF`}
                    variant="success"
                    size="sm"
                  />
                </View>
                <Text style={styles.astName}>{ast.name}</Text>
                <Text style={styles.astDomain}>{ast.domain}</Text>
                <View style={styles.astOutputBox}>
                  <Text style={styles.astOutput} numberOfLines={2}>
                    {ast.output}
                  </Text>
                </View>
                <View style={styles.astFooter}>
                  <View style={styles.astActivePill}>
                    <View style={[styles.astStatusDot, { backgroundColor: ast.color }]} />
                    <Text style={styles.astStatusText}>{ast.status.toUpperCase()}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recent Orders List */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
            <Text style={styles.sectionLink}>See All ({orders.length})</Text>
          </TouchableOpacity>
        </View>

        {orders.slice(0, 3).map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('Orders')}
            activeOpacity={0.8}
          >
            <Card style={styles.orderCard}>
              <View style={styles.orderTop}>
                <View>
                  <Text style={styles.orderNumber}>{item.orderNumber}</Text>
                  <Text style={styles.customerName}>{item.customerName}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.orderAmount}>${item.totalAmount.toFixed(2)}</Text>
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
              <View style={styles.orderMeta}>
                <Text style={styles.orderDate}>{item.date}</Text>
                <Text style={styles.orderItems}>{item.itemsCount} Items • {item.paymentMethod}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  businessRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  businessName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#ffffff',
    marginRight: 8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 4,
  },
  liveText: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  greeting: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.cardBgElevated,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 12,
  },
  copilotBannerWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    marginVertical: 12,
  },
  copilotBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  bannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  bannerIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  bannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  quickActionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  quickActionCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: 14,
    alignItems: 'center',
    width: '23%',
  },
  qaIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  qaLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  assistantScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  assistantCard: {
    width: 220,
    marginRight: 12,
    padding: 14,
  },
  astTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  astIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  astName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  astDomain: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  astOutputBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 8,
    padding: 8,
    marginVertical: 10,
    minHeight: 44,
  },
  astOutput: {
    fontSize: 11,
    color: colors.textPrimary,
    lineHeight: 16,
  },
  astFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: 8,
  },
  astActivePill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  astStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  astStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  orderCard: {
    marginBottom: 10,
    padding: 12,
  },
  orderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
  },
  customerName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  orderAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  orderMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  orderDate: {
    fontSize: 11,
    color: colors.textMuted,
  },
  orderItems: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});
