import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ActivityIndicator, Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { firebaseAuth, userService } from '../../services/firebase';
import { ensurePendingOnboardingApplied } from '../../services/applyPendingOnboarding';
import { authErrorMessage } from '../../utils/authErrorMessage';
import { signOutCurrentUser } from '../../services/authSession';
import { deleteCurrentUserAccount } from '../../services/accountDeletion';
import { useAppStore } from '../../store';
import AppScreen from '../../components/common/AppScreen';

const RESEND_COOLDOWN_SECONDS = 60;

export default function EmailVerificationScreen() {
  const { user, setUser } = useAppStore();
  const [resending, setResending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [changingEmail, setChangingEmail] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const email = user?.email ?? auth().currentUser?.email ?? '';
  const busy = resending || checking || changingEmail;

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0) return;
    setResending(true);
    try {
      await firebaseAuth.sendEmailVerification();
      setCooldown(RESEND_COOLDOWN_SECONDS);
      Alert.alert('Email sent', 'A new verification email has been sent to your inbox.');
    } catch (error: any) {
      console.warn('Resend verification email failed:', error);
      Alert.alert('Error', authErrorMessage(error, 'Could not send verification email. Please try again.'));
    } finally {
      setResending(false);
    }
  };

  const handleCheckVerified = async () => {
    setChecking(true);
    try {
      await auth().currentUser?.reload();
      const current = auth().currentUser;
      if (!current?.emailVerified) {
        Alert.alert(
          'Not verified yet',
          'Please check your inbox and tap the verification link, then try again.'
        );
        return;
      }

      let profile = await userService.getProfile(current.uid);
      if (!profile) {
        await userService.createProfile(current.uid, {
          displayName: current.displayName || user?.displayName || 'User',
          email: current.email || user?.email || '',
          role: user?.role ?? 'patient',
        });
      }

      profile = await ensurePendingOnboardingApplied(current.uid);

      if (profile) {
        setUser(profile);
      } else {
        Alert.alert('Error', 'Your email is verified but we could not load your profile. Please try again.');
      }
    } catch (err) {
      Alert.alert('Error', authErrorMessage(err, 'Could not check verification status.'));
    } finally {
      setChecking(false);
    }
  };

  const handleSignOut = () => {
    signOutCurrentUser(user).catch(() => {
      Alert.alert('Sign Out', 'Could not complete sign out. Please try again.');
    });
  };

  const handleWrongEmail = () => {
    Alert.alert(
      'Wrong email address?',
      `This removes the unverified account for ${email || 'this address'} so you can sign up again with the correct email. You will need to re-enter your details.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Change email',
          style: 'destructive',
          onPress: () => {
            void (async () => {
              setChangingEmail(true);
              try {
                await deleteCurrentUserAccount();
              } catch (error) {
                console.warn('Change email / delete unverified account failed:', error);
                await signOutCurrentUser(user).catch(() => {});
                Alert.alert(
                  'Signed out',
                  authErrorMessage(
                    error,
                    'We signed you out. Create a new account with the correct email address.',
                  ),
                );
              } finally {
                setChangingEmail(false);
              }
            })();
          },
        },
      ],
    );
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.icon}>✉️</Text>
        <Text style={styles.title}>Verify your email</Text>
        <Text style={styles.subtitle}>
          We've sent a verification email to{'\n'}
          <Text style={styles.email}>{email}</Text>
        </Text>
        <Text style={styles.hint}>
          Please check your inbox and click the verification link to continue.
        </Text>

        <View style={styles.wrongEmailCard}>
          <Text style={styles.wrongEmailTitle}>Typed the wrong email?</Text>
          <Text style={styles.wrongEmailBody}>
            Go back and create your account again with the correct address. We will remove this
            unverified account first.
          </Text>
          <TouchableOpacity
            style={styles.wrongEmailBtn}
            onPress={handleWrongEmail}
            disabled={busy}
            accessibilityRole="button"
            accessibilityLabel="Change email address"
          >
            {changingEmail ? (
              <ActivityIndicator color={Colors.primary} />
            ) : (
              <Text style={styles.wrongEmailBtnText}>Change email address</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.primaryBtn, (resending || cooldown > 0) && styles.btnDisabled]}
          onPress={handleResend}
          disabled={busy || cooldown > 0}
        >
          {resending ? (
            <ActivityIndicator color={Colors.white} />
          ) : cooldown > 0 ? (
            <Text style={styles.primaryBtnText}>Resend in {cooldown}s</Text>
          ) : (
            <Text style={styles.primaryBtnText}>Resend verification email</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={handleCheckVerified}
          disabled={busy}
        >
          {checking ? (
            <ActivityIndicator color={Colors.primary} />
          ) : (
            <Text style={styles.secondaryBtnText}>I've verified, continue</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut} disabled={busy}>
          <Text style={styles.signOutText}>I'll verify later — sign out</Text>
        </TouchableOpacity>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  icon: { fontSize: 72, marginBottom: Spacing.sm },
  title: { fontSize: Typography.size['2xl'], fontWeight: '700', color: Colors.text },
  subtitle: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  email: { fontWeight: '700', color: Colors.text },
  hint: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center' },
  wrongEmailCard: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  wrongEmailTitle: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  wrongEmailBody: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  wrongEmailBtn: {
    alignSelf: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  wrongEmailBtnText: {
    color: Colors.primary,
    fontSize: Typography.size.sm,
    fontWeight: '700',
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: Colors.accent,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  btnDisabled: { opacity: 0.6 },
  primaryBtnText: { color: Colors.white, fontSize: Typography.size.base, fontWeight: '700' },
  secondaryBtn: { paddingVertical: Spacing.md },
  secondaryBtnText: { color: Colors.primary, fontSize: Typography.size.base, fontWeight: '600' },
  signOutBtn: { marginTop: Spacing.lg },
  signOutText: { color: Colors.textSecondary, fontSize: Typography.size.sm },
});
