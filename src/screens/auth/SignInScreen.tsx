// src/screens/auth/SignInScreen.tsx
import React, { useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, ScrollView,
  Platform, Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { AppTextField, BrandButton } from '../../components/ui';
import AuthLandingScreen from '../../components/auth/AuthLandingScreen';
import AuthFormHeader from '../../components/auth/AuthFormHeader';
import { firebaseAuth, userService } from '../../services/firebase';
import { ensureAuthReadyForUid } from '../../services/firebaseReady';
import { signInWithApple, signInWithGoogle, resolveCurrentUserProfile } from '../../services/socialAuth';
import { contentsquareService } from '../../services/contentsquareService';
import { useAppStore } from '../../store';
import { SensitiveCSQMask } from '../../components/common/SensitiveCSQMask';
import {
  enterDemoSession,
  enterDemoQuestionnaireSession,
  enterDemoClinicianSession,
  canSkipToApp,
} from '../../services/demoSession';
import { isGoogleSignInConfigured } from '../../config/appConfig';
import {
  authErrorMessage,
  accountTypeMismatchMessage,
  authErrorCode,
} from '../../utils/authErrorMessage';
import type { UserProfile } from '../../types';
import { logger } from '../../utils/logger';

const PROFILE_FETCH_RETRY_MS = 250;
const PROFILE_FETCH_RETRY_ATTEMPTS = 5;

type SignInRoute = RouteProp<
  { [Screen.signIn]: { role?: 'patient' | 'clinician' } | undefined },
  typeof Screen.signIn
>;

async function loadProfileWithRetry(uid: string): Promise<UserProfile | null> {
  let profile = await userService.getProfile(uid);
  for (let attempt = 0; !profile && attempt < PROFILE_FETCH_RETRY_ATTEMPTS; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, PROFILE_FETCH_RETRY_MS));
    profile = await userService.getProfile(uid);
  }
  return profile;
}

