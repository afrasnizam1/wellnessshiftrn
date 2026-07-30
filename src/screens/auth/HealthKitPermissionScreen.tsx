import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Platform, Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import type { IoniconName } from '../../theme/icons';
import { getHealthPlatformName, healthKitService } from '../../services/healthkit';
import { analyticsHelper } from '../../services/analyticsHelper';
import { Screen } from '../../navigation/screenNames';
import { onboardingStorage } from '../../services/onboardingStorage';
import { userService } from '../../services/firebase';
import { useAppStore } from '../../store';
import AppScreen from '../../components/common/AppScreen';
import { IconBadge } from '../../components/ui';

const DATA_TYPES: { icon: IoniconName; label: string }[] = [
  { icon: 'footsteps-outline', label: 'Steps & Distance' },
  { icon: 'flame-outline', label: 'Active Calories' },
  { icon: 'heart-outline', label: 'Heart Rate' },
  { icon: 'bed-outline', label: 'Sleep Analysis' },
  { icon: 'water-outline', label: 'Blood Pressure & Glucose' },
  { icon: 'fitness-outline', label: 'Oxygen Saturation' },
  { icon: 'scale-outline', label: 'Weight & Height' },
];

const isAndroid = Platform.OS === 'android';
const platformName = getHealthPlatformName();

export default function HealthKitPermissionScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [loading, setLoading] = useState(false);
  const isReconnect = user?.onboardingComplete === true;

  const finishOnboarding = async () => {
    if (user) {
      await onboardingStorage.markHealthKitPromptSeen(user.uid);
    }
  };

  const leaveScreen = async () => {
    if (user) {
      await onboardingStorage.markHealthKitPromptSeen(user.uid);
    }
    if (isReconnect) {
      navigation.goBack();
      return;
    }
    navigation.replace(Screen.subscriptionPaywall, { fromOnboarding: true });
  };

  const handleConnect = async () => {
    setLoading(true);
    let granted = false;
    try {
      const available = await healthKitService.isAvailable();
      if (!available) {
        Alert.alert(
          `${platformName} unavailable`,
          Platform.OS === 'ios'
            ? 'Apple Health is not available on this device.'
            : 'Install or update Health Connect from the Play Store, then try again.'
        );
        if (!isReconnect) await leaveScreen();
        return;
      }

      granted = await healthKitService.requestPermissions();
      if (granted) {
        analyticsHelper.trackHealthKitConnected();
        await leaveScreen();
      } else {
        Alert.alert(
          'Permission needed',
          Platform.OS === 'ios'
            ? 'Open Settings → Health → Data Access & Devices → Wellness Shift and turn on the data types you want to share.'
            : `Allow Wellness Shift to read your ${platformName} data in the Health Connect app.`
        );
        if (!isReconnect) await leaveScreen();
      }
    } catch {
      Alert.alert('Connection failed', `Could not connect to ${platformName}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <IconBadge
            name={isAndroid ? 'phone-portrait-outline' : 'heart-outline'}
            color={Colors.brand}
            size="lg"
          />
          <Text style={styles.heroTitle}>Connect {platformName}</Text>
          <Text style={styles.heroSub}>
            Wellness Shift reads your health data to personalise your wellness score and daily plan.
            {isAndroid
              ? ' Data from your phone, watch, and fitness apps syncs through Health Connect.'
              : ' We never write to Apple Health.'}
          </Text>
        </View>

        {isAndroid && (
          <View style={styles.noteCard}>
            <Text style={styles.noteText}>
              Requires the Health Connect app (built into Android 14+, or install from Play Store on Android 13).
              Wear OS, Samsung Galaxy Watch, and Google Pixel Watch data appears here once synced to Health Connect.
            </Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data we&apos;ll read</Text>
          {DATA_TYPES.map((d) => (
            <View key={d.label} style={styles.dataRow}>
              <IconBadge name={d.icon} color={Colors.primary} size="sm" />
              <Text style={styles.dataLabel}>{d.label}</Text>
              <Text style={styles.dataReadOnly}>Read only</Text>
            </View>
          ))}
        </View>

        <View style={styles.noteCard}>
          <View style={styles.noteRow}>
            <Ionicons name="lock-closed-outline" size={18} color={Colors.textSecondary} />
            <Text style={styles.noteText}>
              Your data stays on your device and in your private Firebase account. We never sell or share your health data.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.connectBtn, loading && styles.btnDisabled]}
          onPress={handleConnect}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color={Colors.white} />
            : <Text style={styles.connectBtnText}>Connect {platformName}</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipBtn} onPress={leaveScreen}>
          <Text style={styles.skipBtnText}>
            {isReconnect ? 'Not now' : "Skip — I'll connect later"}
          </Text>
        </TouchableOpacity>
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, gap: Spacing.md },
  hero: { alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.md },
  heroTitle: { fontSize: Typography.size['2xl'], fontWeight: '700', color: Colors.text },
  heroSub: { fontSize: Typography.size.base, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  card: { backgroundColor: Colors.white, borderRadius: Radius.xl, padding: Spacing.base, ...Shadow.sm, gap: Spacing.sm },
  cardTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text, marginBottom: Spacing.xs },
  dataRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.borderLight,
  },
  dataLabel: { flex: 1, fontSize: Typography.size.sm, color: Colors.text },
  dataReadOnly: { fontSize: Typography.size.xs, color: Colors.success, fontWeight: '600' },
  noteCard: { backgroundColor: Colors.primaryBg, borderRadius: Radius.lg, padding: Spacing.base },
  noteRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  noteText: { flex: 1, fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  connectBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.xl,
    paddingVertical: Spacing.base, alignItems: 'center', ...Shadow.md,
  },
  btnDisabled: { opacity: 0.6 },
  connectBtnText: { color: Colors.white, fontSize: Typography.size.base, fontWeight: '700' },
  skipBtn: { alignItems: 'center', paddingVertical: Spacing.sm },
  skipBtnText: { color: Colors.textSecondary, fontSize: Typography.size.sm },
});
