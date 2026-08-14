// src/screens/more/CarePlanScreen.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius, Shadow, fitnessModuleIonIcon } from '../../theme';
import { useAppStore } from '../../store';
import { clinicianService, formatClinicianConnectedMessage, normalizeInviteCode } from '../../services/clinicianService';
import { carePlanService } from '../../services/firebase';
import { gamificationService } from '../../services/gamificationService';
import { markCarePlanSeen } from '../../services/carePlanUnseen';
import { Screen } from '../../navigation/screenNames';
import { FITNESS_MODULES } from '../../data/fitnessData';
import { openCarePlanTask, resolveCarePlanModuleId } from '../../utils/carePlanActions';
import type { CarePlanTask, ConnectionRequest } from '../../types';
import AppScreen from '../../components/common/AppScreen';
import { AppCard, BrandButton, IconBadge, ScreenHeader } from '../../components/ui';

export default function CarePlanScreen() {
  const navigation = useNavigation<any>();
  const {
    user,
    carePlan,
    clinicianRecommendations,
    setCarePlan,
    setUser,
    setHasUnseenCarePlan,
  } = useAppStore();
  const [connectCode, setConnectCode] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<ConnectionRequest[]>([]);
  const [responding, setResponding] = useState<string | null>(null);
  const [completingId, setCompletingId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!user?.uid || !carePlan) return;
      markCarePlanSeen(user.uid, carePlan, setHasUnseenCarePlan).catch(() => {});
    }, [user?.uid, carePlan?.id, setHasUnseenCarePlan]),
  );

  useEffect(() => {
    if (!user) return;
    const unsubPlans = carePlanService.watchCarePlans(user.uid, (plans) => {
      setCarePlan(plans[0] ?? null);
    });
    if (user.clinicianId) {
      return () => unsubPlans();
    }
    const unsubReq = clinicianService.watchPendingRequestsForPatient(user.uid, setPendingRequests);
    return () => {
      unsubPlans();
      unsubReq();
    };
  }, [user?.uid, user?.clinicianId, setCarePlan]);

  const tasks: CarePlanTask[] = useMemo(() => {
    if (carePlan?.tasks?.length) return carePlan.tasks;
    const recs = clinicianRecommendations?.recommendedModules ?? [];
    return recs.map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      type: 'goal' as const,
      isComplete: false,
      moduleId: m.id,
    }));
  }, [carePlan?.tasks, clinicianRecommendations]);

  const doneCount = tasks.filter((t) => t.isComplete).length;

  const handleApprove = async (request: ConnectionRequest) => {
    if (!user) return;
    setResponding(request.id);
    try {
      const clinicianId = await clinicianService.approveConnectionRequest(user.uid, request.id);
      setUser({ ...user, clinicianId });
      const plans = await carePlanService.getCarePlans(user.uid);
      if (plans.length > 0) setCarePlan(plans[0]);
      const info = await clinicianService.getPatientClinicianInfo(user.uid).catch(() => null);
      Alert.alert(
        'Connected!',
        formatClinicianConnectedMessage(info ?? { clinicianName: request.clinicianName }),
      );
      gamificationService.evaluateAchievements(user.uid).catch(() => {});
    } catch (err: any) {
      Alert.alert('Error', err.message ?? 'Could not approve request.');
    } finally {
      setResponding(null);
    }
  };

  const handleDecline = async (request: ConnectionRequest) => {
    if (!user) return;
    setResponding(request.id);
    try {
      await clinicianService.declineConnectionRequest(user.uid, request.id);
    } finally {
      setResponding(null);
    }
  };

  const handleConnect = async () => {
    const code = normalizeInviteCode(connectCode);
    if (code.length < 4) return;
    setConnecting(true);
    try {
      if (user) {
        const clinicianId = await clinicianService.connectWithCode(user.uid, code);
        setUser({ ...user, clinicianId });
        const plans = await carePlanService.getCarePlans(user.uid);
        if (plans.length > 0) setCarePlan(plans[0]);
        const info = await clinicianService.getPatientClinicianInfo(user.uid).catch(() => null);
        Alert.alert('Connected!', formatClinicianConnectedMessage(info ?? {}));
      }
      setConnectCode('');
    } catch (err: any) {
      Alert.alert('Error', err.message ?? 'Invalid or expired code.');
    } finally {
      setConnecting(false);
    }
  };

  const markDone = async (task: CarePlanTask) => {
    if (!user || !carePlan || task.isComplete) return;
    setCompletingId(task.id);
    try {
      const next = await carePlanService.completeTask(user.uid, carePlan.id, task.id);
      if (next) setCarePlan(next);
    } catch {
      Alert.alert('Could not update', 'Please try again.');
    } finally {
      setCompletingId(null);
    }
  };

  const backFromCarePlan = () => {
    const index = navigation.getState()?.index ?? 0;
    if (index > 0) {
      navigation.goBack();
      return;
    }
    navigation.navigate(Screen.tabMyCare, { screen: Screen.myCare });
  };

  if (!carePlan && tasks.length === 0) {
    return (
      <AppScreen mesh={false} style={styles.safe}>
        <ScreenHeader title="My Care Plan" onBack={backFromCarePlan} />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🩺</Text>
            <Text style={styles.emptyTitle}>No clinician connected</Text>
            <Text style={styles.emptySub}>
              Clinician connection is only for patients with a health issue whose GP has referred
              them. Approve a request below, or enter the invite code your referred clinician gave you.
            </Text>
          </View>

          {pendingRequests.map((req) => (
            <View key={req.id} style={styles.requestCard}>
              <Text style={styles.requestTitle}>Connection request</Text>
              <Text style={styles.requestName}>{req.clinicianName}</Text>
              <Text style={styles.requestSub}>wants to connect as your clinician</Text>
              <View style={styles.requestActions}>
                <TouchableOpacity
                  style={styles.declineBtn}
                  onPress={() => handleDecline(req)}
                  disabled={responding === req.id}
                >
                  <Text style={styles.declineBtnText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.approveBtn}
                  onPress={() => handleApprove(req)}
                  disabled={responding === req.id}
                >
                  {responding === req.id ? (
                    <ActivityIndicator color={Colors.white} size="small" />
                  ) : (
                    <Text style={styles.approveBtnText}>Approve</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View style={styles.connectCard}>
            <Text style={styles.connectTitle}>Enter invite code</Text>
            <View style={styles.codeRow}>
              <TextInput
                style={styles.codeInput}
                placeholder="e.g. ABC123"
                placeholderTextColor={Colors.textTertiary}
                value={connectCode}
                onChangeText={(text) => setConnectCode(normalizeInviteCode(text))}
                autoCapitalize="characters"
                autoCorrect={false}
                maxLength={12}
              />
              <TouchableOpacity
                style={[styles.connectBtn, connecting && styles.btnDisabled]}
                onPress={handleConnect}
                disabled={connecting}
              >
                {connecting
                  ? <ActivityIndicator color={Colors.white} size="small" />
                  : <Text style={styles.connectBtnText}>Connect</Text>
                }
              </TouchableOpacity>
            </View>
            <Text style={styles.connectHint}>
              Your clinician can generate this code from their portal.
            </Text>
          </View>
        </ScrollView>
      </AppScreen>
    );
  }

  return (
    <AppScreen mesh={false} style={styles.safe}>
      <ScreenHeader title="My Care Plan" onBack={backFromCarePlan} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppCard>
          <Text style={styles.fromLabel}>From {carePlan?.clinicianName ?? clinicianRecommendations?.clinicianName}</Text>
          <Text style={styles.planTitle}>{carePlan?.title ?? 'Your care plan'}</Text>
          <Text style={styles.planHint}>
            Open each item, do the activity, then mark it done. Your clinician sees your progress.
          </Text>
          <Text style={styles.progressMeta}>
            {doneCount} of {tasks.length} complete
          </Text>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${tasks.length ? (doneCount / tasks.length) * 100 : 0}%` },
              ]}
            />
          </View>
        </AppCard>

        {tasks.map((task) => {
          const moduleId = resolveCarePlanModuleId(task);
          const catalog = moduleId ? FITNESS_MODULES.find((m) => m.id === moduleId) : undefined;
          const canOpen = !!(moduleId || /check-in|daily plan/i.test(task.title));
          return (
            <AppCard key={task.id} style={task.isComplete ? styles.taskDone : undefined}>
              <View style={styles.taskTop}>
                {catalog ? (
                  <IconBadge name={fitnessModuleIonIcon(catalog)} color={catalog.color} size="sm" />
                ) : (
                  <View style={[styles.checkIcon, task.isComplete && styles.checkIconDone]}>
                    <Ionicons
                      name={task.isComplete ? 'checkmark' : 'ellipse-outline'}
                      size={18}
                      color={task.isComplete ? Colors.white : Colors.primary}
                    />
                  </View>
                )}
                <View style={styles.taskCopy}>
                  <Text style={[styles.taskTitle, task.isComplete && styles.taskTitleDone]}>
                    {task.title}
                  </Text>
                  {task.description ? (
                    <Text style={styles.taskDesc}>{task.description}</Text>
                  ) : null}
                </View>
              </View>
              <View style={styles.taskActions}>
                {canOpen && !task.isComplete ? (
                  <BrandButton
                    label="Open"
                    variant="outline"
                    compact
                    onPress={() => openCarePlanTask(navigation, task)}
                    style={styles.actionBtn}
                  />
                ) : null}
                <BrandButton
                  label={task.isComplete ? 'Done' : 'Mark done'}
                  compact
                  disabled={task.isComplete}
                  loading={completingId === task.id}
                  onPress={() => markDone(task)}
                  style={styles.actionBtn}
                />
              </View>
            </AppCard>
          );
        })}
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, gap: Spacing.md },
  fromLabel: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  planTitle: { fontSize: Typography.size.lg, fontWeight: '800', color: Colors.text, marginTop: 4 },
  planHint: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginTop: Spacing.sm,
  },
  progressMeta: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginTop: Spacing.md,
  },
  progressTrack: {
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: Radius.pill,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressFill: { height: '100%', backgroundColor: Colors.success, borderRadius: Radius.pill },
  taskDone: { opacity: 0.72 },
  taskTop: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  taskCopy: { flex: 1 },
  taskTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  taskTitleDone: { textDecorationLine: 'line-through', color: Colors.textSecondary },
  taskDesc: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: 4, lineHeight: 20 },
  taskActions: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.md },
  actionBtn: { flex: 1 },
  checkIcon: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIconDone: { backgroundColor: Colors.success },
  emptyState: { alignItems: 'center', paddingVertical: Spacing['3xl'], gap: Spacing.md },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text },
  emptySub: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center', paddingHorizontal: Spacing.xl },
  connectCard: {
    backgroundColor: Colors.white, borderRadius: Radius.xl,
    padding: Spacing.xl, ...Shadow.md, gap: Spacing.md,
  },
  connectTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  codeRow: { flexDirection: 'row', gap: Spacing.sm },
  codeInput: {
    flex: 1, borderWidth: 1.5, borderColor: Colors.border,
    borderRadius: Radius.md, paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md, fontSize: Typography.size.lg,
    fontWeight: '700', color: Colors.text, letterSpacing: 3,
  },
  connectBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.md,
    paddingHorizontal: Spacing.base, justifyContent: 'center',
  },
  btnDisabled: { opacity: 0.6 },
  connectBtnText: { color: Colors.white, fontWeight: '700' },
  connectHint: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  requestCard: {
    backgroundColor: Colors.white, borderRadius: Radius.xl,
    padding: Spacing.base, gap: Spacing.sm, ...Shadow.md,
    borderLeftWidth: 4, borderLeftColor: Colors.primary,
  },
  requestTitle: { fontSize: Typography.size.xs, color: Colors.textSecondary, fontWeight: '600', textTransform: 'uppercase' },
  requestName: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  requestSub: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  requestActions: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  declineBtn: {
    flex: 1, borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.md,
    paddingVertical: Spacing.md, alignItems: 'center',
  },
  declineBtnText: { color: Colors.textSecondary, fontWeight: '600' },
  approveBtn: {
    flex: 1, backgroundColor: Colors.accent, borderRadius: Radius.md,
    paddingVertical: Spacing.md, alignItems: 'center',
  },
  approveBtnText: { color: Colors.white, fontWeight: '700' },
});
