// src/screens/auth/AuthMainLandingScreen.tsx
import React, { useCallback, useSyncExternalStore } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing } from '../../theme';
import { Screen } from '../../navigation/screenNames';
import { enterDemoSession, enterDemoQuestionnaireSession, enterDemoClinicianSession, canSkipToApp } from '../../services/demoSession';
import { createGuestSession, ensureGuestOnboarding, generateGuestDailyPlan } from '../../services/guestSessionService';
import { DEMO_WELLNESS_SCORE } from '../../config/demoUser';
import { useAppStore } from '../../store';
import WellnessShiftLogoBadge from '../../components/auth/WellnessShiftLogoBadge';
import { AUTH_BACKGROUND, AUTH_CREATE_ACCOUNT_GRADIENT } from '../../theme/authTheme';
import type { RootStackParamList } from '../../types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  continueDeferredSimulatorSession,
  hasDeferredSimulatorSession,
  isSimulatorOrEmulator,
  subscribeDeferredSimulatorSession,
} from '../../services/simulatorLaunch';
import { appConfig } from '../../config/appConfig';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function AuthMainLandingScreen() {
  const navigation = useNavigation<Nav>();
  const {
    setUser, setWellnessScore, setAuthLoading, setSubscriptionTier, setHasSeenIntro, setClinicianProfileReady,
    setDailyPlan, setIsGuest, isAuthLoading,
  } = useAppStore();
  const [continuing, setContinuing] = React.useState(false);

  // Keep subscription so deferred Firebase session is ready when the button is tapped.
  useSyncExternalStore(
    subscribeDeferredSimulatorSession,
    hasDeferredSimulatorSession,
    () => false,
  );

  const demoSetters = {
    setUser, setWellnessScore, setAuthLoading, setSubscriptionTier, setHasSeenIntro, setClinicianProfileReady,
  };

  const handleTryAsGuest = async () => {
    setAuthLoading(true);
    try {
      const guestProfile = await createGuestSession();
      await ensureGuestOnboarding();
      const guestPlan = await generateGuestDailyPlan('general');
      setUser(guestProfile);
      setWellnessScore(DEMO_WELLNESS_SCORE);
      setDailyPlan(guestPlan);
      setIsGuest(true);
      setAuthLoading(false);
      setHasSeenIntro(true);
    } catch (e) {
      console.warn('Guest session failed:', e);
      setAuthLoading(false);
    }
  };

  const handleContinueWithSession = useCallback(async () => {
    if (continuing) return;
    setContinuing(true);
    try {
      if (hasDeferredSimulatorSession()) {
        const ok = await continueDeferredSimulatorSession();
        if (ok) return;
      }

      // Dev / demo / simulator fallback when no Firebase session is deferred.
      if (canSkipToApp() || isSimulatorOrEmulator() || appConfig.enableDemoMode) {
        enterDemoSession({
          setUser,
          setWellnessScore,
          setAuthLoading,
          setSubscriptionTier,
          setHasSeenIntro,
          setClinicianProfileReady,
        });
        return;
      }

      Alert.alert(
        'No active session',
        'Sign in or create an account to continue.',
      );
    } finally {
      setContinuing(false);
    }
  }, [
    continuing,
    setUser,
    setWellnessScore,
    setAuthLoading,
    setSubscriptionTier,
    setHasSeenIntro,
    setClinicianProfileReady,
  ]);

  const devSkipActions = canSkipToApp()
    ? [
        { label: 'Test Quiz', onPress: () => enterDemoQuestionnaireSession(demoSetters) },
        { label: 'Patient App', onPress: () => enterDemoSession(demoSetters) },
        { label: 'Clinician Portal', onPress: () => enterDemoClinicianSession(demoSetters) },
      ]
    : undefined;

  return (
    <View style={styles.root}>
      <View style={[styles.orb, styles.orb1]} />
      <View style={[styles.orb, styles.orb2]} />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.brandStage}>
          <WellnessShiftLogoBadge diameter={140} />
          <View style={styles.titleBlock}>
            <Text style={styles.appName}>Wellness Shift</Text>
            <Text style={styles.tagline}>Look after your body & mind</Text>
          </View>
        </View>

        <ScrollView
          style={styles.actionsScroll}
          contentContainerStyle={styles.actions}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate(Screen.authentication, { screen: Screen.createAccount })}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[...AUTH_CREATE_ACCOUNT_GRADIENT]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.primaryBtn}
            >
              <Text style={styles.primaryText}>Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.glassBtn}
            onPress={() => navigation.navigate(Screen.authentication, { screen: Screen.signIn })}
            activeOpacity={0.9}
          >
            <Text style={styles.glassText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sessionBtn}
            onPress={() => handleContinueWithSession()}
            activeOpacity={0.9}
            disabled={continuing || isAuthLoading}
          >
            {continuing ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.sessionText}>Continue with session</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.guestBtn}
            onPress={() => handleTryAsGuest()}
            activeOpacity={0.9}
          >
            <Text style={styles.guestText}>Try as Guest</Text>
          </TouchableOpacity>

          {canSkipToApp() && (
            <TouchableOpacity onPress={() => enterDemoSession(demoSetters)} style={styles.skipRow}>
              <Text style={styles.skipLink}>Skip & Continue to App</Text>
            </TouchableOpacity>
          )}

          {devSkipActions?.length ? (
            <View style={styles.devSkipSection}>
              <Text style={styles.devSkipLabel}>Debug tools</Text>
              {devSkipActions.map((action) => (
                <TouchableOpacity
                  key={action.label}
                  onPress={action.onPress}
                  style={styles.devSkipBtn}
                >
                  <Text style={styles.devSkipBtnText}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: AUTH_BACKGROUND },
  safe: { flex: 1, paddingHorizontal: 24 },
  brandStage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  orb1: { width: 300, height: 300, top: -200, left: -100 },
  orb2: { width: 200, height: 200, top: -50, right: -50, backgroundColor: 'rgba(255,255,255,0.08)' },
  titleBlock: { alignItems: 'center', gap: 8, width: '100%' },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    width: '100%',
  },
  tagline: {
    fontSize: Typography.size.base,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontWeight: '500',
    width: '100%',
  },
  actionsScroll: { flexGrow: 0, flexShrink: 1, maxHeight: '50%' },
  actions: { gap: 14, paddingBottom: 18 },
  primaryBtn: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
  },
  glassBtn: {
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassText: { color: Colors.white, fontSize: 17, fontWeight: '600' },
  sessionBtn: {
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionText: { color: Colors.white, fontSize: 17, fontWeight: '700' },
  guestBtn: {
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestText: { color: 'rgba(255,255,255,0.85)', fontSize: Typography.size.sm, fontWeight: '600' },
  skipRow: { alignItems: 'center', paddingTop: 8 },
  skipLink: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    fontWeight: '500',
  },
  devSkipSection: {
    gap: Spacing.xs,
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  devSkipLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  devSkipBtn: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  devSkipBtnText: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: Typography.size.sm,
    fontWeight: '600',
  },
});
