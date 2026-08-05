import React, { useEffect, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import {
  AppCard, ListRow, ScreenHeader, BrandButton, SectionHeader, IconBadge,
} from '../../components/ui';
import { useAppStore } from '../../store';
import { clinicianService } from '../../services/clinicianService';
import { carePlanService } from '../../services/firebase';
import type { ConnectionRequest } from '../../types';
import AppScreen from '../../components/common/AppScreen';
import { CLINICIAN_CONNECT_ELIGIBILITY, CLINICIAN_CONNECT_SHORT } from '../../types/onboardingPrefs';

export default function MyCareHubScreen() {
  const navigation = useNavigation<any>();
  const { user, carePlan, wellnessScore, setUser, setCarePlan, setClinicianRecommendations } = useAppStore();
  const [pendingCount, setPendingCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [pendingRequests, setPendingRequests] = useState<ConnectionRequest[]>([]);
  const [taskProgress, setTaskProgress] = useState({ done: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsubPending = user.clinicianId
      ? undefined
      : clinicianService.watchPendingRequestsForPatient(user.uid, (reqs) => {
          setPendingRequests(reqs);
          setPendingCount(reqs.length);
        });

    const clinicianId = user.clinicianId ?? carePlan?.clinicianId;
    let unsubMsgs: (() => void) | undefined;
    if (clinicianId) {
      const { messageService } = require('../../services/firebase');
      unsubMsgs = messageService.watchPatientUnread(user.uid, clinicianId, setUnreadMessages);
    } else {
      setUnreadMessages(0);
    }

    carePlanService
      .getCarePlans(user.uid)
      .then((plans) => {
        const plan = plans[0] ?? carePlan;
        if (plan?.tasks) {
          const done = plan.tasks.filter((t) => t.isComplete).length;
          setTaskProgress({ done, total: plan.tasks.length });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    return () => {
      unsubPending?.();
      unsubMsgs?.();
    };
  }, [user?.uid, user?.clinicianId, carePlan?.clinicianId, carePlan]);

  const handleDisconnect = () => {
    if (!user || !carePlan) return;
    Alert.alert('Disconnect', 'Stop sharing data with your clinician?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Disconnect',
        style: 'destructive',
        onPress: async () => {
          try {
            await clinicianService.disconnectPatient(user.uid, carePlan.clinicianId);
            setUser({ ...user, clinicianId: undefined });
            setCarePlan(null);
            setClinicianRecommendations(null);
            Alert.alert('Disconnected', 'You are no longer linked to your clinician.');
          } catch {
            Alert.alert('Error', 'Could not disconnect. Please try again.');
          }
        },
      },
    ]);
  };

  const connected = !!(carePlan || user?.clinicianId);

  const renderStatusCard = () => {
    if (loading) {
      return (
        <AppCard style={styles.loadingCard}>
          <ActivityIndicator color={Colors.primary} />
        </AppCard>
      );
    }

    if (connected && carePlan) {
      return (
        <AppCard style={styles.statusCard}>
          <View style={styles.clinicianRow}>
            <View style={styles.clinicianAvatar}>
              <Text style={styles.clinicianInitial}>
                {carePlan.clinicianName?.[0]?.toUpperCase() ?? 'C'}
              </Text>
            </View>
            <View style={styles.clinicianInfo}>
              <Text style={styles.clinicianName} numberOfLines={1}>
                {carePlan.clinicianName}
              </Text>
              <Text style={styles.clinicianSpec} numberOfLines={1}>
                {carePlan.specialty}
              </Text>
              <View style={styles.connectedPill}>
                <View style={styles.connectedDot} />
                <Text style={styles.connectedText}>Connected</Text>
              </View>
            </View>
            <IconBadge name="checkmark-circle" color={Colors.success} size="md" variant="plain" />
          </View>

          {taskProgress.total > 0 && (
            <View style={styles.progressBlock}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Care plan progress</Text>
                <Text style={styles.progressMeta}>
                  {taskProgress.done}/{taskProgress.total}
                </Text>
              </View>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(taskProgress.done / taskProgress.total) * 100}%` },
                  ]}
                />
              </View>
            </View>
          )}
        </AppCard>
      );
    }

    return (
      <AppCard style={styles.statusCard}>
        <View style={styles.emptyHeader}>
          <IconBadge name="medkit-outline" color="#946BFA" size="lg" />
          <View style={styles.emptyCopy}>
            <Text style={styles.emptyTitle}>
              {pendingRequests.length > 0 ? 'Connection requests' : 'No clinician connected'}
            </Text>
            <Text style={styles.emptySub}>
              {pendingRequests.length > 0
                ? `${pendingCount} clinician${pendingCount === 1 ? '' : 's'} would like to connect with you.`
                : CLINICIAN_CONNECT_ELIGIBILITY}
            </Text>
          </View>
        </View>

        {pendingRequests.length > 0 && (
          <View style={styles.requestsBlock}>
            {pendingRequests.map((req) => (
              <View key={req.id} style={styles.requestRow}>
                <View style={styles.requestAvatar}>
                  <Text style={styles.requestInitial}>
                    {req.clinicianName?.[0]?.toUpperCase() ?? 'C'}
                  </Text>
                </View>
                <View style={styles.requestCopy}>
                  <Text style={styles.requestName} numberOfLines={1}>{req.clinicianName}</Text>
                  <Text style={styles.requestSub}>Wants to connect as your clinician</Text>
                </View>
                <BrandButton
                  label="Review"
                  compact
                  onPress={() => navigation.navigate(Screen.carePlan)}
                  style={styles.reviewBtn}
                />
              </View>
            ))}
          </View>
        )}

        <BrandButton
          label={pendingRequests.length > 0 ? 'Enter invite code' : 'Connect with invite code'}
          onPress={() => navigation.navigate(Screen.connectClinician)}
          style={styles.connectBtn}
        />
        <Text style={styles.eligibilityHint}>{CLINICIAN_CONNECT_SHORT}</Text>
      </AppCard>
    );
  };

  return (
    <AppScreen style={styles.safe}>
      <ScreenHeader
        title="My Care"
        subtitle={
          connected
            ? 'Care plans, messaging & guidance'
            : 'GP-referred clinician link only'
        }
        onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
        large={false}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {renderStatusCard()}

        <SectionHeader title="Quick actions" />

        <AppCard padded={false}>
          <ListRow
            title="My care plan"
            subtitle={carePlan ? carePlan.title : 'View tasks and goals'}
            icon={<Ionicons name="clipboard-outline" size={22} color={Colors.primary} />}
            iconBg={Colors.primaryLight}
            onPress={() => navigation.navigate(Screen.carePlan)}
          />
          <ListRow
            title="Messages"
            subtitle={unreadMessages > 0 ? `${unreadMessages} unread` : 'Chat with your clinician'}
            icon={<Ionicons name="chatbubbles-outline" size={22} color={Colors.brand} />}
            iconBg="rgba(242, 77, 128, 0.12)"
            badge={unreadMessages > 0 ? String(unreadMessages) : undefined}
            badgeColor={Colors.brand}
            onPress={() => navigation.navigate(Screen.messages)}
          />
          <ListRow
            title="Health records"
            subtitle="Labs, GP letters — share with your clinician"
            icon={<Ionicons name="folder-open-outline" size={22} color={Colors.primary} />}
            iconBg={Colors.primaryLight}
            onPress={() => navigation.navigate(Screen.healthRecords)}
          />
          <ListRow
            title="Import care plan"
            subtitle="Enter a plan code from your clinician"
            icon={<Ionicons name="qr-code-outline" size={22} color="#946BFA" />}
            iconBg="rgba(148, 107, 250, 0.15)"
            onPress={() => navigation.navigate(Screen.scanCustomPlan)}
          />
          <ListRow
            title="My programs"
            subtitle="Active wellness programs"
            icon={<Ionicons name="play-circle-outline" size={22} color={Colors.fitness} />}
            iconBg={Colors.fitness + '22'}
            onPress={() => navigation.navigate(Screen.programs)}
          />
          <ListRow
            title="Coaching & consultations"
            subtitle="Book 1-on-1 sessions"
            icon={<Ionicons name="people-outline" size={22} color="#946BFA" />}
            iconBg="rgba(148, 107, 250, 0.15)"
            onPress={() => navigation.navigate(Screen.coaching)}
            showDivider={!!connected}
          />
          {connected && (
            <ListRow
              title="Disconnect clinician"
              subtitle="Stop sharing wellness data"
              icon={<Ionicons name="link-outline" size={22} color={Colors.error} />}
              iconBg={Colors.error + '18'}
              onPress={handleDisconnect}
              showDivider={false}
            />
          )}
        </AppCard>

        {wellnessScore && (
          <AppCard style={styles.scoreCard}>
            <View style={styles.scoreRow}>
              <View>
                <Text style={styles.scoreTitle}>Wellness snapshot</Text>
                <Text style={styles.scoreSub}>
                  {connected ? 'Shared with your clinician' : 'Connect to share with your clinician'}
                </Text>
              </View>
              <Text style={styles.scoreValue}>{wellnessScore.overall.toFixed(1)}</Text>
            </View>
          </AppCard>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  loadingCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
  },
  statusCard: { gap: Spacing.md },
  clinicianRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  clinicianAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(148, 107, 250, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clinicianInitial: {
    fontSize: Typography.size.xl,
    fontWeight: '700',
    color: '#946BFA',
  },
  clinicianInfo: { flex: 1, gap: 2 },
  clinicianName: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  clinicianSpec: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  connectedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  connectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  connectedText: {
    fontSize: Typography.size.xs,
    color: Colors.success,
    fontWeight: '600',
  },
  progressBlock: { gap: Spacing.xs },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  progressTrack: {
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: Radius.pill,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#946BFA',
    borderRadius: Radius.pill,
  },
  progressMeta: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
    fontWeight: '600',
  },
  emptyHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  emptyCopy: { flex: 1, gap: Spacing.xs },
  emptyTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  emptySub: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  requestsBlock: { gap: Spacing.sm },
  requestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
  },
  requestAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestInitial: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.primary,
  },
  requestCopy: { flex: 1, gap: 2 },
  requestName: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  requestSub: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
  },
  reviewBtn: { minWidth: 88, alignSelf: 'flex-start' },
  connectBtn: { marginTop: Spacing.xs },
  eligibilityHint: {
    marginTop: Spacing.sm,
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '600',
  },
  scoreCard: { paddingVertical: Spacing.md },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  scoreTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  scoreValue: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: '#946BFA',
  },
  scoreSub: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  bottomSpacer: { height: Spacing.md },
});
