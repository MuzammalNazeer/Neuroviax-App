import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { showAlert } from '../../utils/alert';

export const ReportsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [period, setPeriod] = useState<'30d' | '90d' | '1y'>('30d');

  const handleExport = (format: string) => {
    showAlert('Report Exported', `Generated Neuroviax_${period}_Executive_Summary.${format.toLowerCase()} successfully.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Executive Reports"
        subtitle="Audited BI & Financial Telemetry"
        showBack
        onBack={() => navigation.goBack()}
        rightAction={{
          icon: 'download-outline',
          onPress: () => handleExport('PDF'),
        }}
      />

      <View style={styles.periodRow}>
        {(['30d', '90d', '1y'] as const).map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.periodBtn, period === p && styles.periodBtnActive]}
            onPress={() => setPeriod(p)}
          >
            <Text style={[styles.periodText, period === p && styles.periodTextActive]}>
              {p === '30d' ? 'Last 30 Days' : p === '90d' ? 'Last Quarter' : 'Year to Date'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* KPI Snapshot */}
        <Card style={styles.kpiCard} variant="glowing">
          <Text style={styles.kpiTitle}>Executive Summary ({period.toUpperCase()})</Text>
          <View style={styles.kpiRow}>
            <View style={styles.kpiItem}>
              <Text style={styles.kpiVal}>$128,450</Text>
              <Text style={styles.kpiSub}>Gross Invoiced</Text>
            </View>
            <View style={styles.kpiItem}>
              <Text style={[styles.kpiVal, { color: colors.primaryLight }]}>$94,200</Text>
              <Text style={styles.kpiSub}>Gross Profit</Text>
            </View>
            <View style={styles.kpiItem}>
              <Text style={[styles.kpiVal, { color: colors.secondaryLight }]}>73.3%</Text>
              <Text style={styles.kpiSub}>Gross Margin</Text>
            </View>
          </View>
        </Card>

        {/* Breakdown Sections */}
        <Text style={styles.sectionHeading}>Domain Breakdown</Text>

        <Card style={styles.breakdownCard}>
          <View style={styles.bRow}>
            <View style={styles.bLeft}>
              <Ionicons name="cart" size={18} color={colors.primary} />
              <Text style={styles.bTitle}>Sales & Order Volume</Text>
            </View>
            <Text style={styles.bVal}>428 Orders</Text>
          </View>
          <Text style={styles.bDesc}>Avg order value: $300.11 (+12% vs last period)</Text>
        </Card>

        <Card style={styles.breakdownCard}>
          <View style={styles.bRow}>
            <View style={styles.bLeft}>
              <Ionicons name="cube" size={18} color={colors.warning} />
              <Text style={styles.bTitle}>Inventory Velocity & Turns</Text>
            </View>
            <Text style={styles.bVal}>4.8x Turn</Text>
          </View>
          <Text style={styles.bDesc}>Holding costs optimized by 18.2% through autonomous reordering</Text>
        </Card>

        <Card style={styles.breakdownCard}>
          <View style={styles.bRow}>
            <View style={styles.bLeft}>
              <Ionicons name="wallet" size={18} color="#a78bfa" />
              <Text style={styles.bTitle}>Operating Expenses</Text>
            </View>
            <Text style={styles.bVal}>$9,550.00</Text>
          </View>
          <Text style={styles.bDesc}>Cloud compute, logistics fleet and marketing ad spend</Text>
        </Card>

        {/* Export Buttons */}
        <View style={styles.exportSection}>
          <Button
            title="Download Executive PDF"
            icon="document-text-outline"
            onPress={() => handleExport('PDF')}
            size="lg"
            style={{ marginBottom: 10 }}
          />
          <Button
            title="Export CSV Raw Data"
            variant="secondary"
            icon="grid-outline"
            onPress={() => handleExport('CSV')}
            size="lg"
          />
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  periodRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    width: '100%',
    maxWidth: 1240,
    alignSelf: 'center',
  },
  periodBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.cardBgElevated,
    alignItems: 'center',
  },
  periodBtnActive: {
    backgroundColor: colors.primary,
  },
  periodText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  periodTextActive: {
    color: '#090d16',
  },
  content: {
    padding: 16,
    width: '100%',
    maxWidth: 1240,
    alignSelf: 'center',
  },
  kpiCard: {
    padding: 16,
    marginBottom: 16,
  },
  kpiTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 12,
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  kpiItem: {
    flex: 1,
  },
  kpiVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  kpiSub: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 10,
  },
  breakdownCard: {
    marginBottom: 10,
    padding: 14,
  },
  bRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  bLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 8,
  },
  bVal: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  bDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  exportSection: {
    marginTop: 20,
  },
});
