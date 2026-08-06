// src/screens/more/CarePlanScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { useAppStore } from '../../store';
import { clinicianService } from '../../services/clinicianService';
import { carePlanService } from '../../services/firebase';
import { gamificationService } from '../../services/gamificationService';
import { markCarePlanSeen } from '../../services/carePlanUnseen';
import type { ConnectionRequest } from '../../types';
import AppScreen from '../../components/common/AppScreen';

const PLAN_TABS = ['Overview', 'Workouts', 'Nutrition', 'Sleep', 'Habits', 'Mindfulness', 'Goals'];

export default function CarePlanScreen() {
  const navigation = useNavigation<any>();
  const { user, carePlan, setCarePlan, setUser, setHasUnseenCarePlan } = useAppStore();
  const [activeTab, setActiveTab] = useState('Overview');
  const [connectCode, setConnectCode] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<ConnectionRequest[]>([]);
  const [responding, setResponding] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!user?.uid || !carePlan) return;
      markCarePlanSeen(user.uid, carePlan, setHasUnseenCarePlan).catch(() => {});
    }, [user?.uid, carePlan?.id, setHasUnseenCarePlan]),
  );

  useEffect(() => {
    if (!user || user.clinicianId) return;
    return clinicianService.watchPendingRequestsForPatient(user.uid, setPendingRequests);
  }, [user?.uid, user?.clinicianId]);

  const handleApprove = async (request: ConnectionRequest) => {
    if (!user) return;
    setResponding(request.id);
    try {
      const clinicianId = await clinicianService.approveConnectionRequest(user.uid, request.id);
      setUser({ ...user, clinicianId });
      const plans = await carePlanService.getCarePlans(user.uid);
      if (plans.length > 0) setCarePlan(plans[0]);
      Alert.alert('Connected!', `You are now linked with ${request.clinicianName}.`);
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
    if (connectCode.trim().length < 4) return;
    setConnecting(true);
    try {
      if (user) {
        const clinicianId = await clinicianService.connectWithCode(
          user.uid,
          connectCode.trim().toUpperCase()
        );
        setUser({ ...user, clinicianId });
        const plans = await carePlanService.getCarePlans(user.uid);
        if (plans.length > 0) setCarePlan(plans[0]);
      }
      Alert.alert('Connected!', 'You are now linked with your clinician.');
      setConnectCode('');
    } catch (err: any) {
      Alert.alert('Error', err.message ?? 'Invalid or expired code.');
    } finally {
      setConnecting(false);
    }
  };

  if (!carePlan) {
    return (
      <AppScreen style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Care Plan</Text>
          <View style={{ width: 40 }} />
        </View>
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
                onChangeText={setConnectCode}
                autoCapitalize="characters"
                maxLength={8}
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

  const tasksByType = (type: string) =>
    carePlan.tasks.filter((t) => type === 'Overview' || t.type === type.toLowerCase());

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Care Plan</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Clinician info */}
      <View style={styles.clinicianBar}>
        <View style={styles.clinicianAvatar}>
          <Text style={{ fontSize: 18 }}>🩺</Text>
        </View>
        <View style={styles.clinicianInfo}>
          <Text style={styles.clinicianName}>{carePlan.clinicianName}</Text>
          <Text style={styles.clinicianSpec}>{carePlan.specialty}</Text>
        </View>
        <View style={styles.connectedBadge}>
          <View style={styles.connectedDot} />
          <Text style={styles.connectedText}>Connected</Text>
        </View>
      </View>

      {/* Tab bar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
        {PLAN_TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.planTitle}>{carePlan.title}</Text>

        {tasksByType(activeTab).length === 0 ? (
          <View style={styles.emptyTab}>
            <Text style={styles.emptyTabText}>No {activeTab.toLowerCase()} tasks yet</Text>
          </View>
        ) : (
          tasksByType(activeTab).map((task) => (
            <View key={task.id} style={[styles.taskCard, task.isComplete && styles.taskCardDone]}>
              <View style={styles.taskLeft}>
                <View style={[styles.taskCheckbox, task.isComplete && styles.taskCheckboxDone]}>
                  {task.isComplete && <Text style={styles.taskCheck}>✓</Text>}
                </View>
              </View>
              <View style={styles.taskInfo}>
                <Text style={[styles.taskTitle, task.isComplete && styles.taskTitleDone]}>
                  {task.title}
                </Text>
                <Text style={styles.taskDesc}>{task.description}</Text>
                {task.dueDate && (
                  <Text style={styles.taskDue}>Due: {task.dueDate}</Text>
                )}
              </View>
              <View style={[styles.typePill, { backgroundColor: Colors.primary + '22' }]}>
                <Text style={[styles.typePillText, { color: Colors.primary }]}>{task.type}</Text>
              </View>
            </View>
          ))
        )}
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  clinicianBar: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, padding: Spacing.base,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  clinicianAvatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.primaryBg, alignItems: 'center', justifyContent: 'center',
  },
  clinicianInfo: { flex: 1 },
  clinicianName: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  clinicianSpec: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  connectedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  connectedDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.success },
  connectedText: { fontSize: Typography.size.xs, color: Colors.success, fontWeight: '600' },
  tabBar: { backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  tab: { paddingHorizontal: Spacing.base, paddingVertical: Spacing.md },
  tabActive: { borderBottomWidth: 2, borderBottomColor: Colors.primary },
  tabText: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  tabTextActive: { color: Colors.primary, fontWeight: '700' },
  content: { padding: Spacing.base, gap: Spacing.md },
  planTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  taskCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.lg,
    padding: Spacing.base, ...Shadow.sm,
  },
  taskCardDone: { opacity: 0.65 },
  taskLeft: { paddingTop: 2 },
  taskCheckbox: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  taskCheckboxDone: { backgroundColor: Colors.success, borderColor: Colors.success },
  taskCheck: { color: Colors.white, fontSize: 12, fontWeight: '700' },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  taskTitleDone: { textDecorationLine: 'line-through', color: Colors.textSecondary },
  taskDesc: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  taskDue: { fontSize: Typography.size.xs, color: Colors.warning, marginTop: 4 },
  typePill: { paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: Radius.xl },
  typePillText: { fontSize: 10, fontWeight: '700' },
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
  emptyTab: { alignItems: 'center', paddingVertical: Spacing['2xl'] },
  emptyTabText: { fontSize: Typography.size.sm, color: Colors.textSecondary },
});
