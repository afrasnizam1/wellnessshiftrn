import React from 'react';
import {
  View, Text, StyleSheet, StatusBar, TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../../theme';
import WellnessShiftLogoBadge from '../../components/auth/WellnessShiftLogoBadge';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../navigation/screenNames';
import { enterDemoSession, enterDemoQuestionnaireSession, enterDemoClinicianSession, canSkipToApp } from '../../services/demoSession';
import { useAppStore } from '../../store';
import { AUTH_BACKGROUND, AUTH_CREATE_ACCOUNT_GRADIENT } from '../../theme/authTheme';
import type { RootStackParamList } from '../../types';

type Props = NativeStackScreenProps<RootStackParamList, typeof Screen.welcome>;

const LOGO_SIZE = 140;

export default function SplashScreen({ navigation }: Props) {
  const { setUser, setWellnessScore, setAuthLoading, setSubscriptionTier, setHasSeenIntro, setClinicianProfileReady } = useAppStore();

  const demoSetters = {
    setUser,
    setWellnessScore,
    setAuthLoading,
    setSubscriptionTier,
    setHasSeenIntro,
    setClinicianProfileReady,
  };

  const skipToApp = () => enterDemoSession(demoSetters);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <View style={[styles.orb, styles.orb1]} />
      <View style={[styles.orb, styles.orb2]} />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.brandStage}>
          <WellnessShiftLogoBadge diameter={LOGO_SIZE} />
          <View style={styles.titleBlock}>
            <Text style={styles.appName}>Wellness Shift</Text>
            <Text style={styles.tagline}>Your wellness score — with your clinician in the loop</Text>
          </View>
        </View>

        <View style={styles.actions}>
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

          {canSkipToApp() ? (
            <>
              <TouchableOpacity onPress={skipToApp} style={styles.skipRow}>
                <Text style={styles.skipLink}>Skip & Continue to App</Text>
              </TouchableOpacity>

              <View style={styles.devSkipSection}>
                <Text style={styles.devSkipLabel}>Debug tools</Text>
                <TouchableOpacity onPress={() => enterDemoQuestionnaireSession(demoSetters)} style={styles.devSkipBtn}>
                  <Text style={styles.devSkipBtnText}>Test Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => enterDemoSession(demoSetters)} style={styles.devSkipBtn}>
                  <Text style={styles.devSkipBtnText}>Patient App</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => enterDemoClinicianSession(demoSetters)} style={styles.devSkipBtn}>
                  <Text style={styles.devSkipBtnText}>Clinician Portal</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AUTH_BACKGROUND },
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
