// src/screens/analytics/WellnessExportScreen.tsx
import React, { useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow, WELLNESS_CATEGORIES } from '../../theme';
import { useAppStore } from '../../store';
import { canAccessFeature } from '../../services/iap';
import { buildWellnessReportSnapshot } from '../../services/wellnessReportAssembler';
import { exportWellnessReport } from '../../services/wellnessReportPdf';
import AppScreen from '../../components/common/AppScreen';

export default function WellnessExportScreen() {
  const navigation = useNavigation<any>();
  const { wellnessScore, user, subscriptionTier } = useAppStore();
  const [exporting, setExporting] = useState(false);
  const canExport = canAccessFeature('wellnessExport', subscriptionTier);

  const handleExport = async () => {
    if (!canExport) {
      navigation.navigate(Screen.subscriptionPaywall, { feature: 'wellnessExport' });
      return;
    }
    if (!user) {
      Alert.alert('Sign in required', 'Please sign in or use demo mode to export a report.');
      return;
    }

    setExporting(true);
    try {
      const snapshot = await buildWellnessReportSnapshot(
        user.uid,
        user.displayName,
        wellnessScore,
      );
      await exportWellnessReport(snapshot);
    } catch (e) {
      Alert.alert(
        'Export failed',
        e instanceof Error ? e.message : 'Could not generate your report. Please try again.',
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Export Report</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Wellness Year Report</Text>
          <Text style={styles.previewSub}>{user?.displayName ?? 'Patient'} • {new Date().getFullYear()}</Text>

          <View style={styles.previewScoreRow}>
            <Text style={styles.previewScoreLabel}>Overall Score</Text>
            <Text style={styles.previewScore}>{wellnessScore?.overall.toFixed(1) ?? '—'}/10</Text>
          </View>

          <View style={styles.previewCategories}>
            {WELLNESS_CATEGORIES.map((cat) => {
              const score = wellnessScore?.categories?.[cat.key as keyof typeof wellnessScore.categories] ?? 0;
              return (
                <View key={cat.key} style={styles.previewCatRow}>
                  <Text style={styles.previewCatIcon}>{cat.icon}</Text>
                  <Text style={styles.previewCatLabel}>{cat.label}</Text>
                  <View style={styles.previewBarTrack}>
                    <View style={[styles.previewBarFill, { width: `${score * 10}%`, backgroundColor: cat.color }]} />
                  </View>
                  <Text style={styles.previewCatScore}>{score.toFixed(1)}</Text>
                </View>
              );
            })}
          </View>

          <Text style={styles.previewFooter}>
            PDF includes score history, category breakdown, strengths, focus areas, check-in streak, and activity summary.
          </Text>
        </View>

        {!canExport && (
          <View style={styles.lockBanner}>
            <Text style={styles.lockIcon}>🔒</Text>
            <Text style={styles.lockText}>PDF export requires Growth or Pro plan</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.exportBtn, exporting && styles.btnDisabled]}
          onPress={handleExport}
          disabled={exporting}
        >
          {exporting
            ? <ActivityIndicator color={Colors.white} />
            : <Text style={styles.exportBtnText}>
                {canExport ? '⬆  Export as PDF' : '🔒  Upgrade to Export'}
              </Text>
          }
        </TouchableOpacity>

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
    backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.base, gap: Spacing.md },
  previewCard: {
    backgroundColor: Colors.white, borderRadius: Radius.xl,
    padding: Spacing.xl, ...Shadow.md, gap: Spacing.md,
  },
  previewTitle: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text },
  previewSub: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  previewScoreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  previewScoreLabel: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  previewScore: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.primary },
  previewCategories: { gap: Spacing.sm },
  previewCatRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  previewCatIcon: { fontSize: 14, width: 20, textAlign: 'center' },
  previewCatLabel: { width: 120, fontSize: Typography.size.xs, color: Colors.text },
  previewBarTrack: { flex: 1, height: 6, backgroundColor: Colors.borderLight, borderRadius: 3, overflow: 'hidden' },
  previewBarFill: { height: '100%', borderRadius: 3 },
  previewCatScore: { width: 28, fontSize: Typography.size.xs, fontWeight: '700', color: Colors.text, textAlign: 'right' },
  previewFooter: { fontSize: Typography.size.xs, color: Colors.textTertiary, lineHeight: 16 },
  lockBanner: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.warning + '15', borderRadius: Radius.lg, padding: Spacing.base,
  },
  lockIcon: { fontSize: 20 },
  lockText: { fontSize: Typography.size.sm, color: Colors.warning, fontWeight: '600' },
  exportBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.xl,
    paddingVertical: Spacing.base, alignItems: 'center', ...Shadow.sm,
  },
  btnDisabled: { opacity: 0.6 },
  exportBtnText: { color: Colors.white, fontSize: Typography.size.base, fontWeight: '700' },
});