export default function SignInScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<SignInRoute>();
  const initialRole = route.params?.role === 'clinician' ? 'clinician' : 'patient';
  const {
    setUser,
    setWellnessScore,
    setAuthLoading,
    setSubscriptionTier,
    setHasSeenIntro,
    setClinicianProfileReady,
  } = useAppStore();

  // Clinicians arriving from Welcome / Purpose skip straight to email form.
  const [mode, setMode] = useState<'landing' | 'email'>(
    route.params?.role ? 'email' : 'landing',
  );
  const [role, setRole] = useState<'patient' | 'clinician'>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'apple' | 'google' | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);

  const clearFormError = () => {
    if (formError) setFormError(null);
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Please enter a valid email address';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignIn = async () => {
    if (!validate()) return;
    setFormError(null);
    setLoading(true);
    try {
      const cred = await firebaseAuth.signInWithEmail(email.trim(), password);

      // Auth already succeeded — do not surface token warm-up / network races as
      // a hard sign-in failure (common on Android after signInWithEmailAndPassword).
      await ensureAuthReadyForUid(cred.user.uid).catch((warmErr) => {
        if (__DEV__) {
          logger.warn(
            '[SignIn] auth warm-up failed (continuing):',
            authErrorCode(warmErr) || warmErr,
          );
        }
      });

      const profile = await loadProfileWithRetry(cred.user.uid);

      if (!profile) {
        // Keep the Firebase session so RootNavigator ensureProfile can recover;
        // only clear it when we know the account type is wrong.
        setFormError(
          "Signed in, but couldn't load your profile yet. Wait a moment and try again — check Account Type if this keeps happening.",
        );
        return;
      }

      if (profile.role !== role) {
        await firebaseAuth.signOut().catch(() => {});
        setFormError(accountTypeMismatchMessage(role, profile.role));
        return;
      }

      // Force clinician gate to re-resolve so a stale ready flag cannot skip the portal.
      // Gate/profile work runs in RootNavigator — never let it fail this catch path.
      if (profile.role === 'clinician') {
        setClinicianProfileReady(false);
      }
      setUser(profile);
      contentsquareService.onAuthSuccess(profile).catch((csqErr) => {
        console.warn('[SignIn] Contentsquare onAuthSuccess failed:', csqErr);
      });
    } catch (err: unknown) {
      if (__DEV__) {
        logger.warn('[SignIn] failed:', authErrorCode(err) || err);
      }
      setFormError(authErrorMessage(err, 'Sign in failed. Please try again.', 'signin'));
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setSocialLoading('apple');
    try {
      await signInWithApple();
      const profile = await resolveCurrentUserProfile();
      if (profile) await contentsquareService.onAuthSuccess(profile);
    } catch (err: any) {
      if (err.code !== '1001') Alert.alert('Apple Sign In Failed', 'Please try again.');
    } finally {
      setSocialLoading(null);
    }
  };

  const handleGoogleSignIn = async () => {
    setSocialLoading('google');
    try {
      await signInWithGoogle();
      const profile = await resolveCurrentUserProfile();
      if (profile) await contentsquareService.onAuthSuccess(profile);
    } catch (err: any) {
      if (err.code !== 'SIGN_IN_CANCELLED') Alert.alert('Google Sign In Failed', 'Please try again.');
    } finally {
      setSocialLoading(null);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Reset Password', 'Enter your email address first, then tap Forgot Password.');
      return;
    }
    try {
      await firebaseAuth.sendPasswordResetEmail(email.trim());
      Alert.alert('Email sent', `Password reset link sent to ${email.trim()}`);
    } catch {
      Alert.alert('Error', 'Could not send reset email. Check the address and try again.');
    }
  };

  const demoSetters = {
    setUser,
    setWellnessScore,
    setAuthLoading,
    setSubscriptionTier,
    setHasSeenIntro,
    setClinicianProfileReady,
  };

  const devSkipActions = canSkipToApp()
    ? [
        {
          label: 'Skip to Questionnaire',
          onPress: () => enterDemoQuestionnaireSession(demoSetters),
        },
        {
          label: 'Skip to Patient App',
          onPress: () => enterDemoSession(demoSetters),
        },
        {
          label: 'Skip to Clinician Portal',
          onPress: () => enterDemoClinicianSession(demoSetters),
        },
      ]
    : undefined;

  const signInHeroSlides = [
    { icon: 'body' as const, title: 'Wellness', subtitle: 'Your journey to better health starts here' },
    { icon: 'heart' as const, title: 'Health', subtitle: 'Track and improve your wellbeing' },
    { icon: 'brain' as const, title: 'Mindfulness', subtitle: 'Find peace through guided practices' },
    { icon: 'bar-chart' as const, title: 'Progress', subtitle: 'See your improvements over time' },
  ];

  const googleConfigured =
    isGoogleSignInConfigured();

  if (mode === 'landing') {
    return (
      <AuthLandingScreen
        primaryLabel="Sign In with Email"
        onPrimary={() => setMode('email')}
        onGoogle={googleConfigured ? handleGoogleSignIn : undefined}
        onApple={handleAppleSignIn}
        onBack={() => navigation.goBack()}
        devSkipActions={devSkipActions}
        switchPrompt="Don't have an account?"
        switchAction="Sign Up"
        onSwitch={() => navigation.navigate(Screen.createAccount)}
        googleLabel={googleConfigured ? 'Sign In with Google' : undefined}
        appleLabel="Sign In with Apple"
        socialLoading={socialLoading}
        heroSlides={signInHeroSlides}
      />
    );
  }

  return (
    <AuthFormHeader
      title="Welcome Back"
      subtitle={
        role === 'clinician'
          ? 'Sign in to your clinician portal'
          : 'Sign in to continue your wellness journey'
      }
      onBack={() => (route.params?.role ? navigation.goBack() : setMode('landing'))}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.formScroll}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <SensitiveCSQMask>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.cardIconWrap, styles.cardIconPurple]}>
                  <Ionicons name="people" size={16} color={Colors.purple} />
                </View>
                <Text style={styles.cardHeaderText}>Account Type</Text>
              </View>
              <View style={styles.segmented}>
                <TouchableOpacity
                  style={[styles.segment, role === 'patient' && styles.segmentActive]}
                  onPress={() => { setRole('patient'); clearFormError(); }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: role === 'patient' }}
                >
                  <Text style={[styles.segmentText, role === 'patient' && styles.segmentTextActive]}>Patient</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.segment, role === 'clinician' && styles.segmentActive]}
                  onPress={() => { setRole('clinician'); clearFormError(); }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: role === 'clinician' }}
                >
                  <Text style={[styles.segmentText, role === 'clinician' && styles.segmentTextActive]}>Clinician</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.cardIconWrap, styles.cardIconBrand]}>
                  <Ionicons name="lock-closed" size={16} color={Colors.brand} />
                </View>
                <Text style={styles.cardHeaderText}>Credentials</Text>
              </View>
              <View style={styles.fieldGap}>
                <AppTextField
                  label="Email"
                  leftIcon="mail-outline"
                  placeholder="your@email.com"
                  placeholderTextColor={Colors.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={(v) => {
                    setEmail(v);
                    setErrors((e) => ({ ...e, email: undefined }));
                    clearFormError();
                  }}
                  error={errors.email}
                />
                <AppTextField
                  label="Password"
                  leftIcon="lock-closed-outline"
                  placeholder="••••••••"
                  placeholderTextColor={Colors.textSecondary}
                  secureToggle
                  value={password}
                  onChangeText={(v) => {
                    setPassword(v);
                    setErrors((e) => ({ ...e, password: undefined }));
                    clearFormError();
                  }}
                  returnKeyType="done"
                  onSubmitEditing={handleSignIn}
                  error={errors.password}
                />
              </View>
            </View>

            {formError ? (
              <View style={styles.errorBanner} accessibilityRole="alert" accessibilityLiveRegion="polite">
                <Ionicons name="alert-circle" size={20} color={Colors.error} />
                <Text style={styles.errorBannerText}>{formError}</Text>
              </View>
            ) : null}
          </SensitiveCSQMask>

          {/* BrandButton: solid base + absolute gradient + white label — Android-safe */}
          <BrandButton
            label="Sign In"
            onPress={handleSignIn}
            loading={loading}
            disabled={!!socialLoading}
            style={styles.submitWrap}
          />

          <TouchableOpacity style={styles.linkRow} onPress={handleForgotPassword}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate(Screen.createAccount)} style={styles.switchRow}>
            <Text style={styles.switchPrompt}>Don't have an account? </Text>
            <Text style={styles.switchLink}>Create Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthFormHeader>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  formScroll: {
    flexGrow: 1,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
    ...Shadow.sm,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  cardIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconPurple: { backgroundColor: Colors.primaryBg },
  cardIconBrand: { backgroundColor: Colors.brandSubtle },
  cardHeaderText: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  segmented: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundAlt,
    borderRadius: Radius.xl,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: Radius.xl,
  },
  segmentActive: {
    backgroundColor: Colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(140, 89, 191, 0.28)',
    ...Shadow.sm,
  },
  segmentText: { fontSize: Typography.size.sm, color: Colors.textSecondary, fontWeight: '600' },
  segmentTextActive: { color: Colors.purple, fontWeight: '700' },
  fieldGap: { gap: Spacing.md },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: Colors.errorLight,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.error,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  errorBannerText: {
    flex: 1,
    fontSize: Typography.size.sm,
    color: Colors.error,
    fontWeight: '600',
    lineHeight: 20,
  },
  submitWrap: { marginTop: Spacing.sm },
  linkRow: { alignItems: 'center', marginTop: Spacing.md },
  linkText: { fontSize: Typography.size.sm, color: Colors.purple, fontWeight: '600' },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xl },
  switchPrompt: { fontSize: Typography.size.sm, color: Colors.text },
  switchLink: { fontSize: Typography.size.sm, color: Colors.purple, fontWeight: '700' },
});
