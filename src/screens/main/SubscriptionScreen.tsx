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
import { Badge } from '../../components/Badge';
import { useAuth } from '../../context/AuthContext';
import { showAlert } from '../../utils/alert';

const PLANS = [
  {
    id: 'STARTER',
    name: 'Starter Pilot',
    price: '$49',
    period: '/month',
    desc: 'For small businesses deploying initial AI inventory and order optimization.',
    features: [
      'Up to 1,000 monthly orders',
      'Meta Prophet 7-day demand forecasting',
      'Basic Sales & Inventory AI Assistants',
      'Shopify & WooCommerce integrations',
      'Standard email support',
    ],
  },
  {
    id: 'PRO',
    name: 'Pro Growth',
    price: '$149',
    period: '/month',
    popular: true,
    desc: 'Full autonomous loops across 6 AI assistants with cash flow radar.',
    features: [
      'Up to 15,000 monthly orders',
      'Prophet + Isolation Forest 30-day radar',
      'All 6 Autonomous AI Assistants',
      'Automated Supplier PO generation',
      'Multi-channel inventory sync',
      'Priority 24/7 technical assistance',
    ],
  },
  {
    id: 'ENTERPRISE',
    name: 'Enterprise Sovereign',
    price: '$499',
    period: '/month',
    desc: 'Dedicated enterprise infrastructure with Gemini 1.5 Pro reasoning cockpit.',
    features: [
      'Unlimited orders & transactions',
      'Dedicated private AI model fine-tuning',
      'Custom ERP integrations (SAP, NetSuite)',
      'Autonomous financial auto-hedging',
      'Dedicated solutions architect',
      'Custom SLA guarantees (99.99%)',
    ],
  },
];

export const SubscriptionScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string>(user?.plan || 'ENTERPRISE');

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    updateUser({ plan: planId as any });
    showAlert('Subscription Updated', `Your business is now on the ${planId} tier.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Subscription Plans"
        subtitle="Scale Your Autonomous ERP Intelligence"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerSub}>Current Active Plan</Text>
          <View style={styles.currentPlanRow}>
            <Text style={styles.currentPlanText}>{user?.plan || 'ENTERPRISE'} TIER</Text>
            <Badge label="ACTIVE & BILLED" variant="success" size="sm" />
          </View>
        </View>

        {PLANS.map((plan) => {
          const isCurrent = user?.plan === plan.id;
          return (
            <Card
              key={plan.id}
              style={[
                styles.planCard,
                plan.popular && styles.popularCard,
                isCurrent && styles.activePlanCard,
              ]}
              variant={plan.popular ? 'glowing' : 'default'}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>MOST POPULAR</Text>
                </View>
              )}

              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{plan.price}</Text>
                <Text style={styles.period}>{plan.period}</Text>
              </View>
              <Text style={styles.planDesc}>{plan.desc}</Text>

              <View style={styles.featureList}>
                {plan.features.map((feat, idx) => (
                  <View key={idx} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
                    <Text style={styles.featureText}>{feat}</Text>
                  </View>
                ))}
              </View>

              <Button
                title={isCurrent ? 'Current Plan' : `Upgrade to ${plan.name}`}
                variant={isCurrent ? 'secondary' : plan.popular ? 'primary' : 'outline'}
                onPress={() => handleSelectPlan(plan.id)}
                size="md"
                disabled={isCurrent}
                style={{ marginTop: 14 }}
              />
            </Card>
          );
        })}

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
  content: {
    padding: 16,
    width: '100%',
    maxWidth: 840,
    alignSelf: 'center',
  },
  banner: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 16,
    marginBottom: 16,
  },
  bannerSub: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  currentPlanRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  currentPlanText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  planCard: {
    marginBottom: 16,
    padding: 18,
    position: 'relative',
  },
  popularCard: {
    borderColor: colors.primary,
  },
  activePlanCard: {
    borderColor: colors.secondaryLight,
  },
  popularBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  popularText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#090d16',
    letterSpacing: 0.5,
  },
  planName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 6,
  },
  price: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.primaryLight,
  },
  period: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  planDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 14,
  },
  featureList: {
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: colors.textPrimary,
    marginLeft: 8,
    flex: 1,
  },
});
