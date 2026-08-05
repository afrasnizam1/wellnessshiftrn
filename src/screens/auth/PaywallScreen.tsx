// src/screens/auth/PaywallScreen.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import type { IoniconName } from '../../theme/icons';
import { useAppStore } from '../../store';
import { subscriptionService } from '../../services/subscriptionService';
import { getEffectiveTier } from '../../services/iap';
import { onboardingStorage } from '../../services/onboardingStorage';
import { pendingOnboardingStorage } from '../../services/pendingOnboardingStorage';
import { userService } from '../../services/firebase';
import type { SubscriptionTier } from '../../types';
import AppScreen from '../../components/common/AppScreen';
import { BrandButton, IconBadge } from '../../components/ui';
import { appConfig } from '../../config/appConfig';
import { goToCreateAccount, refreshPreAuthRouteFromPending } from '../../services/onboardingNavigation';

function tierRank(tier: SubscriptionTier) {
  if (tier === 'pro') return 2;
  if (tier === 'growth') return 1;
  return 0;
}

type FeatureHighlight = {
  icon: IoniconName;
  color: string;
  title: string;
};

const FEATURE_CONTEXT: Record<string, { icon: IoniconName; title: string; desc: string }> = {
  aiChat: {
    icon: 'sparkles-outline',
    title: 'AI Health Coach',
    desc: 'Ask personalised wellness questions with a higher daily message allowance.',
  },
  advancedAnalytics: {
    icon: 'stats-chart-outline',
    title: 'Advanced Analytics',
    desc: 'Detailed trends, insights and health dashboards.',
  },
  wellnessExport: {
    icon: 'clipboard-outline',
    title: 'Wellness Year Report',
    desc: 'Export a full PDF summary of your year.',
  },
  customWorkouts: {
    icon: 'barbell-outline',
    title: 'Custom Workouts',
    desc: 'Build personalised workout plans.',
  },
  default: {
    icon: 'sparkles-outline',
    title: 'Unlock your full plan',
    desc: 'Get analytics, export tools, and premium wellness features tailored to your results.',
  },
};

const PLAN_FEATURES: FeatureHighlight[] = [
  { icon: 'sparkles-outline', color: Colors.brand, title: 'Higher AI coach message allowance' },
  { icon: 'stats-chart-outline', color: Colors.physical, title: 'Advanced analytics & trends' },
  { icon: 'clipboard-outline', color: Colors.nutrition, title: 'Wellness year PDF export' },
  { icon: 'game-controller-outline', color: Colors.mental, title: 'Unlimited brain training' },
];

