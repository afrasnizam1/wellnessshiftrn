import React, { useCallback, useEffect, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { formatDistanceToNow } from 'date-fns';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { useAppStore } from '../../store';
import { clinicianService } from '../../services/clinicianService';
import { messageService } from '../../services/firebase';
import type { ClinicianStackParamList, InboxThread, PatientSummary } from '../../types';
import AppScreen from '../../components/common/AppScreen';

type Nav = NativeStackNavigationProp<ClinicianStackParamList>;

type InboxRow = InboxThread | (PatientSummary & { threadId?: undefined });

export default function ClinicianInboxScreen() {
  const navigation = useNavigation<Nav>();
  const { user } = useAppStore();
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [threads, setThreads] = useState<InboxThread[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPatients = useCallback(async () => {
    if (!user) return;
    const list = await clinicianService.fetchLinkedPatients(user.uid);
    setPatients(list);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  useEffect(() => {
    if (!user || patients.length === 0) return;
    return messageService.watchClinicianInbox(
      user.uid,
      patients.map((p) => ({ uid: p.uid, displayName: p.displayName, email: p.email })),
      setThreads
    );
  }, [user, patients]);

  const rows: InboxRow[] = [
    ...threads,
    ...patients
      .filter((p) => !threads.some((t) => t.patientId === p.uid))
      .map((p) => p),
  ].sort((a, b) => {
    const aUnread = 'clinicianUnread' in a ? (a.clinicianUnread ?? 0) : 0;
    const bUnread = 'clinicianUnread' in b ? (b.clinicianUnread ?? 0) : 0;
    if (bUnread !== aUnread) return bUnread - aUnread;
    const aTime = 'lastMessageAt' in a ? (a.lastMessageAt ?? '') : '';
    const bTime = 'lastMessageAt' in b ? (b.lastMessageAt ?? '') : '';
    return bTime.localeCompare(aTime);
  });

  const openThread = (patient: PatientSummary) => {
    navigation.navigate(Screen.clinicianMessages, { patient });
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={rows}
          keyExtractor={(item) => ('threadId' in item && item.threadId) ? item.threadId : item.uid}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>💬</Text>
              <Text style={styles.emptyTitle}>No patients linked</Text>
              <Text style={styles.emptySub}>Link patients to start secure messaging.</Text>
            </View>
          }
          renderItem={({ item }) => {
            const patient: PatientSummary = 'uid' in item
              ? item
              : {
                  uid: item.patientId,
                  displayName: item.patientName,
                  email: item.patientEmail,
                  wellnessScore: 0,
                  lastActive: '',
                  linkedSince: '',
                  needsAttention: false,
                };
            const unread = 'clinicianUnread' in item ? (item.clinicianUnread ?? 0) : 0;
            const preview = 'lastMessage' in item ? item.lastMessage : undefined;
            const time = 'lastMessageAt' in item ? item.lastMessageAt : undefined;

            return (
              <TouchableOpacity style={styles.row} onPress={() => openThread(patient)}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{patient.displayName.charAt(0)}</Text>
                </View>
                <View style={styles.rowBody}>
                  <View style={styles.rowTop}>
                    <Text style={styles.name} numberOfLines={1}>{patient.displayName}</Text>
                    {time ? (
                      <Text style={styles.time}>
                        {formatDistanceToNow(new Date(time), { addSuffix: true })}
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.rowBottom}>
                    <Text style={styles.preview} numberOfLines={1}>
                      {preview ?? 'Start a conversation'}
                    </Text>
                    {unread > 0 ? (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{unread > 9 ? '9+' : unread}</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
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
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  list: { padding: Spacing.base, gap: Spacing.sm },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.xl, padding: Spacing.base, ...Shadow.sm,
  },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.primaryBg, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.primary },
  rowBody: { flex: 1, gap: 4 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Spacing.sm },
  name: { flex: 1, fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  time: { fontSize: Typography.size.xs, color: Colors.textTertiary },
  rowBottom: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  preview: { flex: 1, fontSize: Typography.size.sm, color: Colors.textSecondary },
  badge: {
    minWidth: 22, height: 22, borderRadius: 11,
    backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6,
  },
  badgeText: { color: Colors.white, fontSize: 11, fontWeight: '700' },
  empty: { alignItems: 'center', paddingTop: Spacing['3xl'], gap: Spacing.sm },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  emptySub: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center' },
});
