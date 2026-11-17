import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';

const { width } = Dimensions.get('window');

const TABS = [
  { id: 'demand', label: 'Demand Forecasting', icon: 'trending-up' },
  { id: 'cashflow', label: 'Cash Flow', icon: 'cash' },
  { id: 'anomaly', label: 'Anomaly Detector', icon: 'alert-circle' },
  { id: 'segments', label: 'Customer Clusters', icon: 'people' },
  { id: 'abop', label: 'ABOP Loop', icon: 'git-network' },
];

export const AIInsightsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('demand');

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="AI Intelligence Core"
        subtitle="Prophet · Isolation Forest · K-Means · Gemini"
      />

      {/* Navigation Pills */}
      <View style={styles.tabScrollWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabPill,
                activeTab === tab.id && styles.tabPillActive,
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Ionicons
                name={tab.icon as any}
                size={14}
                color={activeTab === tab.id ? '#090d16' : colors.textSecondary}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === tab.id && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* 1. Demand Forecasting */}
        {activeTab === 'demand' && (
          <View>
            <Card style={styles.highlightCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.modelName}>Model: Meta Prophet v1.1</Text>
                  <Text style={styles.modelTitle}>30-Day Demand Projection</Text>
                </View>
                <Badge label="96.4% ACCURACY" variant="success" size="sm" />
              </View>

              <View style={styles.statGrid}>
                <View style={styles.miniStat}>
                  <Text style={styles.miniLabel}>Expected Spike</Text>
                  <Text style={styles.miniValue}>+24.6%</Text>
                </View>
                <View style={styles.miniStat}>
                  <Text style={styles.miniLabel}>Top Product Surge</Text>
                  <Text style={styles.miniValue}>IoT Gateway V2</Text>
                </View>
                <View style={styles.miniStat}>
                  <Text style={styles.miniLabel}>Confidence Interval</Text>
                  <Text style={styles.miniValue}>95% CI</Text>
                </View>
              </View>
            </Card>

            <Text style={styles.sectionHeading}>Product Demand Ranking</Text>

            <Card style={styles.itemCard}>
              <View style={styles.itemRow}>
                <View>
                  <Text style={styles.itemTitle}>Neural Edge IoT Sensor Pro</Text>
                  <Text style={styles.itemSub}>SKU: NEU-IOT-001 • Current Stock: 84</Text>
                </View>
                <Badge label="+35% Demand" variant="success" />
              </View>
              <Text style={styles.aiNote}>
                💡 Recommendation: Stock is adequate for next 18 days. Reorder at day 12.
              </Text>
            </Card>

            <Card style={styles.itemCard}>
              <View style={styles.itemRow}>
                <View>
                  <Text style={styles.itemTitle}>AI Gateway Controller V2</Text>
                  <Text style={styles.itemSub}>SKU: NEU-GW-002 • Current Stock: 8</Text>
                </View>
                <Badge label="HIGH RISK" variant="danger" />
              </View>
              <Text style={[styles.aiNote, { color: '#f87171' }]}>
                ⚠️ Alert: Stockout expected in 4 days. Auto-generating PO for 50 units to Apex Microelectronics.
              </Text>
            </Card>
          </View>
        )}

        {/* 2. Cash Flow */}
        {activeTab === 'cashflow' && (
          <View>
            <Card style={styles.highlightCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.modelName}>Model: Financial Time Series</Text>
                  <Text style={styles.modelTitle}>Net Liquidity & Runway</Text>
                </View>
                <Badge label="HEALTHY" variant="success" size="sm" />
              </View>

              <View style={styles.statGrid}>
                <View style={styles.miniStat}>
                  <Text style={styles.miniLabel}>30-Day Inflow</Text>
                  <Text style={[styles.miniValue, { color: colors.primaryLight }]}>+$84,100</Text>
                </View>
                <View style={styles.miniStat}>
                  <Text style={styles.miniLabel}>Scheduled Payables</Text>
                  <Text style={[styles.miniValue, { color: colors.danger }]}>-$38,900</Text>
                </View>
                <View style={styles.miniStat}>
                  <Text style={styles.miniLabel}>Projected Net</Text>
                  <Text style={styles.miniValue}>+$45,200</Text>
                </View>
              </View>
            </Card>

            <Text style={styles.sectionHeading}>Upcoming Cash Events</Text>
            <Card style={styles.itemCard}>
              <View style={styles.itemRow}>
                <View>
                  <Text style={styles.itemTitle}>Enterprise Order Receivable</Text>
                  <Text style={styles.itemSub}>Ahmad Khan Enterprises • Due in 3 days</Text>
                </View>
                <Text style={[styles.itemAmount, { color: colors.primary }]}>+$14,200</Text>
              </View>
            </Card>
            <Card style={styles.itemCard}>
              <View style={styles.itemRow}>
                <View>
                  <Text style={styles.itemTitle}>Cloud & Hardware Server Cluster</Text>
                  <Text style={styles.itemSub}>Vendor: AWS Cloud Systems • Scheduled Nov 24</Text>
                </View>
                <Text style={[styles.itemAmount, { color: colors.danger }]}>-$3,250</Text>
              </View>
            </Card>
          </View>
        )}

        {/* 3. Anomaly Detection */}
        {activeTab === 'anomaly' && (
          <View>
            <Card style={styles.highlightCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.modelName}>Model: Scikit Isolation Forest</Text>
                  <Text style={styles.modelTitle}>Hybrid Anomaly Radar</Text>
                </View>
                <Badge label="1 FLAG" variant="warning" size="sm" />
              </View>
              <Text style={styles.description}>
                Continuous scanning of general ledger transactions, warehouse shipments, and discount overrides.
              </Text>
            </Card>

            <Text style={styles.sectionHeading}>Flagged Deviations</Text>
            <Card style={[styles.itemCard, { borderColor: colors.warning }]}>
              <View style={styles.itemRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>Marketing Ad Spend Outlier</Text>
                  <Text style={styles.itemSub}>Date: Nov 12 • Amount: $4,500.00</Text>
                </View>
                <Badge label="Z-Score 3.2" variant="warning" />
              </View>
              <Text style={styles.aiNote}>
                Reason: Spend is 45% higher than 30-day baseline. Auto-notified finance manager for verification.
              </Text>
            </Card>
          </View>
        )}

        {/* 4. Customer Segmentation */}
        {activeTab === 'segments' && (
          <View>
            <Card style={styles.highlightCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.modelName}>Model: K-Means Clustering (k=4)</Text>
                  <Text style={styles.modelTitle}>RFM Behavioral Segments</Text>
                </View>
                <Badge label="UPDATED TODAY" variant="info" size="sm" />
              </View>
              <Text style={styles.description}>
                Customers grouped automatically by Recency, Frequency, and Monetary enterprise value.
              </Text>
            </Card>

            <Text style={styles.sectionHeading}>Active Customer Segments</Text>
            <Card style={styles.itemCard}>
              <View style={styles.itemRow}>
                <View>
                  <Text style={styles.itemTitle}>VIP Champions (Top 15%)</Text>
                  <Text style={styles.itemSub}>High spend, frequent purchases • 182 accounts</Text>
                </View>
                <Badge label="Avg: $18.4k" variant="success" />
              </View>
            </Card>

            <Card style={styles.itemCard}>
              <View style={styles.itemRow}>
                <View>
                  <Text style={styles.itemTitle}>Loyal Repeat Buyers</Text>
                  <Text style={styles.itemSub}>Consistent quarterly ordering • 420 accounts</Text>
                </View>
                <Badge label="Avg: $7.2k" variant="info" />
              </View>
            </Card>

            <Card style={styles.itemCard}>
              <View style={styles.itemRow}>
                <View>
                  <Text style={styles.itemTitle}>At-Risk Inactive</Text>
                  <Text style={styles.itemSub}>No order in 60+ days • 64 accounts</Text>
                </View>
                <Badge label="Churn Risk" variant="danger" />
              </View>
            </Card>
          </View>
        )}

        {/* 5. ABOP Loop */}
        {activeTab === 'abop' && (
          <View>
            <Card style={styles.highlightCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.modelName}>Autonomous Architecture</Text>
                  <Text style={styles.modelTitle}>The ABOP Control Loop</Text>
                </View>
                <Badge label="LOOP ACTIVE" variant="success" size="sm" />
              </View>
              <Text style={styles.description}>
                Autonomous Business Optimization Protocol: Self-healing enterprise decision pipelines.
              </Text>
            </Card>

            <View style={styles.abopStep}>
              <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNumText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>OBSERVE</Text>
                <Text style={styles.stepDesc}>Ingests real-time webhooks, IoT sensor telemetries, and POS orders.</Text>
              </View>
            </View>

            <View style={styles.abopStep}>
              <View style={[styles.stepNumber, { backgroundColor: colors.secondaryLight }]}>
                <Text style={styles.stepNumText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>ORIENT</Text>
                <Text style={styles.stepDesc}>Runs Prophet and Isolation Forest algorithms to calculate forecast deltas.</Text>
              </View>
            </View>

            <View style={styles.abopStep}>
              <View style={[styles.stepNumber, { backgroundColor: colors.warning }]}>
                <Text style={styles.stepNumText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>DECIDE</Text>
                <Text style={styles.stepDesc}>Gemini 1.5 Pro reasoning agent weighs supplier pricing and lead-times.</Text>
              </View>
            </View>

            <View style={styles.abopStep}>
              <View style={[styles.stepNumber, { backgroundColor: '#8b5cf6' }]}>
                <Text style={styles.stepNumText}>4</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>ACT</Text>
                <Text style={styles.stepDesc}>Dispatches purchase orders or alerts executives for 1-click approvals.</Text>
              </View>
            </View>
          </View>
        )}

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
  tabScrollWrapper: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  tabsRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  tabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.cardBgElevated,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  tabPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  tabLabelActive: {
    color: '#090d16',
  },
  content: {
    padding: 16,
  },
  highlightCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    padding: 16,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  modelName: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modelTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 2,
  },
  statGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  miniStat: {
    flex: 1,
  },
  miniLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  miniValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginTop: 6,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
    marginTop: 6,
  },
  itemCard: {
    marginBottom: 10,
    padding: 14,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  itemSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  itemAmount: {
    fontSize: 15,
    fontWeight: '800',
  },
  aiNote: {
    fontSize: 12,
    color: colors.primaryLight,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    lineHeight: 16,
  },
  abopStep: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#090d16',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  stepDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
});
