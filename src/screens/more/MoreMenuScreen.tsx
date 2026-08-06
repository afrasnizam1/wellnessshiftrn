// src/screens/more/MoreMenuScreen.tsx
import React, { useEffect, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, Alert, Platform, Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Shadow, type IoniconName } from '../../theme';
import { AppCard, ListRow, ScreenLayout, AnimatedPressable } from '../../components/ui';
import ClinicianInfoCard from '../../components/care/ClinicianInfoCard';
import { useAppStore } from '../../store';
import { signOutCurrentUser } from '../../services/authSession';
import { clinicianService } from '../../services/clinicianService';
import { messageService } from '../../services/firebase';
import { onboardingStorage } from '../../services/onboardingStorage';
import { appConfig } from '../../config/appConfig';

type IconName = IoniconName;

interface MenuRow {
  icon: IconName;
  iconColor?: string;
  iconGradient?: [string, string];
  label: string;
  sublabel?: string;
  screen?: string;
  badge?: string;
  badgeColor?: string;
  showDot?: boolean;
  destructive?: boolean;
  action?: () => void;
}

interface MenuSection {
  title: string;
  rows: MenuRow[];
}

export default function MoreMenuScreen() {
  const navigation = useNavigation<any>();
  const { user, carePlan, wellnessScore, subscriptionTier, setUser, setCarePlan, setClinicianRecommendations, hasUnseenCarePlan } = useAppStore();
  const [pendingCount, setPendingCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [dayOneDone, setDayOneDone] = useState(true);
  const [showFemaleHealth, setShowFemaleHealth] = useState(true);
  const [clinicianProfile, setClinicianProfile] = useState<{
    clinicianName: string;
    specialty?: string;
    email?: string;
    clinicName?: string;
  } | null>(null);
  const [loadingClinician, setLoadingClinician] = useState(false);

  const clinicianId = user?.clinicianId ?? carePlan?.clinicianId;
  const isClinicianConnected = !!clinicianId;
  const clinicianDisplayName =
    carePlan?.clinicianName || clinicianProfile?.clinicianName || 'Your clinician';
  const clinicianSpecialty = clinicianProfile?.specialty || carePlan?.specialty;
  const clinicianClinic = clinicianProfile?.clinicName;
  const clinicianEmail = clinicianProfile?.email;

  useEffect(() => {
    if (!user || !clinicianId) {
      setClinicianProfile(null);
      return;
    }
    setLoadingClinician(true);
    clinicianService
      .getPatientClinicianInfo(user.uid)
      .then((info) => {
        if (!info) {
          setClinicianProfile(null);
          return;
        }
        setClinicianProfile({
          clinicianName: info.clinicianName,
          specialty: info.specialty,
          email: info.email,
          clinicName: info.clinicName,
        });
      })
      .catch(() => {})
      .finally(() => setLoadingClinician(false));
  }, [user?.uid, clinicianId]);

  useEffect(() => {
    if (!user || user.clinicianId) {
      setPendingCount(0);
      return;
    }
    return clinicianService.watchPendingRequestsForPatient(user.uid, (requests) => {
      setPendingCount(requests.length);
    });
  }, [user?.uid, user?.clinicianId]);

  useEffect(() => {
    if (!user) return;
    const clinicianId = user.clinicianId ?? carePlan?.clinicianId;
    if (!clinicianId) {
      setUnreadMessages(0);
      return;
    }
    return messageService.watchPatientUnread(user.uid, clinicianId, setUnreadMessages);
  }, [user?.uid, user?.clinicianId, carePlan?.clinicianId]);

  useEffect(() => {
    if (!user) return;
    onboardingStorage.hasCompletedDayOneChecklist(user.uid).then(setDayOneDone);
    onboardingStorage.getUserGender(user.uid).then((stored) => {
      const g = user.gender ?? stored;
      setShowFemaleHealth(!g || g === 'female');
    });
  }, [user?.uid]);

  const openWebsite = () => {
    navigation.navigate(Screen.website, {
      url: appConfig.websiteUrl,
      title: 'WellnessShift',
    });
  };

  const openUrl = (url: string) => Linking.openURL(url).catch(() => {
    Alert.alert('Could not open link');
  });

  const handleDisconnect = () => {
    if (!user || !clinicianId) return;
    Alert.alert(
      'Disconnect from clinician',
      `Are you sure you want to disconnect from ${clinicianDisplayName}? You can reconnect anytime using an invite code.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: async () => {
            try {
              await clinicianService.disconnectPatient(user.uid, clinicianId);
              setUser({ ...user, clinicianId: undefined });
              setCarePlan(null);
              setClinicianRecommendations(null);
              Alert.alert('Disconnected', 'You are no longer linked to your clinician.');
            } catch {
              Alert.alert('Error', 'Could not disconnect. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          signOutCurrentUser(user).catch(() => {
            Alert.alert('Sign Out', 'Could not complete sign out. Please try again.');
          });
        },
      },
    ]);
  };

  const nav = (screen: string) => navigation.navigate(screen);

  const myCareRows: MenuRow[] = isClinicianConnected
    ? [
        {
          icon: 'clipboard-outline',
          iconGradient: ['#8C59BF', '#946BFA'],
          label: 'My Care Plan',
          sublabel: hasUnseenCarePlan
            ? 'New care plan from your clinician'
            : 'View your personalised wellness plan',
          screen: Screen.carePlan,
          showDot: hasUnseenCarePlan,
        },
        {
          icon: 'chatbubbles-outline',
          iconGradient: ['#F24D80', '#FF6699'],
          label: Screen.messages,
          sublabel: unreadMessages > 0
            ? `${unreadMessages} unread message${unreadMessages > 1 ? 's' : ''}`
            : 'Chat with your clinician',
          screen: Screen.messages,
          badge: unreadMessages > 0 ? String(unreadMessages) : undefined,
          badgeColor: Colors.brand,
        },
        {
          icon: 'link-outline',
          iconGradient: ['#FF3B30', '#E6342A'],
          label: 'Disconnect from clinician',
          sublabel: 'Stop sharing data with your clinician',
          destructive: true,
          action: handleDisconnect,
        },
      ]
    : [
        {
          icon: 'link-outline',
          iconGradient: ['#007AFF', '#389EFA'],
          label: 'Work with a clinician',
          sublabel: pendingCount > 0
            ? `${pendingCount} connection request${pendingCount > 1 ? 's' : ''} waiting`
            : 'Share wellness data and receive tailored support',
          screen: Screen.connectClinician,
          badge: pendingCount > 0 ? String(pendingCount) : undefined,
          badgeColor: Colors.warning,
        },
        {
          icon: 'medkit-outline',
          iconGradient: ['#8C59BF', '#946BFA'],
          label: 'My Care Hub',
          sublabel: 'Care plans, messages & clinician connect',
          screen: Screen.myCare,
          showDot: hasUnseenCarePlan,
        },
        {
          icon: 'clipboard-outline',
          iconGradient: ['#8C59BF', '#946BFA'],
          label: 'My Care Plan',
          sublabel: hasUnseenCarePlan
            ? 'New care plan from your clinician'
            : 'View your personalised wellness plan',
          screen: Screen.carePlan,
          showDot: hasUnseenCarePlan,
        },
        {
          icon: 'chatbubbles-outline',
          iconGradient: ['#F24D80', '#FF6699'],
          label: Screen.messages,
          sublabel: unreadMessages > 0
            ? `${unreadMessages} unread message${unreadMessages > 1 ? 's' : ''}`
            : 'Chat with your clinician',
          screen: Screen.messages,
          badge: unreadMessages > 0 ? String(unreadMessages) : undefined,
          badgeColor: Colors.brand,
        },
        {
          icon: 'qr-code-outline',
          iconGradient: ['#389EFA', '#007AFF'],
          label: 'Import care plan',
          sublabel: 'Enter a plan code from your clinician',
          screen: Screen.scanCustomPlan,
        },
      ];

  const renderMenuRows = (rows: MenuRow[]) =>
    rows.map((row, index) => (
      <ListRow
        key={row.label + index}
        title={row.label}
        subtitle={row.sublabel}
        icon={
          <Ionicons
            name={row.icon}
            size={22}
            color={row.iconGradient ? Colors.white : (row.destructive ? Colors.error : Colors.primary)}
          />
        }
        iconBg={row.destructive ? Colors.errorLight : (row.iconColor ?? Colors.primary) + '14'}
        iconGradient={row.iconGradient}
        badge={row.badge}
        badgeColor={row.badgeColor ?? Colors.success}
        showDot={row.showDot}
        onPress={row.action || row.screen ? () => {
          if (row.action) { row.action(); return; }
          if (row.screen) nav(row.screen);
        } : undefined}
        showDivider={index < rows.length - 1}
      />
    ));

  const SECTIONS: MenuSection[] = [
    {
      title: 'Programs & Tracking',
      rows: [
        { icon: 'play-circle-outline', iconGradient: ['#2EDBBD', '#389EFA'], label: 'My Programs', sublabel: 'Track your active wellness programs', screen: Screen.programs },
        { icon: 'flag-outline', iconGradient: ['#007AFF', '#389EFA'], label: 'Goals', sublabel: 'Set and track wellness goals', screen: Screen.goals },
        { icon: 'checkbox-outline', iconGradient: ['#34C759', '#2EDBBD'], label: 'Habit Tracker', sublabel: 'Build streaks with daily habits', screen: Screen.habitTracking },
        { icon: 'people-outline', iconGradient: ['#FF8561', '#FF9500'], label: 'Social Hub', sublabel: 'Friends, buddy board and challenges', screen: Screen.socialHub },
        { icon: 'chatbubbles-outline', iconGradient: ['#946BFA', '#7A57F5'], label: 'Social Feed', sublabel: 'Community updates and challenges', screen: Screen.socialFeed },
        { icon: 'podium-outline', iconGradient: ['#34C759', '#2EDBBD'], label: 'Community Progress', sublabel: 'Collective wellness achievements', screen: Screen.leaderboard },
        { icon: 'body-outline', iconGradient: ['#946BFA', '#7A57F5'], label: 'Anatomy Explorer', sublabel: 'Interactive 3D anatomy learning', screen: Screen.anatomyExplorer },
        { icon: 'medical-outline', iconGradient: ['#FF4444', '#FF6B6B'], label: 'Health Conditions', sublabel: 'Comprehensive condition information', screen: Screen.conditionHub },
        { icon: 'fitness-outline', iconGradient: ['#34C759', '#2EDBBD'], label: 'Workouts', sublabel: 'Exercise programs and movement tracking', screen: Screen.workoutHub },
        { icon: 'trophy-outline', iconGradient: ['#FF8561', '#FF9500'], label: Screen.achievements, sublabel: 'Your milestones and rewards', screen: Screen.achievements },
      ],
    },
    {
      title: 'Content & Resources',
      rows: [
        { icon: 'library-outline', iconGradient: ['#2C3E50', '#546E7A'], label: 'Content Library', sublabel: 'Articles, guides & programs', screen: Screen.contentLibrary },
        { icon: 'newspaper-outline', iconGradient: ['#8C59BF', '#946BFA'], label: 'Wellness Blog', sublabel: 'Articles and expert tips', screen: Screen.blog },
        { icon: 'chatbox-ellipses-outline', iconGradient: ['#2EDBBD', '#34C759'], label: 'Community Forum', sublabel: 'Discuss wellness with others', screen: Screen.forum },
        { icon: 'people-outline', iconGradient: ['#946BFA', '#7A57F5'], label: 'Coaching & Consultations', sublabel: 'Book 1-on-1 sessions with certified coaches', screen: Screen.coaching },
        { icon: 'newspaper-outline', iconGradient: ['#389EFA', '#007AFF'], label: Screen.newsletter, sublabel: 'Weekly tips, recipes & wellness content', screen: Screen.newsletter },
        { icon: 'globe-outline', iconGradient: ['#2EDBBD', '#34C759'], label: 'WellnessShift Website', sublabel: 'wellnessshift.co.uk', action: openWebsite },
      ],
    },
    ...(showFemaleHealth ? [{
      title: "Women's Health",
      rows: [
        {
          icon: 'calendar-outline' as IconName,
          iconGradient: ['#F24D80', '#EC407A'] as [string, string],
          label: 'Cycle Tracking',
          sublabel: 'Track your menstrual cycle',
          screen: Screen.menstrualCycle,
        },
      ],
    }] : []),
    {
      title: 'Settings',
      rows: [
        { icon: 'notifications-outline', iconGradient: ['#FF9500', '#FF8561'], label: Screen.notifications, screen: Screen.notifications },
        { icon: 'person-outline', iconGradient: ['#389EFA', '#007AFF'], label: 'Edit Profile', screen: Screen.profile },
        {
          icon: 'diamond-outline',
          iconGradient: subscriptionTier !== 'free' ? ['#007AFF', '#0055CC'] : ['#8C59BF', '#946BFA'],
          label: 'Subscription & Billing',
          sublabel: subscriptionTier === 'free'
            ? 'Free plan — upgrade for more'
            : `${subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)} plan`,
          screen: Screen.subscription,
          badge: subscriptionTier !== 'free' ? subscriptionTier.toUpperCase() : undefined,
          badgeColor: Colors.primary,
        },
      ],
    },
    ...(wellnessScore ? [{
      title: 'Getting started',
      rows: [
        {
          icon: 'map-outline' as IconName,
          iconGradient: ['#389EFA', '#007AFF'] as [string, string],
          label: 'Quick Start guide',
          sublabel: 'Reopen the in-app tour',
          action: async () => {
            if (user) await onboardingStorage.setPendingInAppGuide(user.uid, true);
            navigation.navigate(Screen.tabHome, { screen: Screen.homeDashboard });
          },
        },
        ...(!dayOneDone ? [{
          icon: 'checkbox-outline' as IconName,
          iconGradient: ['#946BFA', '#7A57F5'] as [string, string],
          label: 'Quick start checklist',
          sublabel: 'Your first-day guide',
          action: () => navigation.navigate(Screen.tabHome, { screen: Screen.homeDashboard }),
        }] : []),
      ],
    }] : []),
    {
      title: 'Export',
      rows: [
        {
          icon: 'document-text-outline',
          iconGradient: ['#389EFA', '#007AFF'],
          label: 'Wellness summary (PDF)',
          sublabel: 'Download your progress report',
          action: () => navigation.navigate(Screen.tabAnalytics, { screen: Screen.wellnessExport }),
        },
      ],
    },
    {
      title: 'Help & Legal',
      rows: [
        { icon: 'help-circle-outline', iconGradient: ['#389EFA', '#007AFF'], label: 'Help & FAQ', screen: Screen.help },
        { icon: 'mail-outline', iconGradient: ['#2EDBBD', '#34C759'], label: 'Contact Support', sublabel: 'support@wellnessshift.co.uk', action: () => openUrl('mailto:support@wellnessshift.co.uk') },
        { icon: 'lock-closed-outline', iconGradient: ['#8C59BF', '#994DB3'], label: 'Privacy Policy', screen: Screen.privacyPolicy },
        { icon: 'document-text-outline', iconGradient: ['#FF8561', '#FF9500'], label: 'Terms of Service', screen: Screen.termsOfService },
        { icon: 'hardware-chip-outline', iconGradient: ['#F24D80', '#FF6699'], label: 'AI Disclosure', screen: Screen.aiDisclosure },
        { icon: 'shield-checkmark-outline', iconGradient: ['#007AFF', '#389EFA'], label: 'Your Data Rights (GDPR)', screen: Screen.dataRights },
        { icon: 'heart-outline', iconGradient: ['#FF6961', '#F24D80'], label: Platform.OS === 'android' ? 'Health Connect Disclosure' : 'HealthKit Disclosure', screen: Screen.healthDataDisclosure },
      ],
    },
    {
      title: 'Account',
      rows: [
        {
          icon: 'trash-outline',
          iconGradient: ['#FF3B30', '#E6342A'],
          label: 'Delete Account',
          sublabel: 'Permanently remove your data',
          destructive: true,
          action: () => navigation.navigate(Screen.dataRights),
        },
        { icon: 'log-out-outline', iconGradient: ['#FF9500', '#FF8561'], label: 'Sign Out', destructive: true, action: handleSignOut },
      ],
    },
  ];

  return (
    <ScreenLayout title="More" scroll padded={false} contentContainerStyle={styles.content}>
      <View style={styles.profileWrap}>
        <AppCard style={styles.profileCard}>
          <AnimatedPressable
            onPress={() => nav(Screen.profile)}
            style={styles.profileRow}
          >
            <View style={styles.avatarWrap}>
              <Text style={styles.avatarLetter}>
                {user?.displayName?.[0]?.toUpperCase() ?? 'P'}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName} numberOfLines={1}>
                {user?.displayName ?? 'Patient'}
              </Text>
              <Text style={styles.profileEmail} numberOfLines={1}>
                {user?.email ?? ''}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
          </AnimatedPressable>
        </AppCard>
      </View>

      <View style={styles.sectionWrap}>
        <View style={styles.sectionTitleRow}>
          <Text style={[styles.sectionTitle, { paddingBottom: 0, paddingHorizontal: 0 }]}>My Care</Text>
          {hasUnseenCarePlan ? <View style={[styles.sectionDot, { marginBottom: 0 }]} /> : null}
        </View>
        <AppCard padded={false} style={styles.sectionCard}>
          {isClinicianConnected && (
            <>
              <ClinicianInfoCard
                clinicianName={clinicianDisplayName}
                email={clinicianEmail}
                specialty={clinicianSpecialty}
                clinicName={clinicianClinic}
                loading={loadingClinician}
                onPress={() => nav(Screen.myCare)}
              />
              <View style={styles.sectionDivider} />
            </>
          )}
          {renderMenuRows(myCareRows)}
        </AppCard>
      </View>

      {SECTIONS.map((section) => (
        <View key={section.title} style={styles.sectionWrap}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <AppCard padded={false} style={styles.sectionCard}>
            {renderMenuRows(section.rows)}
          </AppCard>
        </View>
      ))}

      <Text style={styles.version}>Wellness Shift v1.0.0 • UK</Text>
      <View style={{ height: 100 }} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: Spacing.base },
  profileWrap: { paddingHorizontal: Spacing.base, marginBottom: Spacing.md },
  profileCard: {
    padding: Spacing.base,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
    ...Shadow.sm,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatarWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(140, 89, 191, 0.12)',
  },
  avatarLetter: {
    color: Colors.purple,
    fontSize: Typography.size.xl,
    fontWeight: '800',
  },
  profileInfo: { flex: 1, minWidth: 0 },
  profileName: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.2,
  },
  profileEmail: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  sectionWrap: { paddingHorizontal: Spacing.base, marginBottom: Spacing.sm },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingBottom: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  sectionTitle: {
    fontSize: Typography.size.xs,
    fontWeight: '800',
    color: Colors.purple,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingBottom: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
    marginBottom: Spacing.sm,
  },
  sectionCard: {
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  sectionDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.borderLight,
    marginHorizontal: Spacing.base,
  },
  version: {
    textAlign: 'center',
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
    paddingTop: Spacing.xl,
  },
});
