import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Alert,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { getHealthPlatformName, healthKitService } from '../../services/healthkit';
import { analyticsHelper } from '../../services/analyticsHelper';
import { Screen } from '../../navigation/screenNames';
import { onboardingStorage } from '../../services/onboardingStorage';
import { pendingOnboardingStorage } from '../../services/pendingOnboardingStorage';
import { refreshPreAuthRouteFromPending } from '../../services/onboardingNavigation';
import { useAppStore } from '../../store';
import AppScreen from '../../components/common/AppScreen';
import { BrandButton, BackButton } from '../../components/ui';

const LOGO = require('../../assets/images/wellness-shift-logo-badge.png');

/** Metrics the app actually reads from HealthKit / Health Connect. */
const SYNC_TAGS = ['Steps', 'Heart Rate', 'Sleep', 'Workouts'] as const;

const isAndroid = Platform.OS === 'android';
const platformName = getHealthPlatformName();

type TagPosition = {
  label: (typeof SYNC_TAGS)[number];
  top: number;
  left?: number;
  right?: number;
};

function HealthSyncIllustration({ size }: { size: number }) {
  const iconSize = Math.round(size * 0.26);
  const logoSize = Math.round(iconSize * 0.72);
  const checkSize = Math.round(size * 0.11);

  const tags: TagPosition[] = [
    { label: 'Steps', top: size * 0.14, left: size * 0.02 },
    { label: 'Heart Rate', top: size * 0.42, left: -size * 0.04 },
    { label: 'Workouts', top: size * 0.28, right: -size * 0.02 },
    { label: 'Sleep', top: size * 0.72, right: size * 0.04 },
  ];

  // Curved sync path from Wellness Shift (bottom-left) to Health (top-right)
  const pathD = `
    M ${size * 0.32} ${size * 0.62}
    C ${size * 0.42} ${size * 0.42}, ${size * 0.55} ${size * 0.58}, ${size * 0.68} ${size * 0.38}
  `;

  return (
    <View style={[styles.illustrationWrap, { width: size, height: size }]}>
      <View style={[styles.heroCircle, { width: size, height: size, borderRadius: size / 2 }]} />

      {tags.map((tag) => (
        <View
          key={tag.label}
          style={[
            styles.pillTag,
            {
              top: tag.top,
              ...(tag.left !== undefined ? { left: tag.left } : { right: tag.right }),
            },
          ]}
        >
          <Text style={styles.pillTagText}>{tag.label}</Text>
        </View>
      ))}

      <Svg
        width={size}
        height={size}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      >
        <Path
          d={pathD}
          stroke={Colors.text}
          strokeWidth={2.25}
          fill="none"
          strokeLinecap="round"
        />
        {/* Bidirectional sync arrows along the curve */}
        <Path
          d={`M ${size * 0.38} ${size * 0.54} L ${size * 0.42} ${size * 0.485} L ${size * 0.445} ${size * 0.545}`}
          stroke={Colors.text}
          strokeWidth={2.25}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d={`M ${size * 0.555} ${size * 0.455} L ${size * 0.58} ${size * 0.395} L ${size * 0.62} ${size * 0.45}`}
          stroke={Colors.text}
          strokeWidth={2.25}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>

      {/* Wellness Shift app icon — bottom left */}
      <View
        style={[
          styles.appIcon,
          {
            width: iconSize,
            height: iconSize,
            borderRadius: iconSize * 0.22,
            bottom: size * 0.18,
            left: size * 0.16,
          },
          Shadow.md,
        ]}
      >
        <Image
          source={LOGO}
          style={{ width: logoSize, height: logoSize }}
          resizeMode="contain"
          accessibilityLabel="Wellness Shift"
        />
      </View>

      {/* Platform health icon — top right */}
      <View
        style={[
          styles.platformIconShell,
          {
            width: iconSize,
            height: iconSize,
            borderRadius: iconSize * 0.22,
            top: size * 0.16,
            right: size * 0.16,
          },
          Shadow.md,
        ]}
      >
        {isAndroid ? (
          <LinearGradient
            colors={['#4285F4', '#34A853']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.platformIconFill, { borderRadius: iconSize * 0.22 }]}
          >
            <Ionicons name="fitness" size={iconSize * 0.42} color={Colors.white} />
          </LinearGradient>
        ) : (
          <LinearGradient
            colors={['#FF2D55', '#FF6482', '#FF8A9B']}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={[styles.platformIconFill, { borderRadius: iconSize * 0.22 }]}
          >
            <Svg width={iconSize * 0.5} height={iconSize * 0.5} viewBox="0 0 24 24">
              <Defs>
                <SvgLinearGradient id="heartGrad" x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0" stopColor="#FFFFFF" stopOpacity="1" />
                  <Stop offset="1" stopColor="#FFE8EE" stopOpacity="1" />
                </SvgLinearGradient>
              </Defs>
              <Path
                d="M12 21s-6.5-4.35-9.2-8.1C.8 9.9 1.6 6.4 4.5 5.1 6.4 4.2 8.6 4.7 10 6.2c.4.4.7.8 1 1.2.3-.4.6-.8 1-1.2 1.4-1.5 3.6-2 5.5-1.1 2.9 1.3 3.7 4.8 1.7 7.8C18.5 16.65 12 21 12 21z"
                fill="url(#heartGrad)"
              />
            </Svg>
          </LinearGradient>
        )}
      </View>

      {/* Sync checkmark at curve midpoint */}
      <View
        style={[
          styles.checkBadge,
          {
            width: checkSize,
            height: checkSize,
            borderRadius: checkSize / 2,
            top: size * 0.46 - checkSize / 2,
            left: size * 0.5 - checkSize / 2,
          },
        ]}
      >
        <Ionicons name="checkmark" size={checkSize * 0.55} color={Colors.white} />
      </View>
    </View>
  );
}

