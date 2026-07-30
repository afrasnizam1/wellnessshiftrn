import React, { useCallback, useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TextInput, Alert, TouchableOpacity,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppScreen from '../../components/common/AppScreen';
import { AppCard, BrandButton, ScreenHeader } from '../../components/ui';
import NutritionReportCard from '../../components/nutrition/NutritionReportCard';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { useAppStore } from '../../store';
import {
  analyseFoodPhoto,
  buildNutritionReport,
  foodLogService,
  type DailyNutritionSummary,
  type FoodLogEntry,
  type NutritionReport,
} from '../../services/foodLogService';
import { applyLifestyleMetricsToWellnessScore } from '../../services/lifestyleScoreService';
import { imagePickerService } from '../../services/imagePickerService';

export default function FoodScanScreen() {
  const navigation = useNavigation<any>();
  const { user, activity, setWellnessScore } = useAppStore();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [analysing, setAnalysing] = useState(false);
  const [preview, setPreview] = useState<Omit<FoodLogEntry, 'id' | 'createdAt'> | null>(null);
  const [summary, setSummary] = useState<DailyNutritionSummary | null>(null);
  const [showCapture, setShowCapture] = useState(true);

  const activeBurn = activity?.calories ?? 0;

  const mealReport: NutritionReport | null = useMemo(() => {
    if (!preview) return null;
    return buildNutritionReport(preview.macros, {
      title: 'Nutritional Details',
      subtitle: `${preview.label} · ${preview.mealType}`,
      activeBurnKcal: activeBurn,
    });
  }, [preview, activeBurn]);

  const loadSummary = useCallback(async () => {
    if (!user) return;
    setSummary(await foodLogService.getTodaySummary(user.uid, activity?.calories ?? 0));
  }, [user, activity?.calories]);

  useFocusEffect(
    useCallback(() => {
      loadSummary();
    }, [loadSummary]),
  );

  const pickImage = async (fromCamera: boolean) => {
    const picked = fromCamera
      ? await imagePickerService.pickFromCamera()
      : await imagePickerService.pickFromLibrary();
    if (!picked?.uri) return;
    setImageUri(picked.uri);
    setPreview(null);
    setShowCapture(true);
  };

  const runAnalysis = async () => {
    if (!imageUri) {
      Alert.alert('Add a photo', 'Take or upload a picture of your meal first.');
      return;
    }
    setAnalysing(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      setPreview(analyseFoodPhoto({ imageUri, description }));
      setShowCapture(false);
    } finally {
      setAnalysing(false);
    }
  };

  const saveMeal = async () => {
    if (!user || !preview) return;
    setAnalysing(true);
    try {
      await foodLogService.add(user.uid, preview);
      const updated = await applyLifestyleMetricsToWellnessScore(user.uid, activity);
      if (updated) setWellnessScore(updated);
      setImageUri(null);
      setDescription('');
      setPreview(null);
      setShowCapture(true);
      await loadSummary();
    } finally {
      setAnalysing(false);
    }
  };

  const scanAnother = () => {
    setPreview(null);
    setImageUri(null);
    setDescription('');
    setShowCapture(true);
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <ScreenHeader
          title="Food scan"
          subtitle="Photo → full nutrition report"
          onBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {showCapture ? (
          <AppCard style={styles.card}>
            <Text style={styles.help}>
              Snap or upload a meal. Add a short description (optional) — AI estimates macros and
              micronutrients, then shows a full nutritional report.
            </Text>
            <View style={styles.row}>
              <BrandButton
                label="Camera"
                compact
                style={styles.half}
                onPress={() => pickImage(true)}
              />
              <BrandButton
                label="Upload"
                compact
                variant="outline"
                style={styles.half}
                onPress={() => pickImage(false)}
              />
            </View>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.preview} />
            ) : (
              <View style={styles.placeholder}>
                <Ionicons name="camera-outline" size={32} color={Colors.textTertiary} />
                <Text style={styles.placeholderText}>Meal photo appears here</Text>
              </View>
            )}
            <TextInput
              style={styles.input}
              placeholder="e.g. grilled chicken salad with avocado"
              placeholderTextColor={Colors.textTertiary}
              value={description}
              onChangeText={setDescription}
            />
            <BrandButton
              label={analysing ? 'Analysing…' : 'Analyse meal'}
              loading={analysing}
              onPress={runAnalysis}
              disabled={!imageUri || analysing}
            />
          </AppCard>
        ) : null}

        {mealReport && preview ? (
          <View style={styles.reportBlock}>
            {imageUri ? (
              <View style={styles.mealHero}>
                <Image source={{ uri: imageUri }} style={styles.mealThumb} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.resultTitle}>{preview.label}</Text>
                  <Text style={styles.confidence}>
                    {preview.macros.calories} kcal · Confidence{' '}
                    {Math.round(preview.confidence * 100)}%
                  </Text>
                </View>
              </View>
            ) : null}
            <NutritionReportCard report={mealReport} />
            <BrandButton label="Save to today’s log" onPress={saveMeal} loading={analysing} />
            <BrandButton label="Scan another meal" variant="outline" onPress={scanAnother} />
          </View>
        ) : null}

        {summary && summary.entries.length > 0 && !preview ? (
          <View style={styles.reportBlock}>
            <Text style={styles.sectionTitle}>Today’s report</Text>
            <Text style={styles.quality}>
              Score {summary.nutritionScore.toFixed(1)}/10 · {summary.qualityLabel}
            </Text>
            <NutritionReportCard report={summary.report} />
            {summary.entries.map((e) => (
              <View key={e.id} style={styles.logRow}>
                <Image source={{ uri: e.imageUri }} style={styles.thumb} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.logTitle}>{e.label}</Text>
                  <Text style={styles.logSub}>
                    {e.macros.calories} kcal · P {e.macros.proteinG}g · C {e.macros.carbsG}g · F{' '}
                    {e.macros.fatG}g
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={async () => {
                    if (!user) return;
                    await foodLogService.remove(user.uid, e.id);
                    await loadSummary();
                  }}
                  hitSlop={8}
                >
                  <Ionicons name="trash-outline" size={18} color={Colors.error} />
                </TouchableOpacity>
              </View>
            ))}
            <BrandButton label="Log another meal" onPress={scanAnother} />
          </View>
        ) : null}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#EDEAF7' },
  header: { paddingHorizontal: Spacing.base, paddingTop: Spacing.sm },
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing['2xl'] },
  card: { gap: Spacing.md },
  help: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  row: { flexDirection: 'row', gap: Spacing.sm },
  half: { flex: 1 },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: Radius.lg,
    backgroundColor: Colors.borderLight,
  },
  placeholder: {
    height: 160,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.white,
  },
  placeholderText: { fontSize: Typography.size.sm, color: Colors.textTertiary },
  input: {
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: Typography.size.sm,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  reportBlock: { gap: Spacing.md },
  mealHero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: Spacing.sm,
  },
  mealThumb: { width: 64, height: 64, borderRadius: 14 },
  resultTitle: { fontSize: Typography.size.lg, fontWeight: '800', color: Colors.text },
  confidence: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 4 },
  sectionTitle: { fontSize: Typography.size.lg, fontWeight: '800', color: Colors.text },
  quality: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: -4 },
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: Spacing.sm,
  },
  thumb: { width: 44, height: 44, borderRadius: 10, backgroundColor: Colors.borderLight },
  logTitle: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text },
  logSub: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
});
