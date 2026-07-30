// src/screens/more/CreateChallengeScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppScreen from '../../components/common/AppScreen';
import { AppCard } from '../../components/ui';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { useAppStore } from '../../store';
import { Screen } from '../../navigation/screenNames';
import { socialService } from '../../services/socialService';

interface ChallengeFormData {
  title: string;
  description: string;
  category: string;
  duration: number;
  targetValue: number;
  targetUnit: string;
  isPrivate: boolean;
}

const CATEGORIES = [
  { id: 'fitness', label: 'Fitness', icon: 'fitness-outline' },
  { id: 'nutrition', label: 'Nutrition', icon: 'nutrition-outline' },
  { id: 'mental', label: 'Mental Health', icon: 'happy-outline' },
  { id: 'sleep', label: 'Sleep', icon: 'moon-outline' },
  { id: 'habits', label: 'Habits', icon: 'checkbox-outline' },
  { id: 'general', label: 'General Wellness', icon: 'heart-outline' },
];

const DURATIONS = [
  { days: 7, label: '1 Week' },
  { days: 14, label: '2 Weeks' },
  { days: 21, label: '3 Weeks' },
  { days: 30, label: '1 Month' },
];

const TARGET_UNITS = {
  fitness: ['minutes', 'sessions', 'steps', 'calories'],
  nutrition: ['meals', 'servings', 'glasses', 'calories'],
  mental: ['minutes', 'sessions', 'days'],
  sleep: ['hours', 'days'],
  habits: ['days', 'times', 'sessions'],
  general: ['days', 'times', 'points'],
};

