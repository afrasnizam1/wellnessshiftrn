import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, ScreenHeader } from '../../components/ui';
import { clinicianService } from '../../services/clinicianService';
import { useAppStore } from '../../store';
import AppScreen from '../../components/common/AppScreen';

export default function ScanCustomPlanScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const redeem = async () => {
    if (!user || !code.trim()) return;
    setLoading(true);
    try {
      const plan = await clinicianService.getCustomCarePlanById(code.trim());
      if (!plan) {
        Alert.alert('Not found', 'No care plan matches that code. Check with your clinician.');
        return;
      }
      await clinicianService.linkCustomPlanToPatient(user.uid, plan);
      Alert.alert('Plan linked', `"${plan.planName}" has been added to your care plans.`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <ScreenHeader
          title="Import Care Plan"
          subtitle="Enter the plan code from your clinician"
          onBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <AppCard style={styles.card}>
          <Text style={styles.help}>
            Your clinician can share a plan ID or QR code. Paste the plan ID below to import it into My Care.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Plan ID / share code"
            placeholderTextColor={Colors.textTertiary}
            value={code}
            onChangeText={setCode}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={[styles.btn, loading && styles.btnDisabled]}
            onPress={redeem}
            disabled={loading}
          >
            <Text style={styles.btnText}>{loading ? 'Importing...' : 'Import plan'}</Text>
          </TouchableOpacity>
        </AppCard>
        <Text style={styles.footer}>
          QR camera scanning can be added in a future update. For now, ask your clinician for the plan ID shown in their app.
        </Text>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.base, paddingTop: Spacing.sm },
  content: { padding: Spacing.base, gap: Spacing.md },
  card: { gap: Spacing.md },
  help: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  input: {
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.md,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    fontSize: Typography.size.base, color: Colors.text,
  },
  btn: { backgroundColor: Colors.primary, borderRadius: Radius.lg, padding: Spacing.base, alignItems: 'center' },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: Colors.white, fontWeight: '700' },
  footer: { fontSize: Typography.size.xs, color: Colors.textTertiary, textAlign: 'center', lineHeight: 18 },
});
