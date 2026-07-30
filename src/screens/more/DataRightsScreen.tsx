// src/screens/more/DataRightsScreen.tsx
import React, { useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Share,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { useAppStore } from '../../store';
import { deleteCurrentUserAccount } from '../../services/accountDeletion';
import { userService } from '../../services/firebase';
import AppScreen from '../../components/common/AppScreen';

export default function DataRightsScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [loading, setLoading] = useState<string | null>(null);

  const handle = async (action: string, fn: () => Promise<void>) => {
    setLoading(action);
    try {
      await fn();
    } catch (error: any) {
      Alert.alert('Error', error?.message ?? 'Request failed. Please try again or contact support.');
    } finally {
      setLoading(null);
    }
  };

  const exportLocalData = async () => {
    if (!user) {
      throw new Error('You must be signed in to export data.');
    }
    const profile = await userService.getProfile(user.uid);
    const payload = JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        profile: profile ?? {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: user.role,
        },
      },
      null,
      2,
    );
    await Share.share({
      message: payload,
      title: 'Wellness Shift data export',
    });
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Account',
      'This permanently erases your account and associated data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handle('erase', () => deleteCurrentUserAccount()),
        },
      ],
    );
  };

  const RIGHTS = [
    {
      icon: '📋',
      title: 'Access my data',
      id: 'access',
      desc: 'Share a JSON copy of your profile data from this device.',
      action: () => handle('access', exportLocalData),
    },
    {
      icon: '✏️',
      title: 'Rectify my data',
      id: 'rectify',
      desc: 'Correct inaccurate personal information.',
      action: async () => {
        navigation.navigate(Screen.profile);
      },
    },
    {
      icon: '🗑️',
      title: 'Erase my data',
      id: 'erase',
      desc: 'Delete all your personal data permanently.',
      action: async () => {
        confirmDelete();
      },
      destructive: true,
    },
    {
      icon: '📤',
      title: 'Data portability',
      id: 'portability',
      desc: 'Export your profile data in a machine-readable JSON format.',
      action: () => handle('portability', exportLocalData),
    },
    {
      icon: '🚫',
      title: 'Restrict processing',
      id: 'restrict',
      desc: 'Limit how we use your data while a request is pending.',
      action: async () => {
        Alert.alert(
          'Request submitted',
          'Email privacy@wellnessshift.co.uk to request a processing restriction. We respond within 30 days.',
        );
      },
    },
    {
      icon: '❌',
      title: 'Object to processing',
      id: 'object',
      desc: 'Object to us using your data for certain purposes.',
      action: async () => {
        Alert.alert(
          'Request submitted',
          'Contact support@wellnessshift.co.uk with your objection. You can also turn off analytics in Profile.',
        );
      },
    },
  ];

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Data Rights</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.intro}>
          <Text style={styles.introTitle}>UK GDPR Rights</Text>
          <Text style={styles.introBody}>
            As a UK resident you have the following rights over your personal data. Access and export
            happen on this device; erasure deletes your account immediately where possible.
          </Text>
        </View>
        {RIGHTS.map((r) => (
          <TouchableOpacity
            key={r.id}
            style={[styles.card, r.destructive && styles.cardDestructive]}
            onPress={() => {
              void r.action();
            }}
            disabled={loading === r.id}
          >
            <Text style={styles.cardIcon}>{r.icon}</Text>
            <View style={styles.cardInfo}>
              <Text style={[styles.cardTitle, r.destructive && { color: Colors.error }]}>{r.title}</Text>
              <Text style={styles.cardDesc}>{r.desc}</Text>
            </View>
            {loading === r.id
              ? <ActivityIndicator size="small" color={Colors.primary} />
              : <Text style={styles.chevron}>›</Text>
            }
          </TouchableOpacity>
        ))}
        <Text style={styles.footer}>Questions? Contact us at support@wellnessshift.co.uk</Text>
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.base, gap: Spacing.md },
  intro: { backgroundColor: Colors.primaryBg, borderRadius: Radius.lg, padding: Spacing.base, gap: Spacing.xs },
  introTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.primary },
  introBody: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  card: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm },
  cardDestructive: { borderWidth: 1, borderColor: Colors.error + '33' },
  cardIcon: { fontSize: 24, width: 32, textAlign: 'center' },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  cardDesc: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  chevron: { fontSize: 20, color: Colors.textTertiary },
  footer: { fontSize: Typography.size.xs, color: Colors.textTertiary, textAlign: 'center' },
});