export default function CreateChallengeScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [formData, setFormData] = useState<ChallengeFormData>({
    title: '',
    description: '',
    category: 'general',
    duration: 7,
    targetValue: 1,
    targetUnit: 'days',
    isPrivate: false,
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof ChallengeFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateChallenge = async () => {
    if (!user) return;
    
    if (!formData.title.trim() || !formData.description.trim()) {
      Alert.alert('Missing Info', 'Please fill in all required fields.');
      return;
    }

    if (formData.targetValue < 1) {
      Alert.alert('Invalid Target', 'Target value must be at least 1.');
      return;
    }

    setLoading(true);
    try {
      await socialService.createChallenge({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        duration: formData.duration,
        targetValue: formData.targetValue,
        targetUnit: formData.targetUnit,
        createdBy: user.uid,
        isPrivate: formData.isPrivate,
      });

      Alert.alert(
        'Challenge Created!',
        'Your challenge has been created and is ready for others to join.',
        [
          {
            text: 'View Challenge',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (e) {
      console.warn('Failed to create challenge:', e);
      Alert.alert('Error', 'Failed to create challenge. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = CATEGORIES.find(c => c.id === formData.category);

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Challenge</Text>
          <Text style={styles.subtitle}>Motivate your community with a fun wellness challenge</Text>
        </View>

        <AppCard style={styles.card}>
          <Text style={styles.label}>Challenge Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 30-Day Meditation Journey"
            value={formData.title}
            onChangeText={(text) => updateField('title', text)}
            maxLength={60}
            placeholderTextColor={Colors.textTertiary}
          />
          <Text style={styles.helperText}>{formData.title.length}/60 characters</Text>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe the challenge and how to participate..."
            value={formData.description}
            onChangeText={(text) => updateField('description', text)}
            multiline
            maxLength={200}
            textAlignVertical="top"
            placeholderTextColor={Colors.textTertiary}
          />
          <Text style={styles.helperText}>{formData.description.length}/200 characters</Text>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryOption,
                  formData.category === category.id && styles.categoryOptionSelected,
                ]}
                onPress={() => updateField('category', category.id)}
              >
                <Ionicons
                  name={category.icon as any}
                  size={20}
                  color={formData.category === category.id ? Colors.white : Colors.textSecondary}
                />
                <Text style={[
                  styles.categoryText,
                  formData.category === category.id && styles.categoryTextSelected,
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.label}>Duration</Text>
          <View style={styles.durationRow}>
            {DURATIONS.map((duration) => (
              <TouchableOpacity
                key={duration.days}
                style={[
                  styles.durationOption,
                  formData.duration === duration.days && styles.durationOptionSelected,
                ]}
                onPress={() => updateField('duration', duration.days)}
              >
                <Text style={[
                  styles.durationText,
                  formData.duration === duration.days && styles.durationTextSelected,
                ]}>
                  {duration.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.label}>Target Goal</Text>
          <View style={styles.targetRow}>
            <View style={styles.targetInput}>
              <TextInput
                style={styles.numberInput}
                value={formData.targetValue.toString()}
                onChangeText={(text) => updateField('targetValue', parseInt(text) || 1)}
                keyboardType="numeric"
                maxLength={3}
                placeholderTextColor={Colors.textTertiary}
              />
            </View>
            <View style={styles.unitSelector}>
              <Text style={styles.unitLabel}>per</Text>
              {TARGET_UNITS[formData.category as keyof typeof TARGET_UNITS].map((unit) => (
                <TouchableOpacity
                  key={unit}
                  style={[
                    styles.unitOption,
                    formData.targetUnit === unit && styles.unitOptionSelected,
                  ]}
                  onPress={() => updateField('targetUnit', unit)}
                >
                  <Text style={[
                    styles.unitText,
                    formData.targetUnit === unit && styles.unitTextSelected,
                  ]}>
                    {unit}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <Text style={styles.helperText}>
            Complete {formData.targetValue} {formData.targetUnit} for {formData.duration} days
          </Text>
        </AppCard>

        <AppCard style={styles.card}>
          <View style={styles.privacyRow}>
            <View style={styles.privacyInfo}>
              <Text style={styles.label}>Privacy</Text>
              <Text style={styles.privacyText}>
                {formData.isPrivate 
                  ? 'Only invited friends can join this challenge' 
                  : 'Anyone in the community can join this challenge'
                }
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.toggle,
                formData.isPrivate && styles.toggleActive,
              ]}
              onPress={() => updateField('isPrivate', !formData.isPrivate)}
            >
              <View style={[
                styles.toggleThumb,
                formData.isPrivate && styles.toggleThumbActive,
              ]} />
            </TouchableOpacity>
          </View>
        </AppCard>

        <AppCard style={styles.previewCard}>
          <Text style={styles.previewTitle}>Challenge Preview</Text>
          <View style={styles.previewContent}>
            <View style={styles.previewHeader}>
              <View style={styles.previewCategory}>
                <Ionicons
                  name={selectedCategory?.icon as any}
                  size={16}
                  color={Colors.white}
                />
                <Text style={styles.previewCategoryText}>
                  {selectedCategory?.label}
                </Text>
              </View>
              <Text style={styles.previewDuration}>
                {DURATIONS.find(d => d.days === formData.duration)?.label}
              </Text>
            </View>
            <Text style={styles.previewTitleText}>{formData.title || 'Challenge Title'}</Text>
            <Text style={styles.previewDescription}>
              {formData.description || 'Challenge description...'}
            </Text>
            <View style={styles.previewTarget}>
              <Text style={styles.previewTargetText}>
                Target: {formData.targetValue} {formData.targetUnit} per day
              </Text>
            </View>
          </View>
        </AppCard>

        <TouchableOpacity
          style={[styles.createButton, loading && styles.createButtonDisabled]}
          onPress={handleCreateChallenge}
          disabled={loading}
        >
          {loading ? (
            <Text style={styles.createButtonText}>Creating...</Text>
          ) : (
            <Text style={styles.createButtonText}>Create Challenge</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { 
    padding: Spacing.base, 
    paddingTop: Spacing.xl, 
    gap: Spacing.md, 
    paddingBottom: Spacing['2xl'] 
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: { 
    fontSize: Typography.size['2xl'], 
    fontWeight: '800', 
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  card: {
    gap: Spacing.sm,
  },
  label: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    fontSize: Typography.size.base,
    color: Colors.text,
  },
  textArea: {
    minHeight: 80,
  },
  helperText: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
    textAlign: 'right',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    backgroundColor: Colors.background,
  },
  categoryOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  categoryTextSelected: {
    color: Colors.white,
  },
  durationRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  durationOption: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    alignItems: 'center',
  },
  durationOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  durationText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  durationTextSelected: {
    color: Colors.white,
  },
  targetRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'center',
  },
  targetInput: {
    width: 80,
  },
  numberInput: {
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    fontSize: Typography.size.base,
    color: Colors.text,
    textAlign: 'center',
  },
  unitSelector: {
    flex: 1,
  },
  unitLabel: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  unitOption: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    marginRight: Spacing.sm,
    marginBottom: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.md,
    alignSelf: 'flex-start',
  },
  unitOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  unitText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  unitTextSelected: {
    color: Colors.white,
  },
  privacyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  privacyInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  privacyText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  toggle: {
    width: 48,
    height: 28,
    backgroundColor: Colors.borderLight,
    borderRadius: 14,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: Colors.primary,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 2,
  },
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  },
  previewCard: {
    gap: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.backgroundSecondary,
  },
  previewTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  previewContent: {
    gap: Spacing.sm,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
  },
  previewCategoryText: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.white,
  },
  previewDuration: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
  },
  previewTitleText: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  previewDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  previewTarget: {
    backgroundColor: Colors.white,
    padding: Spacing.sm,
    borderRadius: Radius.md,
  },
  previewTargetText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.primary,
  },
  createButton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  createButtonDisabled: {
    backgroundColor: Colors.borderLight,
  },
  createButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.base,
  },
});