export default function HealthKitPermissionScreen() {
  const navigation = useNavigation<any>();
  const { user, hasSeenIntro } = useAppStore();
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const isReconnect = user?.onboardingComplete === true;
  const canGoBack = navigation.canGoBack?.() ?? false;

  const illustrationSize = Math.min(Math.round(width * 0.78), 320);

  const leaveScreen = async () => {
    if (user) {
      await onboardingStorage.markHealthKitPromptSeen(user.uid);
    } else {
      await pendingOnboardingStorage.save({ healthPromptSeen: true });
      await refreshPreAuthRouteFromPending(hasSeenIntro);
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
    <AppScreen style={styles.safe} backgroundColor={Colors.white} mesh={false}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {(isReconnect || canGoBack) && (
          <View style={styles.topBar}>
            <BackButton
              onPress={() => (isReconnect ? navigation.goBack() : navigation.goBack())}
              color={Colors.text}
              style={styles.backBtn}
            />
          </View>
        )}

        <View style={styles.heroSection}>
          <HealthSyncIllustration size={illustrationSize} />
        </View>

        <View style={styles.copyBlock}>
          <Text style={styles.title}>Connect to {platformName}</Text>
          <Text style={styles.body}>
            Sync your daily activity between Wellness Shift and {platformName} for a more thorough
            wellness score and daily plan.
            {isAndroid
              ? ' Data from your phone, watch, and fitness apps syncs through Health Connect.'
              : ' We never write to Apple Health.'}
          </Text>
          {isAndroid && (
            <Text style={styles.androidNote}>
              Requires Health Connect (built into Android 14+, or install from Play Store on Android 13).
            </Text>
          )}
          <View style={styles.privacyRow}>
            <Ionicons name="lock-closed-outline" size={14} color={Colors.textTertiary} />
            <Text style={styles.privacyText}>
              Read-only access. Your data stays private — we never sell or share it.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <BrandButton
            label="Continue"
            onPress={handleConnect}
            loading={loading}
            disabled={loading}
          />
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={leaveScreen}
            accessibilityRole="button"
            accessibilityLabel={isReconnect ? 'Not now' : 'Skip'}
          >
            <Text style={styles.skipBtnText}>{isReconnect ? 'Not now' : 'Skip'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  content: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing['2xl'],
  },
  topBar: {
    paddingTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    minHeight: 280,
  },
  illustrationWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCircle: {
    backgroundColor: '#F2F2F7',
    position: 'absolute',
  },
  pillTag: {
    position: 'absolute',
    zIndex: 3,
    backgroundColor: Colors.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.md,
    ...Shadow.sm,
  },
  pillTagText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
    letterSpacing: -0.2,
  },
  appIcon: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  platformIconShell: {
    position: 'absolute',
    zIndex: 2,
    overflow: 'hidden',
  },
  platformIconFill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBadge: {
    position: 'absolute',
    zIndex: 4,
    backgroundColor: Colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.sm,
  },
  copyBlock: {
    gap: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.6,
    lineHeight: 34,
  },
  body: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  androidNote: {
    fontSize: Typography.size.sm,
    color: Colors.textTertiary,
    lineHeight: 18,
    marginTop: Spacing.xxs,
  },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  privacyText: {
    flex: 1,
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
    lineHeight: 16,
  },
  footer: {
    marginTop: 'auto',
    gap: Spacing.sm,
    paddingTop: Spacing.lg,
  },
  skipBtn: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  skipBtnText: {
    color: Colors.textSecondary,
    fontSize: Typography.size.base,
    fontWeight: '500',
  },
});
