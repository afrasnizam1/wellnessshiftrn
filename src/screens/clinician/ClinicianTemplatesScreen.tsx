import React, { useMemo, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { ClinicianTheme, ClinicianType } from '../../theme/clinicianTheme';
import AppScreen from '../../components/common/AppScreen';
import {
  CARE_PLAN_TEMPLATES,
  TEMPLATE_COLOR,
  searchCarePlanCategories,
  templatesForCategory,
  type CarePlanTemplate,
  type CarePlanTemplateCategory,
} from '../../data/carePlanTemplates';
import { useAppStore } from '../../store';
import { clinicianService } from '../../services/clinicianService';

export default function ClinicianTemplatesScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CarePlanTemplateCategory | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<CarePlanTemplate | null>(null);

  const filteredCategories = useMemo(
    () => searchCarePlanCategories(searchText),
    [searchText],
  );

  const useWithPatient = async (templateId: string) => {
    if (!user) return;
    try {
      const patients = await clinicianService.fetchLinkedPatients(user.uid);
      if (patients.length === 0) {
        Alert.alert('Add a patient first', 'Link a patient before applying a care plan template.', [
          { text: 'Add patient', onPress: () => navigation.navigate(Screen.addPatient) },
          { text: 'OK', style: 'cancel' },
        ]);
        return;
      }
      navigation.navigate(Screen.createCarePlan, {
        ...(patients.length === 1 ? { patient: patients[0] } : {}),
        templateId,
      });
    } catch {
      Alert.alert('Error', 'Could not load patients.');
    }
  };

  const onBack = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
      return;
    }
    navigation.goBack();
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {selectedCategory ? selectedCategory.name : 'Care Plan Templates'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {!selectedCategory ? (
          <>
            <Text style={styles.hero}>Care Plan Templates</Text>
            <Text style={styles.intro}>
              Browse body-system templates, then apply one to a patient.
            </Text>

            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color={Colors.textTertiary} />
              <TextInput
                style={styles.searchInput}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search templates…"
                placeholderTextColor={Colors.textTertiary}
                autoCorrect={false}
              />
              {searchText ? (
                <TouchableOpacity onPress={() => setSearchText('')} hitSlop={8}>
                  <Ionicons name="close-circle" size={18} color={Colors.textTertiary} />
                </TouchableOpacity>
              ) : null}
            </View>

            {filteredCategories.length === 0 ? (
              <View style={styles.emptySearch}>
                <Ionicons name="search" size={40} color={Colors.textTertiary} />
                <Text style={styles.emptyTitle}>No templates found</Text>
                <Text style={styles.intro}>Try a different search term</Text>
              </View>
            ) : (
              <View style={styles.categoryGrid}>
                {filteredCategories.map((cat) => {
                  const color = TEMPLATE_COLOR[cat.colorKey];
                  return (
                    <TouchableOpacity
                      key={cat.name}
                      style={styles.categoryCard}
                      onPress={() => {
                        const templates = templatesForCategory(cat);
                        if (templates.length === 1) {
                          setPreviewTemplate(templates[0]);
                        } else {
                          setSelectedCategory(cat);
                        }
                      }}
                      activeOpacity={0.85}
                    >
                      <View style={[styles.categoryIconBg, { backgroundColor: color + '22' }]}>
                        <Ionicons name={cat.icon as any} size={26} color={color} />
                      </View>
                      <Text style={styles.categoryName} numberOfLines={2}>
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            <Text style={[styles.sectionLabel, { marginTop: Spacing.md }]}>
              All templates ({CARE_PLAN_TEMPLATES.length})
            </Text>
            {CARE_PLAN_TEMPLATES.slice(0, 6).map((t) => {
              const color = TEMPLATE_COLOR[t.colorKey];
              return (
                <TouchableOpacity
                  key={t.id}
                  style={styles.listRow}
                  onPress={() => setPreviewTemplate(t)}
                  activeOpacity={0.85}
                >
                  <View style={[styles.listIcon, { backgroundColor: color + '22' }]}>
                    <Ionicons name={t.icon as any} size={22} color={color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.listTitle}>{t.title}</Text>
                    <Text style={styles.listDesc} numberOfLines={1}>
                      {t.shortDescription}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
                </TouchableOpacity>
              );
            })}
          </>
        ) : (
          <>
            {templatesForCategory(selectedCategory).map((t) => {
              const color = TEMPLATE_COLOR[t.colorKey];
              return (
                <TouchableOpacity
                  key={t.id}
                  style={styles.listRow}
                  onPress={() => setPreviewTemplate(t)}
                  activeOpacity={0.85}
                >
                  <View style={[styles.listIconLarge, { backgroundColor: color + '22' }]}>
                    <Ionicons name={t.icon as any} size={26} color={color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.listTitle}>{t.title}</Text>
                    <Text style={styles.listDesc} numberOfLines={2}>
                      {t.purpose}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
                </TouchableOpacity>
              );
            })}
          </>
        )}
      </ScrollView>

      <Modal
        visible={Boolean(previewTemplate)}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setPreviewTemplate(null)}
      >
        {previewTemplate ? (
          <AppScreen style={styles.safe}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => setPreviewTemplate(null)}
                style={styles.backBtn}
              >
                <Text style={styles.backText}>‹</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Template Preview</Text>
              <View style={{ width: 40 }} />
            </View>
            <ScrollView contentContainerStyle={styles.content}>
              <PreviewBody template={previewTemplate} />
              <TouchableOpacity
                style={[
                  styles.useBtn,
                  { backgroundColor: TEMPLATE_COLOR[previewTemplate.colorKey] },
                ]}
                onPress={() => {
                  const id = previewTemplate.id;
                  setPreviewTemplate(null);
                  useWithPatient(id);
                }}
              >
                <Text style={styles.useBtnText}>Use with patient →</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setPreviewTemplate(null)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </AppScreen>
        ) : null}
      </Modal>
    </AppScreen>
  );
}

function PreviewBody({ template }: { template: CarePlanTemplate }) {
  const color = TEMPLATE_COLOR[template.colorKey];
  return (
    <>
      <View style={styles.previewHero}>
        <View style={[styles.previewIcon, { backgroundColor: color + '22' }]}>
          <Ionicons name={template.icon as any} size={40} color={color} />
        </View>
        <Text style={styles.previewTitle}>{template.title}</Text>
        <Text style={styles.previewPurpose}>{template.purpose}</Text>
      </View>
      <Text style={styles.sectionLabel}>Used for</Text>
      {template.usedFor.map((item) => (
        <View key={item} style={styles.usedForRow}>
          <Ionicons name="checkmark-circle" size={18} color={color} />
          <Text style={styles.usedForText}>{item}</Text>
        </View>
      ))}
      <Text style={[styles.sectionLabel, { marginTop: Spacing.base }]}>What&apos;s included</Text>
      <View style={styles.blocksCard}>
        {template.tasks.map((block) => (
          <View key={block} style={styles.taskRow}>
            <Ionicons name="checkmark-circle" size={18} color={color} />
            <Text style={styles.taskText}>{block}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: ClinicianTheme.canvas },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: ClinicianTheme.accent, lineHeight: 38 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing.xl * 2 },
  hero: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.4,
  },
  intro: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20, marginTop: -8 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.size.base,
    color: Colors.text,
    paddingVertical: Spacing.xs,
  },
  emptySearch: { alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.sm },
  emptyTitle: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '31%',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.sm,
    alignItems: 'center',
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  categoryIconBg: {
    width: '100%',
    height: 64,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    minHeight: 28,
  },
  sectionLabel: { ...ClinicianType.sectionTitle },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    ...Shadow.sm,
  },
  listIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listIconLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  listDesc: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: 2 },
  previewHero: { alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.md },
  previewIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
  },
  previewPurpose: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.md,
  },
  usedForRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  usedForText: { flex: 1, fontSize: Typography.size.sm, color: Colors.text },
  blocksCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    gap: Spacing.xs,
    ...Shadow.sm,
  },
  taskRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: 4 },
  taskText: { flex: 1, fontSize: Typography.size.sm, color: Colors.text },
  useBtn: {
    borderRadius: Radius.xl,
    paddingVertical: Spacing.base,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  useBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.base },
  cancelBtn: { alignItems: 'center', paddingVertical: Spacing.md },
  cancelText: { color: Colors.textSecondary, fontWeight: '600' },
});
