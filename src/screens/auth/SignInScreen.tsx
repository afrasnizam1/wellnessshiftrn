// src/screens/auth/SignInScreen.tsx
import React, { useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, ScrollView, ActivityIndicator,
  Platform, Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { AppTextField } from '../../components/ui';
import AuthLandingScreen from '../../components/auth/AuthLandingScreen';
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
} from '../../utils/authErrorMessage';

export default function SignInScreen() {
  const navigation = useNavigation<any>();
  const {
    setUser,
    setWellnessScore,
    setAuthLoading,
    setSubscriptionTier,
    setHasSeenIntro,
    setClinicianProfileReady,
  } = useAppStore();

  const [mode, setMode] = useState<'landing' | 'email'>('landing');
  const [role, setRole] = useState<'patient' | 'clinician'>('patient');
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
      await ensureAuthReadyForUid(cred.user.uid);
      const profile = await userService.getProfile(cred.user.uid);
      if (profile && profile.role !== role) {
        await firebaseAuth.signOut().catch(() => {});
        setFormError(accountTypeMismatchMessage(role, profile.role));
        return;
      }
      if (profile) {
        setUser(profile);
        await contentsquareService.onAuthSuccess(profile);
      }
    } catch (err: unknown) {
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
    <View style={styles.root}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.formScroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => setMode('landing')}
            style={styles.closeBtn}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Ionicons name="close" size={20} color={Colors.text} />
          </TouchableOpacity>

          <SensitiveCSQMask>
            <View style={styles.header}>
              <View style={styles.headerIconCircle}>
                <Ionicons name="person" size={28} color={Colors.white} />
              </View>
              <Text style={styles.headerTitle}>Welcome Back</Text>
              <Text style={styles.headerSubtitle}>Sign in to continue your wellness journey</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="people" size={18} color={Colors.primary} />
                <Text style={styles.cardHeaderText}>Account Type</Text>
              </View>
              <View style={styles.segmented}>
                <TouchableOpacity
                  style={[styles.segment, role === 'patient' && styles.segmentActive]}
                  onPress={() => { setRole('patient'); clearFormError(); }}
                >
                  <Text style={[styles.segmentText, role === 'patient' && styles.segmentTextActive]}>Patient</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.segment, role === 'clinician' && styles.segmentActive]}
                  onPress={() => { setRole('clinician'); clearFormError(); }}
                >
                  <Text style={[styles.segmentText, role === 'clinician' && styles.segmentTextActive]}>Clinician</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="lock-closed" size={18} color={Colors.primary} />
                <Text style={styles.cardHeaderText}>Credentials</Text>
              </View>
              <View style={styles.fieldGap}>
                <AppTextField
                  label="Email"
                  leftIcon="mail-outline"
                  placeholder="your@email.com"
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

            <TouchableOpacity onPress={handleSignIn} disabled={loading || !!socialLoading} activeOpacity={0.9}>
              <LinearGradient
                colors={[Colors.purple, Colors.purpleLight]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[styles.submitBtn, (loading || !!socialLoading) && styles.submitBtnDisabled]}
              >
                {loading ? (
                  <ActivityIndicator color={Colors.white} size="small" />
                ) : (
                  <Text style={styles.submitText}>Sign In</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkRow} onPress={handleForgotPassword}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
          </SensitiveCSQMask>

          <TouchableOpacity onPress={() => navigation.navigate(Screen.createAccount)} style={styles.switchRow}>
            <Text style={styles.switchPrompt}>Don't have an account? </Text>
            <Text style={styles.switchLink}>Create Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  formScroll: { flexGrow: 1, padding: Spacing.xl, paddingBottom: Spacing['2xl'] },
  closeBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center', justifyContent: 'center',
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
  },
  header: { alignItems: 'center', marginBottom: Spacing.xl },
  headerIconCircle: {
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: Colors.purple,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  headerTitle: { fontSize: Typography.size.xl, fontWeight: '800', color: Colors.text },
  headerSubtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginBottom: Spacing.md },
  cardHeaderText: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  segmented: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: Radius.xl,
  },
  segmentActive: { backgroundColor: Colors.white, ...Shadow.sm },
  segmentText: { fontSize: Typography.size.sm, color: Colors.textSecondary, fontWeight: '600' },
  segmentTextActive: { color: Colors.text, fontWeight: '700' },
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
  submitBtn: {
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    ...Shadow.md,
  },
  submitBtnDisabled: { opacity: 0.55 },
  submitText: { color: Colors.white, fontSize: Typography.size.md, fontWeight: '700' },
  linkRow: { alignItems: 'center', marginTop: Spacing.md },
  linkText: { fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '600' },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xl },
  switchPrompt: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  switchLink: { fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '700' },
});