export default function PaywallScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { user, subscriptionTier, setSubscriptionTier, setUser, hasSeenIntro } = useAppStore();
  const feature = route.params?.feature ?? 'default';
  const fromOnboarding = route.params?.fromOnboarding === true;
  const context = FEATURE_CONTEXT[feature] ?? FEATURE_CONTEXT.default;

  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedTier, setSelectedTier] = useState<'growth' | 'pro'>('growth');
  const [loading, setLoading] = useState(false);
  const [pricesLoaded, setPricesLoaded] = useState(false);
  const previousTier = useRef(subscriptionTier);

  const effectiveTier = getEffectiveTier(subscriptionTier);
  const alreadyUnlocked =
    effectiveTier === 'pro' || (effectiveTier === 'growth' && selectedTier === 'growth');

  useEffect(() => {
    subscriptionService.loadStoreProducts().finally(() => setPricesLoaded(true));
  }, []);

  const growthPrice = subscriptionService.getLocalizedPrice('growth', billingPeriod);
  const proPrice = subscriptionService.getLocalizedPrice('pro', billingPeriod);
  const periodSuffix = billingPeriod === 'monthly' ? '/mo' : '/yr';

  const completeOnboarding = useCallback(async () => {
    if (fromOnboarding && user) {
      try {
        await onboardingStorage.markOnboardingPaywallSeen(user.uid);
        await onboardingStorage.markMainOnboardingSupplementsComplete(user.uid);
        await onboardingStorage.setPendingInAppGuide(user.uid, true);
        await userService.updateProfile(user.uid, { onboardingComplete: true });
        // Flip onboardingComplete — RootNavigator remounts via key change into Main App.
        setUser({ ...user, onboardingComplete: true });
      } catch (error) {
        console.warn('[Paywall] completeOnboarding failed:', error);
        Alert.alert('Something went wrong', 'Please try again.');
      }
      return;
    }
    if (fromOnboarding && !user) {
      try {
        await pendingOnboardingStorage.save({ paywallSeen: true });
        await refreshPreAuthRouteFromPending(hasSeenIntro);
        goToCreateAccount(navigation);
      } catch (error) {
        console.warn('[Paywall] guest continue failed:', error);
        Alert.alert('Something went wrong', 'Please try again.');
      }
      return;
    }
    navigation.goBack();
  }, [fromOnboarding, user, setUser, navigation, hasSeenIntro]);

  useEffect(() => {
    const prev = getEffectiveTier(previousTier.current);
    const next = getEffectiveTier(subscriptionTier);
    if (tierRank(next) > tierRank(prev)) {
      Alert.alert("You're subscribed!", `Welcome to ${next.charAt(0).toUpperCase() + next.slice(1)}.`, [
        {
          text: 'OK',
          onPress: () => {
            if (fromOnboarding) {
              void completeOnboarding();
            } else {
              navigation.goBack();
            }
          },
        },
      ]);
    }
    previousTier.current = subscriptionTier;
  }, [subscriptionTier, navigation, fromOnboarding, completeOnboarding]);

  const goToSubscriptionPlans = () => {
    if (fromOnboarding) {
      Alert.alert(
        'Compare plans anytime',
        'Continue free to enter the app, then open More → Subscription to compare plans.',
      );
      return;
    }
    navigation.dispatch(
      CommonActions.navigate({
        name: Screen.patientApp,
        params: { screen: Screen.tabMore, params: { screen: Screen.subscription } },
      }),
    );
  };

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const result = await subscriptionService.purchase(selectedTier, billingPeriod);
      if (result?.tier) {
        setSubscriptionTier(result.tier);
      }
    } catch (err: any) {
      if (err?.code !== 'E_USER_CANCELLED') {
        Alert.alert('Purchase failed', 'Please try again or restore an existing purchase.');
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
        Alert.alert('Restored', `Your ${restored.tier} plan is active.`, [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('No subscription found', 'We could not find an active subscription for this account.');
      }
    } catch {
      Alert.alert('Restore failed', 'Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrimary = () => {
    if (alreadyUnlocked) {
      completeOnboarding();
      return;
    }
    handlePurchase();
  };

  const primaryLabel = alreadyUnlocked
    ? (fromOnboarding ? 'Continue to app' : 'Continue')
    : 'Subscribe';

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={completeOnboarding}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Close paywall"
        >
          <Ionicons name="close" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <IconBadge name={context.icon} color={Colors.primary} size="lg" />
          <Text style={styles.eyebrow}>
            {fromOnboarding ? 'Final step' : 'Premium'}
          </Text>
          <Text style={styles.title}>{context.title}</Text>
          <Text style={styles.subtitle}>{context.desc}</Text>
        </View>

        <View style={styles.billingToggle}>
          <TouchableOpacity
            style={[styles.billingOption, billingPeriod === 'monthly' && styles.billingOptionActive]}
            onPress={() => setBillingPeriod('monthly')}
          >
            <Text style={[styles.billingText, billingPeriod === 'monthly' && styles.billingTextActive]}>
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.billingOption, billingPeriod === 'yearly' && styles.billingOptionActive]}
            onPress={() => setBillingPeriod('yearly')}
          >
            <Text style={[styles.billingText, billingPeriod === 'yearly' && styles.billingTextActive]}>
              Yearly
            </Text>
            <View style={styles.savePill}>
              <Text style={styles.savePillText}>−30%</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.plans}>
          {([
            { id: 'growth' as const, name: 'Growth', desc: 'AI coach, analytics & export', price: growthPrice },
            { id: 'pro' as const, name: 'Pro', desc: 'Growth + clinician tools', price: proPrice },
          ]).map((plan) => {
            const selected = selectedTier === plan.id;
            return (
              <TouchableOpacity
                key={plan.id}
                style={[styles.planCard, selected && styles.planCardSelected]}
                onPress={() => setSelectedTier(plan.id)}
                activeOpacity={0.85}
              >
                <View style={[styles.radio, selected && styles.radioSelected]}>
                  {selected ? <View style={styles.radioDot} /> : null}
                </View>
                <View style={styles.planBody}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <Text style={styles.planDesc}>{plan.desc}</Text>
                </View>
                <Text style={styles.planPrice}>
                  {pricesLoaded ? plan.price : '…'}
                  <Text style={styles.planPeriod}>{periodSuffix}</Text>
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.featureList}>
          {PLAN_FEATURES.map((item) => (
            <View key={item.title} style={styles.featureRow}>
              <IconBadge name={item.icon} color={item.color} size="sm" variant="soft" />
              <Text style={styles.featureText}>{item.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
          <BrandButton
          label={primaryLabel}
          onPress={handlePrimary}
          loading={loading}
          disabled={loading}
        />

        {!alreadyUnlocked && (
          <Text style={styles.trialNote}>
            {selectedTier === 'pro' ? 'Pro' : 'Growth'} · {billingPeriod === 'yearly' ? '1 year' : '1 month'} ·{' '}
            {selectedTier === 'pro' ? proPrice : growthPrice}
            {periodSuffix}
            {'\n'}
            Auto-renews unless cancelled at least 24 hours before the period ends. Payment is charged to your Apple ID / Google Play account. Manage or cancel in store settings.
          </Text>
        )}

        <View style={styles.footerLinks}>
          <TouchableOpacity
            onPress={handleRestore}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel="Restore purchases"
          >
            <Text style={styles.linkText}>Restore</Text>
          </TouchableOpacity>
          <Text style={styles.linkDivider}>·</Text>
          <TouchableOpacity
            onPress={goToSubscriptionPlans}
            accessibilityRole="button"
            accessibilityLabel="Compare plans"
          >
            <Text style={styles.linkText}>Compare plans</Text>
          </TouchableOpacity>
          {fromOnboarding ? (
            <>
              <Text style={styles.linkDivider}>·</Text>
              <TouchableOpacity
                onPress={completeOnboarding}
                accessibilityRole="button"
                accessibilityLabel="Continue free"
              >
                <Text style={styles.linkText}>Continue free</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </View>

        <View style={styles.legalLinks}>
          <TouchableOpacity
            onPress={() => Linking.openURL(appConfig.privacyPolicyUrl)}
            accessibilityRole="link"
            accessibilityLabel="Privacy Policy"
          >
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={styles.linkDivider}>·</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(appConfig.termsOfServiceUrl)}
            accessibilityRole="link"
            accessibilityLabel="Terms of Use"
          >
            <Text style={styles.linkText}>Terms of Use</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.legalText}>{subscriptionService.billingLegalText}</Text>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.sm,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  content: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.md,
    gap: Spacing.lg,
  },
  hero: {
    alignItems: 'center',
    gap: Spacing.sm,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xs,
  },
  eyebrow: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: Spacing.xs,
  },
  title: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    maxWidth: 320,
  },
  billingToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.pill,
    padding: 4,
  },
  billingOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
  },
  billingOptionActive: {
    backgroundColor: Colors.surface,
  },
  billingText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  billingTextActive: {
    color: Colors.text,
    fontWeight: '700',
  },
  savePill: {
    backgroundColor: Colors.success,
    borderRadius: Radius.pill,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  savePillText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
  plans: { gap: Spacing.sm },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
  },
  planCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryBg,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: Colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  planBody: { flex: 1, gap: 2 },
  planName: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  planDesc: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  planPrice: {
    fontSize: Typography.size.lg,
    fontWeight: '800',
    color: Colors.primary,
  },
  planPeriod: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  featureList: {
    gap: Spacing.sm,
    paddingTop: Spacing.xs,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  featureText: {
    flex: 1,
    fontSize: Typography.size.sm,
    color: Colors.text,
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
    gap: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
    backgroundColor: Colors.background,
  },
  trialNote: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  legalLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  linkText: {
    fontSize: Typography.size.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  linkDivider: {
    fontSize: Typography.size.sm,
    color: Colors.textTertiary,
  },
  legalText: {
    fontSize: 10,
    color: Colors.textTertiary,
    textAlign: 'center',
    lineHeight: 14,
    marginTop: Spacing.xs,
  },
});
