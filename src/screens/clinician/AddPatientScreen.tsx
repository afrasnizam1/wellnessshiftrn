import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { useAppStore } from '../../store';
import { clinicianService } from '../../services/clinicianService';
import AppScreen from '../../components/common/AppScreen';

export default function AddPatientScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!user || !email.trim()) return;
    setLoading(true);
    try {
      await clinicianService.sendConnectionRequest(user.uid, email.trim());
      Alert.alert(
        'Request sent',
        'The patient will see your connection request in their app. They can approve or decline.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (err: any) {
      Alert.alert('Could not send request', err.message ?? 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add patient by email</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView style={styles.body} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Text style={styles.hint}>
          Enter the email address your patient used to sign up. They'll receive a connection request to approve.
        </Text>

        <Text style={styles.label}>Patient email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="patient@email.com"
          placeholderTextColor={Colors.textTertiary}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          style={[styles.btn, loading && { opacity: 0.6 }]}
          onPress={handleSend}
          disabled={loading || !email.trim()}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.btnText}>Send connection request</Text>
          )}
        </TouchableOpacity>

        <View style={styles.altCard}>
          <Text style={styles.altTitle}>Or use an invite code</Text>
          <Text style={styles.altBody}>
            Share your invite code from the Dashboard. The patient enters it under More → Connect a Clinician.
          </Text>
        </View>
      </KeyboardAvoidingView>
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
  body: { flex: 1, padding: Spacing.base, gap: Spacing.md },
  hint: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  label: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text },
  input: {
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.md,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    fontSize: Typography.size.base, color: Colors.text, backgroundColor: Colors.white,
  },
  btn: {
    backgroundColor: Colors.accent, borderRadius: Radius.xl,
    paddingVertical: Spacing.base, alignItems: 'center', marginTop: Spacing.sm,
  },
  btnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.base },
  altCard: {
    marginTop: Spacing.lg, backgroundColor: Colors.primaryBg,
    borderRadius: Radius.lg, padding: Spacing.base, gap: Spacing.xs,
  },
  altTitle: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text },
  altBody: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
});
