// src/screens/health/ConditionHubScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppScreen from '../../components/common/AppScreen';
import { AppCard } from '../../components/ui';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { Screen } from '../../navigation/screenNames';
import { HEALTH_CONDITIONS, CONDITION_CATEGORIES, type HealthCondition } from '../../data/healthConditions';

export default function ConditionHubScreen() {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConditions = HEALTH_CONDITIONS.filter(condition => {
    const matchesCategory = selectedCategory === 'all' || condition.category === selectedCategory;
    const matchesSearch = condition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         condition.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         condition.keySymptoms.some(symptom => 
                           symptom.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    return matchesCategory && matchesSearch;
  });

  const handleConditionPress = (condition: HealthCondition) => {
    navigation.navigate(Screen.conditionDetail, { conditionId: condition.id });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return Colors.success;
      case 'moderate': return Colors.warning;
      case 'severe': return Colors.error;
      default: return Colors.textSecondary;
    }
  };

  const getCategoryColor = (category: string) => {
    const categoryData = CONDITION_CATEGORIES.find(c => c.id === category);
    return categoryData?.color || Colors.textSecondary;
  };

  const renderConditionCard = (condition: HealthCondition) => (
    <TouchableOpacity
      key={condition.id}
      style={styles.conditionCard}
      onPress={() => handleConditionPress(condition)}
      activeOpacity={0.8}
    >
      <View style={styles.conditionHeader}>
        <View style={[styles.conditionIcon, { backgroundColor: condition.color + '20' }]}>
          <Ionicons name={condition.icon as any} size={24} color={condition.color} />
        </View>
        <View style={styles.conditionMeta}>
          <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(condition.severity) + '20' }]}>
            <Text style={[styles.severityText, { color: getSeverityColor(condition.severity) }]}>
              {condition.severity}
            </Text>
          </View>
          <Text style={styles.prevalenceText}>{condition.prevalence}</Text>
        </View>
      </View>

      <Text style={styles.conditionTitle}>{condition.name}</Text>
      <Text style={styles.conditionDescription}>{condition.description}</Text>

      <View style={styles.symptomsSection}>
        <Text style={styles.symptomsTitle}>Key Symptoms:</Text>
        <View style={styles.symptomsList}>
          {condition.keySymptoms.slice(0, 3).map((symptom, index) => (
            <View key={index} style={styles.symptomItem}>
              <Ionicons name="chevron-forward" size={12} color={Colors.textTertiary} />
              <Text style={styles.symptomText}>{symptom}</Text>
            </View>
          ))}
          {condition.keySymptoms.length > 3 && (
            <Text style={styles.moreSymptomsText}>+{condition.keySymptoms.length - 3} more</Text>
          )}
        </View>
      </View>

      <View style={styles.conditionFooter}>
        <View style={styles.categoryBadge}>
          <Text style={[styles.categoryText, { color: getCategoryColor(condition.category) }]}>
            {condition.category}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Health Conditions</Text>
          <Text style={styles.subtitle}>Comprehensive information about common health conditions</Text>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={Colors.textTertiary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search conditions, symptoms..."
              placeholderTextColor={Colors.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.categorySection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryTabs}>
              <TouchableOpacity
                style={[
                  styles.categoryTab,
                  selectedCategory === 'all' && styles.categoryTabActive,
                ]}
                onPress={() => setSelectedCategory('all')}
              >
                <Text style={[
                  styles.categoryTabText,
                  selectedCategory === 'all' && styles.categoryTabTextActive,
                ]}>
                  All Conditions
                </Text>
              </TouchableOpacity>
              {CONDITION_CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryTab,
                    selectedCategory === category.id && styles.categoryTabActive,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text style={[
                    styles.categoryTabText,
                    selectedCategory === category.id && styles.categoryTabTextActive,
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.statsSection}>
          <AppCard style={styles.statsCard}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{HEALTH_CONDITIONS.length}</Text>
                <Text style={styles.statLabel}>Total Conditions</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {HEALTH_CONDITIONS.filter(c => c.severity === 'severe').length}
                </Text>
                <Text style={styles.statLabel}>Severe</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {HEALTH_CONDITIONS.filter(c => c.category === 'mental').length}
                </Text>
                <Text style={styles.statLabel}>Mental Health</Text>
              </View>
            </View>
          </AppCard>
        </View>

        <View style={styles.conditionsSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Conditions' : 
             CONDITION_CATEGORIES.find(c => c.id === selectedCategory)?.name}
          </Text>
          {filteredConditions.length === 0 ? (
            <AppCard style={styles.emptyCard}>
              <Ionicons name="search-outline" size={48} color={Colors.textTertiary} />
              <Text style={styles.emptyTitle}>No conditions found</Text>
              <Text style={styles.emptyText}>Try adjusting your search or category filter</Text>
            </AppCard>
          ) : (
            filteredConditions.map(renderConditionCard)
          )}
        </View>

        <AppCard style={styles.disclaimerCard}>
          <View style={styles.disclaimerHeader}>
            <Ionicons name="information-circle-outline" size={20} color={Colors.warning} />
            <Text style={styles.disclaimerTitle}>Medical Disclaimer</Text>
          </View>
          <Text style={styles.disclaimerText}>
            This information is for educational purposes only and should not replace professional medical advice. Always consult with healthcare providers for diagnosis and treatment.
          </Text>
        </AppCard>
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
  searchSection: {
    marginBottom: Spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.size.base,
    color: Colors.text,
  },
  categorySection: {
    marginBottom: Spacing.sm,
  },
  categoryTabs: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  categoryTab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    backgroundColor: Colors.backgroundSecondary,
  },
  categoryTabActive: {
    backgroundColor: Colors.primary,
  },
  categoryTabText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  categoryTabTextActive: {
    color: Colors.white,
  },
  statsSection: {
    marginBottom: Spacing.sm,
  },
  statsCard: {
    padding: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.borderLight,
  },
  conditionsSection: {
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  conditionCard: {
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
    gap: Spacing.md,
  },
  conditionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  conditionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conditionMeta: {
    alignItems: 'flex-end',
    gap: Spacing.xs,
  },
  severityBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
  },
  severityText: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
  },
  prevalenceText: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
  },
  conditionTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  conditionDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  symptomsSection: {
    gap: Spacing.xs,
  },
  symptomsTitle: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  symptomsList: {
    gap: Spacing.xs,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  symptomText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  moreSymptomsText: {
    fontSize: Typography.size.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  conditionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  categoryBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
    backgroundColor: Colors.backgroundSecondary,
  },
  categoryText: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
  },
  emptyCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  emptyTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  emptyText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  disclaimerCard: {
    gap: Spacing.sm,
  },
  disclaimerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  disclaimerTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  disclaimerText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
