// src/screens/health/ConditionDetailScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppScreen from '../../components/common/AppScreen';
import { AppCard } from '../../components/ui';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { Screen } from '../../navigation/screenNames';
import { HEALTH_CONDITIONS, type HealthCondition } from '../../data/healthConditions';
import { resolveConditionContent } from '../../data/conditionContentResolver';
import { logger } from '../../utils/logger';

export default function ConditionDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { conditionId } = route.params || {};
  
  const [activeTab, setActiveTab] = useState<'overview' | 'symptoms' | 'treatment' | 'lifestyle' | 'resources'>('overview');
  
  const condition = HEALTH_CONDITIONS.find(c => c.id === conditionId) || HEALTH_CONDITIONS[0];
  const content = resolveConditionContent(conditionId);

  const handleResourcePress = (resource: any) => {
    if (resource.url) {
      Linking.openURL(resource.url).catch(() => {
        Alert.alert('Error', 'Unable to open this resource');
      });
    } else {
      // Handle app-specific resources
      logger.log('Navigate to resource:', resource.type, resource.title);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return Colors.success;
      case 'moderate': return Colors.warning;
      case 'severe': return Colors.error;
      default: return Colors.textSecondary;
    }
  };

  const getTreatmentIcon = (category: string) => {
    switch (category) {
      case 'therapy': return 'people-outline';
      case 'medication': return 'medical-outline';
      case 'lifestyle': return 'fitness-outline';
      case 'surgery': return 'medical-outline';
      default: return 'help-outline';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article': return 'document-text-outline';
      case 'video': return 'play-circle-outline';
      case 'exercise': return 'fitness-outline';
      case 'diet': return 'nutrition-outline';
      case 'support': return 'people-outline';
      default: return 'document-outline';
    }
  };

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      <AppCard style={styles.overviewCard}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overviewText}>{content.overview}</Text>
      </AppCard>

      <AppCard style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Key Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Prevalence:</Text>
          <Text style={styles.infoValue}>{condition.prevalence}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Severity:</Text>
          <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(condition.severity) + '20' }]}>
            <Text style={[styles.severityText, { color: getSeverityColor(condition.severity) }]}>
              {condition.severity}
            </Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Category:</Text>
          <Text style={styles.infoValue}>{condition.category}</Text>
        </View>
      </AppCard>

      <AppCard style={styles.impactCard}>
        <Text style={styles.sectionTitle}>Lifestyle Impact</Text>
        <Text style={styles.impactText}>{condition.lifestyleImpact}</Text>
      </AppCard>

      {condition.relatedConditions.length > 0 && (
        <AppCard style={styles.relatedCard}>
          <Text style={styles.sectionTitle}>Related Conditions</Text>
          <View style={styles.relatedList}>
            {condition.relatedConditions.map((related, index) => (
              <TouchableOpacity
                key={index}
                style={styles.relatedItem}
                onPress={() => navigation.navigate(Screen.conditionDetail, { conditionId: related })}
              >
                <Ionicons name="link-outline" size={16} color={Colors.primary} />
                <Text style={styles.relatedText}>{related.replace('-', ' ')}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </AppCard>
      )}
    </View>
  );

  const renderSymptomsTab = () => (
    <View style={styles.tabContent}>
      <AppCard style={styles.symptomsCard}>
        <Text style={styles.sectionTitle}>Symptoms</Text>
        <View style={styles.symptomsList}>
          {content.symptoms.map((symptom, index) => (
            <View key={index} style={styles.symptomItem}>
              <View style={styles.symptomHeader}>
                <Text style={styles.symptomName}>{symptom.name}</Text>
                <View style={[styles.symptomSeverity, { backgroundColor: getSeverityColor(symptom.severity) + '20' }]}>
                  <Text style={[styles.symptomSeverityText, { color: getSeverityColor(symptom.severity) }]}>
                    {symptom.severity}
                  </Text>
                </View>
              </View>
              <Text style={styles.symptomDescription}>{symptom.description}</Text>
            </View>
          ))}
        </View>
      </AppCard>

      <AppCard style={styles.causesCard}>
        <Text style={styles.sectionTitle}>Causes & Risk Factors</Text>
        <View style={styles.causesList}>
          {content.causes.map((cause, index) => (
            <View key={index} style={styles.causeItem}>
              <Text style={styles.causeType}>{cause.type}</Text>
              <Text style={styles.causeDescription}>{cause.description}</Text>
            </View>
          ))}
        </View>
      </AppCard>

      <AppCard style={styles.diagnosisCard}>
        <Text style={styles.sectionTitle}>Diagnosis</Text>
        <View style={styles.diagnosisList}>
          {content.diagnosis.map((test, index) => (
            <View key={index} style={styles.diagnosisItem}>
              <View style={styles.diagnosisHeader}>
                <Ionicons name="medical-outline" size={20} color={Colors.primary} />
                <Text style={styles.diagnosisTest}>{test.test}</Text>
              </View>
              <Text style={styles.diagnosisDescription}>{test.description}</Text>
              {test.preparation && (
                <View style={styles.preparationSection}>
                  <Text style={styles.preparationLabel}>Preparation:</Text>
                  <Text style={styles.preparationText}>{test.preparation}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </AppCard>
    </View>
  );

  const renderTreatmentTab = () => (
    <View style={styles.tabContent}>
      <AppCard style={styles.treatmentCard}>
        <Text style={styles.sectionTitle}>Treatment Options</Text>
        <View style={styles.treatmentList}>
          {content.treatment.map((treatment, index) => (
            <View key={index} style={styles.treatmentItem}>
              <View style={styles.treatmentHeader}>
                <View style={styles.treatmentIcon}>
                  <Ionicons name={getTreatmentIcon(treatment.category) as any} size={20} color={Colors.white} />
                </View>
                <View style={styles.treatmentInfo}>
                  <Text style={styles.treatmentName}>{treatment.name}</Text>
                  <Text style={styles.treatmentCategory}>{treatment.category}</Text>
                </View>
                <View style={styles.effectivenessBadge}>
                  <Text style={styles.effectivenessText}>{treatment.effectiveness}</Text>
                </View>
              </View>
              <Text style={styles.treatmentDescription}>{treatment.description}</Text>
            </View>
          ))}
        </View>
      </AppCard>

      <AppCard style={styles.managementCard}>
        <Text style={styles.sectionTitle}>Management Strategies</Text>
        <View style={styles.managementList}>
          {condition.managementStrategies.map((strategy, index) => (
            <View key={index} style={styles.managementItem}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
              <Text style={styles.managementText}>{strategy}</Text>
            </View>
          ))}
        </View>
      </AppCard>
    </View>
  );

  const renderLifestyleTab = () => (
    <View style={styles.tabContent}>
      <AppCard style={styles.lifestyleCard}>
        <Text style={styles.sectionTitle}>Lifestyle Recommendations</Text>
        <View style={styles.lifestyleList}>
          {content.lifestyle.map((area, index) => (
            <View key={index} style={styles.lifestyleArea}>
              <View style={styles.lifestyleHeader}>
                <Text style={styles.lifestyleAreaName}>{area.area}</Text>
                <Text style={styles.lifestyleBenefits}>{area.benefits}</Text>
              </View>
              <View style={styles.recommendationsList}>
                {area.recommendations.map((rec, recIndex) => (
                  <View key={recIndex} style={styles.recommendationItem}>
                    <Ionicons name="chevron-forward" size={12} color={Colors.primary} />
                    <Text style={styles.recommendationText}>{rec}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </AppCard>

      <AppCard style={styles.complicationsCard}>
        <Text style={styles.sectionTitle}>Potential Complications</Text>
        <View style={styles.complicationsList}>
          {content.complications.map((complication, index) => (
            <View key={index} style={styles.complicationItem}>
              <View style={styles.complicationHeader}>
                <Ionicons name="warning-outline" size={20} color={Colors.warning} />
                <Text style={styles.complicationName}>{complication.name}</Text>
              </View>
              <Text style={styles.complicationDescription}>{complication.description}</Text>
              <View style={styles.preventionSection}>
                <Text style={styles.preventionLabel}>Prevention:</Text>
                <Text style={styles.preventionText}>{complication.prevention}</Text>
              </View>
            </View>
          ))}
        </View>
      </AppCard>
    </View>
  );

  const renderResourcesTab = () => (
    <View style={styles.tabContent}>
      <AppCard style={styles.resourcesCard}>
        <Text style={styles.sectionTitle}>Resources & Support</Text>
        <View style={styles.resourcesList}>
          {content.resources.map((resource, index) => (
            <TouchableOpacity
              key={index}
              style={styles.resourceItem}
              onPress={() => handleResourcePress(resource)}
            >
              <View style={styles.resourceIcon}>
                <Ionicons name={getResourceIcon(resource.type) as any} size={20} color={Colors.white} />
              </View>
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceTitle}>{resource.title}</Text>
                <Text style={styles.resourceDescription}>{resource.description}</Text>
                <Text style={styles.resourceType}>{resource.type}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>
      </AppCard>

      <AppCard style={styles.emergencyCard}>
        <View style={styles.emergencyHeader}>
          <Ionicons name="call-outline" size={24} color={Colors.error} />
          <Text style={styles.emergencyTitle}>Emergency Support</Text>
        </View>
        <Text style={styles.emergencyText}>
          If you're experiencing severe symptoms or a medical emergency, call emergency services immediately or visit the nearest emergency room.
        </Text>
        <TouchableOpacity style={styles.emergencyButton}>
          <Text style={styles.emergencyButtonText}>Call Emergency Services</Text>
        </TouchableOpacity>
      </AppCard>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverviewTab();
      case 'symptoms': return renderSymptomsTab();
      case 'treatment': return renderTreatmentTab();
      case 'lifestyle': return renderLifestyleTab();
      case 'resources': return renderResourcesTab();
      default: return renderOverviewTab();
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{condition.name}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppCard style={styles.conditionInfoCard}>
          <View style={styles.conditionHeader}>
            <View style={[styles.conditionIcon, { backgroundColor: condition.color + '20' }]}>
              <Ionicons name={condition.icon as any} size={32} color={condition.color} />
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
          <Text style={styles.conditionDescription}>{condition.description}</Text>
        </AppCard>

        <View style={styles.tabsContainer}>
          {(['overview', 'symptoms', 'treatment', 'lifestyle', 'resources'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.tabActive,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderTabContent()}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  backButton: {
    padding: Spacing.sm,
  },
  title: { 
    fontSize: Typography.size['2xl'], 
    fontWeight: '800', 
    color: Colors.text,
  },
  content: { 
    padding: Spacing.base, 
    paddingTop: Spacing.xl, 
    gap: Spacing.md, 
    paddingBottom: Spacing['2xl'] 
  },
  conditionInfoCard: {
    gap: Spacing.md,
  },
  conditionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  conditionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
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
    fontSize: Typography.size.sm,
    color: Colors.textTertiary,
  },
  conditionDescription: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radius.lg,
    padding: Spacing.xs,
    marginBottom: Spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: Radius.md,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.white,
  },
  tabContent: {
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  overviewCard: {
    gap: Spacing.sm,
  },
  overviewText: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  infoCard: {
    gap: Spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: Typography.size.base,
    fontWeight: '600',
    color: Colors.text,
  },
  infoValue: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
  },
  impactCard: {
    gap: Spacing.sm,
  },
  impactText: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  relatedCard: {
    gap: Spacing.sm,
  },
  relatedList: {
    gap: Spacing.sm,
  },
  relatedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  relatedText: {
    fontSize: Typography.size.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  symptomsCard: {
    gap: Spacing.md,
  },
  symptomsList: {
    gap: Spacing.md,
  },
  symptomItem: {
    gap: Spacing.sm,
  },
  symptomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  symptomName: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  symptomSeverity: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
  },
  symptomSeverityText: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
  },
  symptomDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  causesCard: {
    gap: Spacing.md,
  },
  causesList: {
    gap: Spacing.md,
  },
  causeItem: {
    gap: Spacing.sm,
  },
  causeType: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.primary,
  },
  causeDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  diagnosisCard: {
    gap: Spacing.md,
  },
  diagnosisList: {
    gap: Spacing.md,
  },
  diagnosisItem: {
    gap: Spacing.sm,
  },
  diagnosisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  diagnosisTest: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  diagnosisDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  preparationSection: {
    gap: Spacing.xs,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  preparationLabel: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  preparationText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  treatmentCard: {
    gap: Spacing.md,
  },
  treatmentList: {
    gap: Spacing.md,
  },
  treatmentItem: {
    gap: Spacing.sm,
  },
  treatmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  treatmentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  treatmentInfo: {
    flex: 1,
  },
  treatmentName: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  treatmentCategory: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
  },
  effectivenessBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
    backgroundColor: Colors.success + '20',
  },
  effectivenessText: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.success,
  },
  treatmentDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  managementCard: {
    gap: Spacing.md,
  },
  managementList: {
    gap: Spacing.sm,
  },
  managementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  managementText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  lifestyleCard: {
    gap: Spacing.md,
  },
  lifestyleList: {
    gap: Spacing.md,
  },
  lifestyleArea: {
    gap: Spacing.sm,
  },
  lifestyleHeader: {
    gap: Spacing.xs,
  },
  lifestyleAreaName: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  lifestyleBenefits: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  recommendationsList: {
    gap: Spacing.xs,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  recommendationText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  complicationsCard: {
    gap: Spacing.md,
  },
  complicationsList: {
    gap: Spacing.md,
  },
  complicationItem: {
    gap: Spacing.sm,
  },
  complicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  complicationName: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  complicationDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  preventionSection: {
    gap: Spacing.xs,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  preventionLabel: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  preventionText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  resourcesCard: {
    gap: Spacing.md,
  },
  resourcesList: {
    gap: Spacing.sm,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  resourceDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  resourceType: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
  },
  emergencyCard: {
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.error,
    backgroundColor: Colors.error + '5',
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  emergencyTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.error,
  },
  emergencyText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  emergencyButton: {
    backgroundColor: Colors.error,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.base,
  },
});
