// src/screens/more/SubscriptionScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { useAppStore } from '../../store';
import { subscriptionService } from '../../services/subscriptionService';
import { getEffectiveTier } from '../../services/iap';
import type { SubscriptionTier } from '../../types';
import AppScreen from '../../components/common/AppScreen';

const PLANS = [
  {
    tier: 'free' as const,
    name: 'Free',
    color: Colors.textSecondary,
    features: [
      'Basic health calculators',
      'Limited AI coach messages',
      '3 brain games per day',
      'Progress tracking',
    ],
  },
  {
    tier: 'growth' as const,
    name: 'Growth',
    color: Colors.primary,
    popular: true,
    features: [
      'Everything in Free',
      'Higher AI coach allowance',
      'Advanced analytics',
      'PDF wellness export',
      'Meal planning tools',
    ],
  },
  {
    tier: 'pro' as const,
    name: 'Pro',
    color: Colors.accent,
    features: [
      'Everything in Growth',
      'Custom workouts',
      'Clinician integrations',
      'Advanced brain training',
    ],
  },
];

export default function SubscriptionScreen() {
  const navigation = useNavigation<any>();
  const { subscriptionTier, setSubscriptionTier } = useAppStore();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [loading, setLoading] = useState(false);
  const [pricesLoaded, setPricesLoaded] = useState(false);

  const effectiveTier = getEffectiveTier(subscriptionTier);

  const loadPrices = useCallback(async () => {
    await subscriptionService.loadStoreProducts();
    setPricesLoaded(true);
  }, []);

  useEffect(() => {
    loadPrices();
  }, [loadPrices]);

  const priceFor = (tier: 'growth' | 'pro') =>
    subscriptionService.getLocalizedPrice(tier, billingPeriod);

  const handleSubscribe = async (tier: 'growth' | 'pro') => {
    setLoading(true);
    try {
      const result = await subscriptionService.purchase(tier, billingPeriod);
      if (result?.tier) {
        setSubscriptionTier(result.tier);
        Alert.alert('Subscribed!', `You're now on the ${result.tier} plan.`);
      }
    } catch (err: any) {
      if (err?.code !== 'E_USER_CANCELLED') {
        Alert.alert('Purchase failed', 'Please try again or contact support.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    try {
      const restored = await subscriptionService.restore();
      if (restored) {
        setSubscriptionTier(restored.tier);
        Alert.alert('Restored', `Your ${restored.tier} subscription is active.`);
      } else {
        setSubscriptionTier('free');
        Alert.alert('No subscription found', 'No active subscription was found for this Apple/Google account.');
      }
    } catch {
      Alert.alert('Restore failed', 'Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const tierRank = (tier: SubscriptionTier) =>
    tier === 'pro' ? 2 : tier === 'growth' ? 1 : 0;

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.currentBanner}>
          <Text style={styles.currentLabel}>Current Plan</Text>
          <Text style={styles.currentTier}>
            {effectiveTier.charAt(0).toUpperCase() + effectiveTier.slice(1)}
          </Text>
          {effectiveTier === 'free' && (
            <Text style={styles.currentHint}>
              Billing is through Apple or Google. No App Store intro offer is configured in this build.
            </Text>
          )}
        </LinearGradient>

        <View style={styles.billingToggle}>
          <TouchableOpacity
            style={[styles.billingBtn, billingPeriod === 'monthly' && styles.billingBtnActive]}
            onPress={() => setBillingPeriod('monthly')}
          >
            <Text style={[styles.billingBtnText, billingPeriod === 'monthly' && styles.billingBtnTextActive]}>
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.billingBtn, billingPeriod === 'yearly' && styles.billingBtnActive]}
            onPress={() => setBillingPeriod('yearly')}
          >
            <Text style={[styles.billingBtnText, billingPeriod === 'yearly' && styles.billingBtnTextActive]}>
              Yearly
            </Text>
            <View style={styles.saveBadge}>
              <Text style={styles.saveBadgeText}>Save 30%</Text>
            </View>
          </TouchableOpacity>
        </View>

        {PLANS.map((plan) => {
          const isCurrent = effectiveTier === plan.tier;
          const price = plan.tier === 'free'
            ? '£0'
            : pricesLoaded
              ? priceFor(plan.tier)
              : '…';
          const period = plan.tier !== 'free'
            ? billingPeriod === 'monthly' ? '/mo' : '/yr'
            : '';
          const canUpgrade = plan.tier !== 'free' && tierRank(plan.tier) > tierRank(effectiveTier);

          return (
            <View
              key={plan.tier}
              style={[
                styles.planCard,
                isCurrent && styles.planCardCurrent,
                plan.popular && styles.planCardPopular,
              ]}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>Most Popular</Text>
                </View>
              )}
              <View style={styles.planHeader}>
                <View>
                  <Text style={[styles.planName, { color: plan.color }]}>{plan.name}</Text>
                  <View style={styles.planPriceRow}>
                    <Text style={styles.planPrice}>{price}</Text>
                    <Text style={styles.planPeriod}>{period}</Text>
                  </View>
                </View>
                {isCurrent && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>Current</Text>
                  </View>
                )}
              </View>

              <View style={styles.featureList}>
                {plan.features.map((f) => (
                  <View key={f} style={styles.featureRow}>
                    <Text style={[styles.featureCheck, { color: plan.color }]}>✓</Text>
                    <Text style={styles.featureText}>{f}</Text>
                  </View>
                ))}
              </View>

              {canUpgrade && (
                <TouchableOpacity
                  style={[styles.subscribeBtn, { backgroundColor: plan.color }, loading && styles.btnDisabled]}
                  onPress={() => handleSubscribe(plan.tier)}
                  disabled={loading}
                >
                  {loading
                    ? <ActivityIndicator color={Colors.white} />
                    : <Text style={styles.subscribeBtnText}>
                        {`Upgrade to ${plan.name}`}
                      </Text>
                  }
                </TouchableOpacity>
              )}
            </View>
          );
        })}

        {effectiveTier !== 'free' && (
          <TouchableOpacity style={styles.manageBtn} onPress={subscriptionService.openManageSubscriptions}>
            <Text style={styles.manageBtnText}>Manage subscription in App Store</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.restoreBtn} onPress={handleRestore} disabled={loading}>
          <Text style={styles.restoreBtnText}>Restore Purchases</Text>
        </TouchableOpacity>

        <Text style={styles.legalText}>{subscriptionService.billingLegalText}</Text>
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.base, gap: Spacing.md },

  currentBanner: {
    borderRadius: Radius.xl, padding: Spacing.xl,
    alignItems: 'center', gap: 4,
  },
  currentLabel: { color: 'rgba(255,255,255,0.7)', fontSize: Typography.size.sm },
  currentTier: { color: Colors.white, fontSize: Typography.size['2xl'], fontWeight: '700' },
  currentHint: { color: 'rgba(255,255,255,0.8)', fontSize: Typography.size.xs, marginTop: 4 },

  billingToggle: {
    flexDirection: 'row', backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.xl, padding: 3,
  },
  billingBtn: {
    flex: 1, paddingVertical: Spacing.sm, alignItems: 'center',
    borderRadius: Radius.xl, flexDirection: 'row',
    justifyContent: 'center', gap: 6,
  },
  billingBtnActive: { backgroundColor: Colors.white, ...Shadow.sm },
  billingBtnText: { fontSize: Typography.size.sm, color: Colors.textSecondary, fontWeight: '500' },
  billingBtnTextActive: { color: Colors.text, fontWeight: '700' },
  saveBadge: {
    backgroundColor: Colors.success, borderRadius: Radius.xl,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  saveBadgeText: { color: Colors.white, fontSize: 10, fontWeight: '700' },

  planCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl, padding: Spacing.base,
    borderWidth: 2, borderColor: Colors.border,
    ...Shadow.sm, gap: Spacing.md,
  },
  planCardCurrent: { borderColor: Colors.primary },
  planCardPopular: { borderColor: Colors.primary },
  popularBadge: {
    position: 'absolute', top: -12, alignSelf: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md, paddingVertical: 4,
    borderRadius: Radius.xl,
  },
  popularBadgeText: { color: Colors.white, fontSize: Typography.size.xs, fontWeight: '700' },
  planHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  planName: { fontSize: Typography.size.lg, fontWeight: '700' },
  planPriceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 2, marginTop: 4 },
  planPrice: { fontSize: Typography.size['2xl'], fontWeight: '700', color: Colors.text },
  planPeriod: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  currentBadge: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: Spacing.sm, paddingVertical: 4,
    borderRadius: Radius.xl,
  },
  currentBadgeText: { color: Colors.primary, fontSize: Typography.size.xs, fontWeight: '700' },

  featureList: { gap: Spacing.sm },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  featureCheck: { fontSize: Typography.size.sm, fontWeight: '700', width: 16 },
  featureText: { flex: 1, fontSize: Typography.size.sm, color: Colors.textSecondary },

  subscribeBtn: {
    borderRadius: Radius.xl, paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  btnDisabled: { opacity: 0.6 },
  subscribeBtnText: { color: Colors.white, fontSize: Typography.size.base, fontWeight: '700' },

  manageBtn: { alignItems: 'center', paddingVertical: Spacing.sm },
  manageBtnText: { color: Colors.primary, fontSize: Typography.size.sm, fontWeight: '600' },

  restoreBtn: { alignItems: 'center', paddingVertical: Spacing.md },
  restoreBtnText: { color: Colors.primary, fontSize: Typography.size.sm, fontWeight: '600' },
  legalText: {
    fontSize: Typography.size.xs, color: Colors.textTertiary,
    textAlign: 'center', lineHeight: 16,
  },
});
