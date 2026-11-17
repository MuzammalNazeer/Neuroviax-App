import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';

export const AdminDashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Super Admin Cockpit"
        subtitle="Platform Infrastructure & Tenants"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* System Health */}
        <Card style={styles.healthCard} variant="glowing">
          <View style={styles.healthTop}>
            <View>
              <Text style={styles.healthLabel}>Infrastructure Status</Text>
              <Text style={styles.healthStatus}>ALL SYSTEMS OPERATIONAL</Text>
            </View>
            <Badge label="99.98% SLA" variant="success" size="sm" />
          </View>

          <View style={styles.systemGrid}>
            <View style={styles.sysItem}>
              <Ionicons name="server" size={16} color={colors.primary} />
              <Text style={styles.sysName}>MongoDB Cluster</Text>
              <Text style={styles.sysPing}>12ms</Text>
            </View>
            <View style={styles.sysItem}>
              <Ionicons name="hardware-chip" size={16} color={colors.secondaryLight} />
              <Text style={styles.sysName}>AI Inference API</Text>
              <Text style={styles.sysPing}>48ms</Text>
            </View>
            <View style={styles.sysItem}>
              <Ionicons name="flash" size={16} color="#fbbf24" />
              <Text style={styles.sysName}>Redis Cache</Text>
              <Text style={styles.sysPing}>2ms</Text>
            </View>
          </View>
        </Card>

        {/* Global Platform KPIs */}
        <Text style={styles.sectionTitle}>Global Platform Metrics</Text>
        <View style={styles.statRow}>
          <Card style={styles.statBox}>
            <Text style={styles.statVal}>148</Text>
            <Text style={styles.statLabel}>Active Enterprise Tenants</Text>
          </Card>
          <Card style={styles.statBox}>
            <Text style={[styles.statVal, { color: colors.primaryLight }]}>$482k</Text>
            <Text style={styles.statLabel}>Platform MRR</Text>
          </Card>
        </View>

        <View style={styles.statRow}>
          <Card style={styles.statBox}>
            <Text style={styles.statVal}>12,480</Text>
            <Text style={styles.statLabel}>Total Staff Users</Text>
          </Card>
          <Card style={styles.statBox}>
            <Text style={[styles.statVal, { color: colors.secondaryLight }]}>94.2k</Text>
            <Text style={styles.statLabel}>Daily API Requests</Text>
          </Card>
        </View>

        {/* Recent Tenant Signups */}
        <Text style={styles.sectionTitle}>Recent Enterprise Tenants</Text>
        <Card style={styles.tenantCard}>
          <View style={styles.tenantRow}>
            <View>
              <Text style={styles.tenantName}>Solaris Energy Global</Text>
              <Text style={styles.tenantSub}>Tier: ENTERPRISE • 14 Nodes</Text>
            </View>
            <Badge label="ACTIVE" variant="success" size="sm" />
          </View>
        </Card>

        <Card style={styles.tenantCard}>
          <View style={styles.tenantRow}>
            <View>
              <Text style={styles.tenantName}>Apex Retail Logistics</Text>
              <Text style={styles.tenantSub}>Tier: PRO GROWTH • 4 Warehouses</Text>
            </View>
            <Badge label="ACTIVE" variant="success" size="sm" />
          </View>
        </Card>

        <Card style={styles.tenantCard}>
          <View style={styles.tenantRow}>
            <View>
              <Text style={styles.tenantName}>CyberLink Telecoms</Text>
              <Text style={styles.tenantSub}>Tier: ENTERPRISE • 28 Nodes</Text>
            </View>
            <Badge label="TRIAL" variant="warning" size="sm" />
          </View>
        </Card>

        {/* Maintenance Controls */}
        <Button
          title="Flush Platform Cache"
          variant="secondary"
          size="md"
          icon="refresh-outline"
          onPress={() => Alert.alert('Cache Purged', 'Redis in-memory cache flushed successfully.')}
          style={{ marginTop: 10 }}
        />

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
  content: {
    padding: 16,
  },
  healthCard: {
    padding: 16,
    marginBottom: 16,
  },
  healthTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  healthLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  healthStatus: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primaryLight,
    marginTop: 2,
  },
  systemGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: 12,
  },
  sysItem: {
    alignItems: 'center',
    flex: 1,
  },
  sysName: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  sysPing: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textMuted,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    padding: 14,
  },
  statVal: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  tenantCard: {
    marginBottom: 10,
    padding: 14,
  },
  tenantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tenantName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  tenantSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
