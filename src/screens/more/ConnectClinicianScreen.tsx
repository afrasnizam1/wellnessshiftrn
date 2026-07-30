import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { ScreenHeader } from '../../components/ui';
import { useAppStore } from '../../store';
import { clinicianService } from '../../services/clinicianService';
import { carePlanService } from '../../services/firebase';
import { gamificationService } from '../../services/gamificationService';
import type { ConnectionRequest } from '../../types';
import AppScreen from '../../components/common/AppScreen';

/** Focused connect flow — opened from My Care hub */
export default function ConnectClinicianScreen() {
  const navigation = useNavigation<any>();
  const { user, setUser, setCarePlan } = useAppStore();
  const [connectCode, setConnectCode] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<ConnectionRequest[]>([]);
  const [responding, setResponding] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    return clinicianService.watchPendingRequestsForPatient(user.uid, setPendingRequests);
  }, [user?.uid]);

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
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error', err.message ?? 'Could not approve request.');
    } finally {
      setResponding(null);
    }
  };

  const handleConnect = async () => {
    if (connectCode.trim().length < 4 || !user) return;
    setConnecting(true);
    try {
      const clinicianId = await clinicianService.connectWithCode(
        user.uid,
        connectCode.trim().toUpperCase(),
      );
      setUser({ ...user, clinicianId });
      const plans = await carePlanService.getCarePlans(user.uid).catch(() => []);
      if (plans.length > 0) setCarePlan(plans[0]);
      Alert.alert('Connected!', 'You are now linked with your clinician.');
      navigation.goBack();
    } catch (err: any) {
      const message = err?.message ?? '';
      if (message.includes('permission-denied')) {
        Alert.alert(
          'Could not connect',
          'Your account could not be linked right now. Please try again in a moment, or ask your clinician to send a connection request instead.',
        );
      } else {
        Alert.alert('Error', message || 'Invalid or expired code.');
      }
    } finally {
      setConnecting(false);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <ScreenHeader title="Connect Clinician" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        {pendingRequests.map((req) => (
          <View key={req.id} style={styles.requestCard}>
            <Text style={styles.requestTitle}>Connection request</Text>
            <Text style={styles.requestName}>{req.clinicianName}</Text>
            <View style={styles.requestActions}>
              <TouchableOpacity style={styles.declineBtn} onPress={() => clinicianService.declineConnectionRequest(user!.uid, req.id)}>
                <Text style={styles.declineText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.approveBtn} onPress={() => handleApprove(req)} disabled={responding === req.id}>
                {responding === req.id ? <ActivityIndicator color={Colors.white} size="small" /> : <Text style={styles.approveText}>Approve</Text>}
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.connectCard}>
          <Text style={styles.connectTitle}>Enter invite code</Text>
          <Text style={styles.connectSub}>Your clinician can generate this from their dashboard.</Text>
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
            style={[styles.connectBtn, connecting && { opacity: 0.6 }]}
            onPress={handleConnect}
            disabled={connecting}
          >
            {connecting ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.connectBtnText}>Connect</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, gap: Spacing.md },
  requestCard: {
    backgroundColor: Colors.white, borderRadius: Radius.xl, padding: Spacing.base,
    gap: Spacing.sm, ...Shadow.md, borderLeftWidth: 4, borderLeftColor: Colors.primary,
  },
  requestTitle: { fontSize: Typography.size.xs, color: Colors.textSecondary, fontWeight: '600', textTransform: 'uppercase' },
  requestName: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  requestActions: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  declineBtn: { flex: 1, borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.md, paddingVertical: Spacing.md, alignItems: 'center' },
  declineText: { color: Colors.textSecondary, fontWeight: '600' },
  approveBtn: { flex: 1, backgroundColor: Colors.accent, borderRadius: Radius.md, paddingVertical: Spacing.md, alignItems: 'center' },
  approveText: { color: Colors.white, fontWeight: '700' },
  connectCard: { backgroundColor: Colors.white, borderRadius: Radius.xl, padding: Spacing.xl, gap: Spacing.md, ...Shadow.md },
  connectTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  connectSub: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  codeInput: {
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.md,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    fontSize: Typography.size.xl, fontWeight: '700', letterSpacing: 4, textAlign: 'center',
  },
  connectBtn: { backgroundColor: Colors.primary, borderRadius: Radius.lg, paddingVertical: Spacing.md, alignItems: 'center' },
  connectBtnText: { color: Colors.white, fontWeight: '700' },
});
