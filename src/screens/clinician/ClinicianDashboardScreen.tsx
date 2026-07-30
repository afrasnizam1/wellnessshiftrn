import React, { useCallback, useEffect, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Share,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { ClinicianLayout, ClinicianTheme } from '../../theme/clinicianTheme';
import { useAppStore } from '../../store';
import { clinicianService } from '../../services/clinicianService';
import type { ClinicianStackParamList } from '../../types';
import AppScreen from '../../components/common/AppScreen';
import ClinicianHeroHeader from '../../components/clinician/ClinicianHeroHeader';
import ClinicianStatsRow from '../../components/clinician/ClinicianStatsRow';
import ClinicianPatientCard from '../../components/clinician/ClinicianPatientCard';
import { ClinicianQuickActions } from '../../components/clinician/ClinicianQuickAction';

type Nav = NativeStackNavigationProp<ClinicianStackParamList>;

function formatInviteCode(code: string): string {
  return code.trim().toUpperCase().split('').join(' ');
}

function Section({
  title,
  children,
  action,
}: {
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      {title ? (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {action}
        </View>
      ) : null}
      {children}
    </View>
  );
}

export default function ClinicianDashboardScreen() {
  const navigation = useNavigation<Nav>();
  const { user } = useAppStore();
  const [patients, setPatients] = useState<Awaited<ReturnType<typeof clinicianService.fetchLinkedPatients>>>([]);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [unread, setUnread] = useState(0);
  const [activePlans, setActivePlans] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    const list = await clinicianService.fetchLinkedPatients(user.uid);
    setPatients(list);
    const [unreadCount, planCount, code] = await Promise.all([
      clinicianService.getUnreadMessageCount(user.uid, list.map((p) => p.uid)),
      clinicianService.getActiveCarePlanCount(user.uid),
      clinicianService.ensureInviteCode(user.uid),
    ]);
    setUnread(unreadCount);
    setActivePlans(planCount);
    setInviteCode(code);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    load().finally(() => setLoading(false));
    const unsub = clinicianService.watchLinkedPatients(user.uid, (list) => {
      setPatients(list);
      clinicianService.getUnreadMessageCount(user.uid, list.map((p) => p.uid)).then(setUnread);
    });
    return unsub;
  }, [user, load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const shareInviteCode = () => {
    if (!inviteCode) return;
    Share.share({
      message: `Join my care team on Wellness Shift. Use invite code: ${inviteCode}`,
    });
  };

  const openNewCarePlan = () => {
    if (patients.length === 0) {
      Alert.alert('Add a patient first', 'Link a patient before creating a care plan.');
      return;
    }
    navigation.navigate(Screen.createCarePlan, { patient: patients[0] });
  };

  const attentionPatients = patients.filter((p) => p.needsAttention);
  const greetingName = (() => {
    const name = user?.displayName?.trim();
    if (!name) return 'there';
    if (/^dr\.?\s/i.test(name)) return name.replace(/^dr\.?\s/i, 'Dr ');
    return name.split(' ')[0];
  })();

  const QUICK_ACTIONS = [
    { icon: 'document-text-outline', title: 'Care Plan', subtitle: 'Create new', color: Colors.brand, bg: Colors.brandSubtle, onPress: openNewCarePlan },
    { icon: 'person-add-outline', title: 'Add Patient', subtitle: 'Link by email', color: ClinicianTheme.accent, bg: ClinicianTheme.accentSoft, onPress: () => navigation.navigate(Screen.addPatient) },
    { icon: 'chatbubbles-outline', title: 'Inbox', subtitle: unread > 0 ? `${unread} unread` : 'Messages', color: Colors.physical, bg: 'rgba(56,158,250,0.12)', onPress: () => navigation.navigate(Screen.clinicianInbox) },
    { icon: 'layers-outline', title: 'Bulk', subtitle: 'Batch tools', color: Colors.nutrition, bg: 'rgba(46,219,189,0.12)', onPress: () => navigation.navigate(Screen.bulkActions) },
  ];

  const MORE_TOOLS = [
    { icon: 'clipboard-outline', title: 'Templates', screen: Screen.messageTemplates },
    { icon: 'library-outline', title: 'Modules', screen: Screen.clinicianModuleLibrary },
    { icon: 'calendar-outline', title: 'Schedule', screen: Screen.clinicianSchedule },
    { icon: 'chatbubble-ellipses-outline', title: 'Starters', screen: Screen.conversationStarters },
    { icon: 'notifications-outline', title: 'Support', screen: Screen.betweenVisits },
    { icon: 'time-outline', title: 'Audit', screen: Screen.auditLog },
    { icon: 'fitness-outline', title: 'Practice', screen: Screen.practiceMode },
    { icon: 'person-circle-outline', title: 'Profile', screen: Screen.editClinicianProfile },
    { icon: 'shield-checkmark-outline', title: 'Legal', screen: Screen.clinicianLegal },
  ];

  if (loading) {
    return (
      <AppScreen mesh={false} backgroundColor={Colors.background} style={styles.loading}>
        <ActivityIndicator size="large" color={ClinicianTheme.accent} />
      </AppScreen>
    );
  }

  return (
    <View style={styles.root}>
      <ClinicianHeroHeader
        title={`Hello, ${greetingName}`}
        subtitle={`${patients.length} patient${patients.length === 1 ? '' : 's'} · ${activePlans} active plan${activePlans === 1 ? '' : 's'}`}
        actions={[
          { icon: 'refresh-outline', onPress: onRefresh },
          { icon: 'mail-unread-outline', onPress: () => navigation.navigate(Screen.clinicianInbox), badge: unread },
        ]}
      />

      <AppScreen mesh={false} backgroundColor={Colors.background} style={styles.body} edges={[]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={ClinicianTheme.accent} />
          }
        >
          <View style={styles.statsBlock}>
            <ClinicianStatsRow
              stats={[
              { label: 'Patients', value: patients.length, icon: 'people-outline', color: ClinicianTheme.accent, bg: ClinicianTheme.accentSoft },
              { label: 'Attention', value: attentionPatients.length, icon: 'alert-circle-outline', color: Colors.error, bg: Colors.errorLight, alert: attentionPatients.length > 0 },
              { label: 'Unread', value: unread, icon: 'chatbubble-outline', color: Colors.physical, bg: 'rgba(56,158,250,0.12)', alert: unread > 0, onPress: () => navigation.navigate(Screen.clinicianInbox) },
              ]}
            />
          </View>

          {inviteCode ? (
            <Section>
              <View style={styles.inviteCard}>
                <View style={styles.inviteHeader}>
                  <View style={styles.inviteHeaderLeft}>
                    <View style={styles.inviteIcon}>
                      <Ionicons name="qr-code-outline" size={18} color={ClinicianTheme.accent} />
                    </View>
                    <View style={styles.inviteHeaderText}>
                      <Text style={styles.inviteLabel}>Patient invite code</Text>
                      <Text style={styles.inviteHint}>Share this code so patients can link to you</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.inviteCodeBox}>
                  <Text
                    style={styles.inviteCode}
                    selectable
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.75}
                  >
                    {formatInviteCode(inviteCode)}
                  </Text>
                </View>

                <TouchableOpacity style={styles.shareButton} onPress={shareInviteCode} activeOpacity={0.85}>
                  <Ionicons name="share-outline" size={18} color={Colors.white} />
                  <Text style={styles.shareButtonText}>Share invite code</Text>
                </TouchableOpacity>
              </View>
            </Section>
          ) : null}

          <View style={styles.quickActionsBlock}>
            <ClinicianQuickActions actions={QUICK_ACTIONS} />
          </View>

          {attentionPatients.length > 0 ? (
            <Section
              title="Needs attention"
              action={
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{attentionPatients.length}</Text>
                </View>
              }
            >
              {attentionPatients.map((p) => (
                <ClinicianPatientCard
                  key={p.uid}
                  patient={p}
                  urgent
                  onPress={() => navigation.navigate(Screen.patientDetail, { patient: p })}
                />
              ))}
            </Section>
          ) : null}

          <Section title={patients.length ? 'Your patients' : 'Get started'}>
            {patients.length === 0 ? (
              <View style={styles.emptyCard}>
                <View style={styles.emptyIcon}>
                  <Ionicons name="people-outline" size={32} color={ClinicianTheme.accent} />
                </View>
                <Text style={styles.emptyTitle}>No patients linked yet</Text>
                <Text style={styles.emptyHint}>
                  Share your invite code above or add a patient by email to start building care plans.
                </Text>
                <TouchableOpacity
                  style={styles.emptyBtn}
                  onPress={() => navigation.navigate(Screen.addPatient)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.emptyBtnText}>Add first patient</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {patients.slice(0, 5).map((p) => (
                  <ClinicianPatientCard
                    key={p.uid}
                    patient={p}
                    compact
                    onPress={() => navigation.navigate(Screen.patientDetail, { patient: p })}
                  />
                ))}
                {patients.length > 5 ? (
                  <TouchableOpacity style={styles.seeAll} onPress={() => navigation.navigate(Screen.patients)}>
                    <Text style={styles.seeAllText}>View all {patients.length} patients</Text>
                    <Ionicons name="arrow-forward" size={16} color={ClinicianTheme.accent} />
                  </TouchableOpacity>
                ) : null}
              </>
            )}
          </Section>

          <Section title="Practice tools">
            <View style={styles.toolsGrid}>
              {MORE_TOOLS.map((t) => (
                <TouchableOpacity
                  key={t.title}
                  style={styles.toolTile}
                  onPress={() => navigation.navigate(t.screen)}
                  activeOpacity={0.85}
                >
                  <View style={styles.toolIcon}>
                    <Ionicons name={t.icon as any} size={20} color={ClinicianTheme.accent} />
                  </View>
                  <Text style={styles.toolLabel} numberOfLines={1}>
                    {t.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Section>
        </ScrollView>
      </AppScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  statsBlock: {
    marginBottom: Spacing.lg,
  },
  quickActionsBlock: {
    marginBottom: Spacing.lg,
  },
  content: {
    paddingTop: Spacing.sm,
    paddingBottom: ClinicianLayout.tabBarBottomInset + Spacing.xl,
  },
  section: {
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.size.md,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  inviteCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
    padding: Spacing.base,
    gap: Spacing.md,
  },
  inviteHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  inviteHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  inviteHeaderText: {
    flex: 1,
    gap: 2,
  },
  inviteIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: ClinicianTheme.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteLabel: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  inviteHint: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  inviteCodeBox: {
    width: '100%',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  inviteCode: {
    width: '100%',
    fontSize: Typography.size.lg,
    fontWeight: '800',
    color: ClinicianTheme.accentDark,
    letterSpacing: 3,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: ClinicianTheme.accent,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.md,
  },
  shareButtonText: {
    color: Colors.white,
    fontSize: Typography.size.sm,
    fontWeight: '700',
  },
  countBadge: {
    backgroundColor: Colors.errorLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.pill,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.error,
  },
  emptyCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: ClinicianTheme.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
  },
  emptyHint: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyBtn: {
    marginTop: Spacing.xs,
    backgroundColor: ClinicianTheme.accent,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
  },
  emptyBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.sm,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: Spacing.sm,
  },
  seeAllText: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: ClinicianTheme.accent,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  toolTile: {
    width: '31%',
    minWidth: 100,
    flexGrow: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
    alignItems: 'center',
    gap: Spacing.xs,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  toolIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: ClinicianTheme.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
});
