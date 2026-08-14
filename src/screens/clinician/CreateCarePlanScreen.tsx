import React, { useEffect, useMemo, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { ClinicianTheme, ClinicianType } from '../../theme/clinicianTheme';
import type { ClinicianStackParamList, PatientSummary } from '../../types';
import { useAppStore } from '../../store';
import { clinicianService } from '../../services/clinicianService';
import AppScreen from '../../components/common/AppScreen';
import {
  BLANK_CARE_PLAN,
  COMPREHENSIVE_CARE_PLAN,
  TEMPLATE_COLOR,
  getCarePlanTemplate,
  getCarePlanTemplates,
  mergeCarePlanTemplates,
  searchCarePlanCategories,
  templatesForCategory,
  type CarePlanTemplate,
  type CarePlanTemplateCategory,
} from '../../data/carePlanTemplates';

type Route = RouteProp<ClinicianStackParamList, typeof Screen.createCarePlan>;
type Step = 'hub' | 'templates' | 'edit';

type PlanSeed = {
  title: string;
  description: string;
  tasks: string[];
};

function seedFromRouteParams(
  templateId?: string,
  templateIds?: string[],
): { step: Step; seed: PlanSeed | null } {
  const multi = templateIds?.filter(Boolean) ?? [];
  if (multi.length > 0) {
    const templates = getCarePlanTemplates(multi);
    if (templates.length > 0) {
      return { step: 'edit', seed: mergeCarePlanTemplates(templates) };
    }
  }
  if (!templateId) return { step: 'hub', seed: null };
  if (templateId === BLANK_CARE_PLAN.id) {
    return {
      step: 'edit',
      seed: {
        title: BLANK_CARE_PLAN.title,
        description: BLANK_CARE_PLAN.description,
        tasks: [...BLANK_CARE_PLAN.tasks],
      },
    };
  }
  if (templateId === COMPREHENSIVE_CARE_PLAN.id) {
    return {
      step: 'edit',
      seed: {
        title: COMPREHENSIVE_CARE_PLAN.title,
        description: COMPREHENSIVE_CARE_PLAN.description,
        tasks: [...COMPREHENSIVE_CARE_PLAN.tasks],
      },
    };
  }
  const t = getCarePlanTemplate(templateId);
  if (t) {
    return {
      step: 'edit',
      seed: { title: t.title, description: t.purpose, tasks: [...t.tasks] },
    };
  }
  return { step: 'hub', seed: null };
}

export default function CreateCarePlanScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<Route>();
  const { patient: routePatient, templateId, templateIds: routeTemplateIds } = route.params ?? {};
  const { user } = useAppStore();

  const initialFromRoute = useMemo(
    () => seedFromRouteParams(templateId, routeTemplateIds),
    [templateId, routeTemplateIds],
  );

  const [step, setStep] = useState<Step>(initialFromRoute.step);
  const [planName, setPlanName] = useState(initialFromRoute.seed?.title ?? '');
  const [description, setDescription] = useState(initialFromRoute.seed?.description ?? '');
  const [personalNote, setPersonalNote] = useState('');
  const [tasks, setTasks] = useState<string[]>(initialFromRoute.seed?.tasks ?? []);
  const [newTask, setNewTask] = useState('');
  const [saving, setSaving] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CarePlanTemplateCategory | null>(null);
  const [selectedTemplateIds, setSelectedTemplateIds] = useState<string[]>([]);
  const [previewTemplate, setPreviewTemplate] = useState<CarePlanTemplate | null>(null);
  const [editCameFromTemplates, setEditCameFromTemplates] = useState(false);
  const enteredWithTemplate = Boolean(templateId || (routeTemplateIds && routeTemplateIds.length > 0));

  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientSummary | null>(routePatient ?? null);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [patientPickerOpen, setPatientPickerOpen] = useState(false);
  const [patientSearch, setPatientSearch] = useState('');

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    setPatientsLoading(true);
    clinicianService
      .fetchLinkedPatients(user.uid)
      .then((list) => {
        if (cancelled) return;
        setPatients(list);
        setSelectedPatient((prev) => {
          if (prev && list.some((p) => p.uid === prev.uid)) return prev;
          if (routePatient && list.some((p) => p.uid === routePatient.uid)) return routePatient;
          return prev;
        });
      })
      .catch(() => {
        if (!cancelled) setPatients([]);
      })
      .finally(() => {
        if (!cancelled) setPatientsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.uid, routePatient?.uid]);

  const filteredPatients = useMemo(() => {
    const q = patientSearch.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter(
      (p) =>
        p.displayName.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q),
    );
  }, [patients, patientSearch]);

  const filteredCategories = useMemo(
    () => searchCarePlanCategories(searchText),
    [searchText],
  );

  const applySeed = (seed: PlanSeed, fromTemplates = false) => {
    setPlanName(seed.title);
    setDescription(seed.description);
    setTasks([...seed.tasks]);
    setPersonalNote('');
    setEditCameFromTemplates(fromTemplates);
    setStep('edit');
  };

  const applyTemplate = (template: CarePlanTemplate) => {
    setPreviewTemplate(null);
    setSelectedTemplateIds([]);
    applySeed(
      {
        title: template.title,
        description: template.purpose,
        tasks: [...template.tasks],
      },
      true,
    );
  };

  const toggleTemplateId = (id: string) => {
    setSelectedTemplateIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleCategorySelection = (cat: CarePlanTemplateCategory) => {
    const templates = templatesForCategory(cat);
    if (templates.length === 0) return;
    if (templates.length === 1) {
      toggleTemplateId(templates[0].id);
      return;
    }
    setSelectedCategory(cat);
  };

  const continueWithSelected = () => {
    const templates = getCarePlanTemplates(selectedTemplateIds);
    if (templates.length === 0) return;
    setPreviewTemplate(null);
    applySeed(mergeCarePlanTemplates(templates), true);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((t) => [...t, newTask.trim()]);
    setNewTask('');
  };

  const save = async () => {
    if (!user || !planName.trim()) {
      Alert.alert('Plan name required', 'Enter a name for this care plan.');
      return;
    }
    if (!selectedPatient) {
      Alert.alert('Select a patient', 'Choose who should receive this care plan.');
      setPatientPickerOpen(true);
      return;
    }
    if (tasks.length === 0) {
      Alert.alert('Add tasks', 'Include at least one task or plan block.');
      return;
    }
    setSaving(true);
    try {
      await clinicianService.createCustomCarePlan({
        clinicianId: user.uid,
        clinicianName: user.displayName,
        patientId: selectedPatient.uid,
        planName: planName.trim(),
        description: description.trim() || 'Care plan from your clinician.',
        personalNote: personalNote.trim() || undefined,
        taskTitles: tasks,
      });
      Alert.alert('Sent', `Care plan sent to ${selectedPatient.displayName}.`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert('Error', 'Could not save care plan.');
    } finally {
      setSaving(false);
    }
  };

  const onBack = () => {
    if (step === 'edit' && !enteredWithTemplate) {
      setStep(editCameFromTemplates ? 'templates' : 'hub');
      return;
    }
    if (step === 'templates') {
      if (selectedCategory) {
        setSelectedCategory(null);
        return;
      }
      setSearchText('');
      setSelectedTemplateIds([]);
      setStep('hub');
      return;
    }
    navigation.goBack();
  };

  const headerTitle =
    step === 'hub'
      ? 'Create Care Plan'
      : step === 'templates'
        ? selectedCategory
          ? selectedCategory.name
          : 'Templates'
        : 'Send care plan';

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} accessibilityRole="button">
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        <View style={{ width: 40 }} />
      </View>

      <PatientSelector
        patient={selectedPatient}
        loading={patientsLoading}
        required={!selectedPatient}
        onPress={() => {
          setPatientSearch('');
          setPatientPickerOpen(true);
        }}
      />

      {step === 'hub' ? (
        <HubStep
          patientName={selectedPatient?.displayName}
          onFitnessHub={() => {
            if (!selectedPatient) {
              Alert.alert('Select a patient', 'Choose a patient before assigning Fitness Hub modules.');
              setPatientPickerOpen(true);
              return;
            }
            navigation.navigate(Screen.fitnessRecommendations, { patient: selectedPatient });
          }}
        />
      ) : null}

      {step === 'templates' ? (
        <View style={styles.templatesPane}>
          <TemplatesStep
            searchText={searchText}
            onSearchChange={setSearchText}
            filteredCategories={filteredCategories}
            selectedCategory={selectedCategory}
            selectedTemplateIds={selectedTemplateIds}
            onToggleCategory={toggleCategorySelection}
            onToggleTemplate={toggleTemplateId}
            onPreview={setPreviewTemplate}
            footerInset={selectedTemplateIds.length > 0}
          />
          {selectedTemplateIds.length > 0 ? (
            <View style={styles.selectionFooter}>
              <TouchableOpacity
                onPress={() => setSelectedTemplateIds([])}
                hitSlop={8}
                accessibilityRole="button"
              >
                <Text style={styles.clearSelection}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.continueBtn}
                onPress={continueWithSelected}
                activeOpacity={0.88}
              >
                <Text style={styles.continueBtnText}>
                  {selectedTemplateIds.length === 1
                    ? 'Continue with 1 template'
                    : `Continue with ${selectedTemplateIds.length} templates`}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      ) : null}

      {step === 'edit' ? (
        <EditStep
          patientName={selectedPatient?.displayName}
          planName={planName}
          setPlanName={setPlanName}
          description={description}
          setDescription={setDescription}
          personalNote={personalNote}
          setPersonalNote={setPersonalNote}
          tasks={tasks}
          setTasks={setTasks}
          newTask={newTask}
          setNewTask={setNewTask}
          onAddTask={addTask}
          saving={saving}
          onSave={save}
        />
      ) : null}

      <Modal
        visible={Boolean(previewTemplate)}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setPreviewTemplate(null)}
      >
        {previewTemplate ? (
          <TemplatePreview
            template={previewTemplate}
            isSelected={selectedTemplateIds.includes(previewTemplate.id)}
            onToggleSelect={() => {
              toggleTemplateId(previewTemplate.id);
              setPreviewTemplate(null);
            }}
            onUseAlone={() => applyTemplate(previewTemplate)}
            onClose={() => setPreviewTemplate(null)}
          />
        ) : null}
      </Modal>

      <Modal
        visible={patientPickerOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setPatientPickerOpen(false)}
      >
        <AppScreen style={styles.safe}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setPatientPickerOpen(false)}
              style={styles.backBtn}
            >
              <Text style={styles.backText}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Select patient</Text>
            <View style={{ width: 40 }} />
          </View>
          <View style={styles.patientSearchWrap}>
            <Ionicons name="search-outline" size={18} color={Colors.textSecondary} />
            <TextInput
              style={styles.patientSearchInput}
              placeholder="Search by name or email"
              placeholderTextColor={Colors.textTertiary}
              value={patientSearch}
              onChangeText={setPatientSearch}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
            />
          </View>
          {patientsLoading ? (
            <ActivityIndicator style={{ marginTop: Spacing.xl }} color={ClinicianTheme.accent} />
          ) : (
            <FlatList
              data={filteredPatients}
              keyExtractor={(p) => p.uid}
              contentContainerStyle={styles.patientList}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <View style={styles.patientEmpty}>
                  <Text style={styles.patientEmptyTitle}>No patients found</Text>
                  <Text style={styles.patientEmptyHint}>
                    {patientSearch
                      ? 'Try a different search.'
                      : 'Link a patient from the dashboard first.'}
                  </Text>
                </View>
              }
              renderItem={({ item }) => {
                const selected = selectedPatient?.uid === item.uid;
                return (
                  <TouchableOpacity
                    style={[styles.patientRow, selected && styles.patientRowSelected]}
                    onPress={() => {
                      setSelectedPatient(item);
                      setPatientPickerOpen(false);
                    }}
                    activeOpacity={0.85}
                  >
                    <View style={styles.patientAvatar}>
                      <Text style={styles.patientAvatarText}>
                        {item.displayName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.patientCopy}>
                      <Text style={styles.patientName} numberOfLines={1}>
                        {item.displayName}
                      </Text>
                      <Text style={styles.patientEmail} numberOfLines={1}>
                        {item.email}
                      </Text>
                    </View>
                    {selected ? (
                      <Ionicons name="checkmark-circle" size={22} color={ClinicianTheme.accent} />
                    ) : (
                      <Ionicons name="ellipse-outline" size={22} color={Colors.border} />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </AppScreen>
      </Modal>
    </AppScreen>
  );
}

function PatientSelector({
  patient,
  loading,
  required,
  onPress,
}: {
  patient: PatientSummary | null;
  loading: boolean;
  required: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.patientSelector, required && styles.patientSelectorRequired]}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={patient ? `Patient ${patient.displayName}` : 'Select patient'}
    >
      <View style={styles.patientSelectorIcon}>
        <Ionicons name="person" size={18} color={ClinicianTheme.accent} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.patientSelectorLabel}>
          {required ? 'Select patient *' : 'Sending to'}
        </Text>
        {loading && !patient ? (
          <Text style={styles.patientSelectorValue}>Loading patients…</Text>
        ) : (
          <Text style={styles.patientSelectorValue} numberOfLines={1}>
            {patient ? patient.displayName : 'Tap to choose a linked patient'}
          </Text>
        )}
        {patient?.email ? (
          <Text style={styles.patientSelectorEmail} numberOfLines={1}>
            {patient.email}
          </Text>
        ) : null}
      </View>
      <Ionicons name="chevron-down" size={18} color={Colors.textSecondary} />
    </TouchableOpacity>
  );
}

function HubStep({
  patientName,
  onFitnessHub,
}: {
  patientName?: string;
  onFitnessHub: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.hubHero}>
        <View style={styles.hubIconWrap}>
          <Ionicons name="barbell" size={36} color={ClinicianTheme.accent} />
        </View>
        <Text style={styles.hubTitle}>Create Care Plan</Text>
        {patientName ? <Text style={styles.hubFor}>for {patientName}</Text> : null}
        <Text style={styles.hubSub}>
          Select Fitness Hub modules for your patient — the same ones they see in the app
        </Text>
      </View>

      <OptionCard
        icon="barbell"
        color={TEMPLATE_COLOR.orange}
        title="Fitness Hub Modules"
        subtitle="Same modules your patient sees"
        description="Browse the Fitness Hub catalog, pick modules for this patient, and send them as recommendations."
        features={['Workouts', 'Nutrition', 'Mindfulness', 'Sleep', 'Education']}
        onPress={onFitnessHub}
      />
    </ScrollView>
  );
}

function OptionCard({
  icon,
  color,
  title,
  subtitle,
  description,
  features,
  onPress,
}: {
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.optionCard} onPress={onPress} activeOpacity={0.88}>
      <View style={styles.optionHeader}>
        <View style={[styles.optionIcon, { backgroundColor: color + '22' }]}>
          <Ionicons name={icon as any} size={24} color={color} />
        </View>
        <View style={styles.optionCopy}>
          <Text style={styles.optionTitle}>{title}</Text>
          <Text style={styles.optionSubtitle}>{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
      </View>
      <Text style={styles.optionDesc}>{description}</Text>
      <View style={styles.divider} />
      <Text style={styles.includesLabel}>Includes:</Text>
      <View style={styles.tagRow}>
        {features.map((f) => (
          <View key={f} style={[styles.tag, { backgroundColor: color + '18' }]}>
            <Text style={[styles.tagText, { color }]}>{f}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

function TemplatesStep({
  searchText,
  onSearchChange,
  filteredCategories,
  selectedCategory,
  selectedTemplateIds,
  onToggleCategory,
  onToggleTemplate,
  onPreview,
  footerInset,
}: {
  searchText: string;
  onSearchChange: (v: string) => void;
  filteredCategories: CarePlanTemplateCategory[];
  selectedCategory: CarePlanTemplateCategory | null;
  selectedTemplateIds: string[];
  onToggleCategory: (c: CarePlanTemplateCategory) => void;
  onToggleTemplate: (id: string) => void;
  onPreview: (t: CarePlanTemplate) => void;
  footerInset?: boolean;
}) {
  const selectedSet = useMemo(() => new Set(selectedTemplateIds), [selectedTemplateIds]);
  const categorySelected = (cat: CarePlanTemplateCategory) => {
    const ids = templatesForCategory(cat).map((t) => t.id);
    return ids.length > 0 && ids.every((id) => selectedSet.has(id));
  };

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[
        styles.content,
        footerInset ? { paddingBottom: Spacing.xl * 4 } : null,
      ]}
      keyboardShouldPersistTaps="handled"
    >
      {!selectedCategory ? (
        <>
          <Text style={styles.templatesHero}>Care Plan Templates</Text>
          <Text style={styles.templatesSub}>
            Tap to select · Long-press to preview
          </Text>

          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={Colors.textTertiary} />
            <TextInput
              style={styles.searchInput}
              value={searchText}
              onChangeText={onSearchChange}
              placeholder="Search templates…"
              placeholderTextColor={Colors.textTertiary}
              autoCorrect={false}
            />
            {searchText ? (
              <TouchableOpacity onPress={() => onSearchChange('')} hitSlop={8}>
                <Ionicons name="close-circle" size={18} color={Colors.textTertiary} />
              </TouchableOpacity>
            ) : null}
          </View>

          {filteredCategories.length === 0 ? (
            <View style={styles.emptySearch}>
              <Ionicons name="search" size={40} color={Colors.textTertiary} />
              <Text style={styles.emptySearchTitle}>No templates found</Text>
              <Text style={styles.templatesSub}>Try a different search term</Text>
            </View>
          ) : (
            <View style={styles.categoryGrid}>
              {filteredCategories.map((cat) => {
                const color = TEMPLATE_COLOR[cat.colorKey];
                const selected = categorySelected(cat);
                return (
                  <TouchableOpacity
                    key={cat.name}
                    style={[
                      styles.categoryCard,
                      selected && {
                        borderColor: ClinicianTheme.accent,
                        backgroundColor: ClinicianTheme.accentMuted,
                      },
                    ]}
                    onPress={() => onToggleCategory(cat)}
                    onLongPress={() => {
                      const templates = templatesForCategory(cat);
                      if (templates.length === 1) onPreview(templates[0]);
                    }}
                    delayLongPress={280}
                    activeOpacity={0.85}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: selected }}
                    accessibilityHint="Long press to preview"
                  >
                    {selected ? (
                      <View style={styles.categoryCheck}>
                        <Ionicons name="checkmark-circle" size={20} color={ClinicianTheme.accent} />
                      </View>
                    ) : null}
                    <View
                      style={[
                        styles.categoryIconBg,
                        { backgroundColor: color + '22' },
                      ]}
                    >
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
        </>
      ) : (
        <>
          <View style={styles.categoryHeader}>
            <Ionicons
              name={selectedCategory.icon as any}
              size={24}
              color={TEMPLATE_COLOR[selectedCategory.colorKey]}
            />
            <Text style={styles.categoryHeaderTitle}>{selectedCategory.name}</Text>
          </View>
          <Text style={styles.templatesSub}>Tap to select · Long-press to preview</Text>
          {templatesForCategory(selectedCategory).map((t) => {
            const color = TEMPLATE_COLOR[t.colorKey];
            const selected = selectedSet.has(t.id);
            return (
              <TouchableOpacity
                key={t.id}
                style={[
                  styles.templateRow,
                  selected && {
                    borderColor: ClinicianTheme.accent,
                    backgroundColor: ClinicianTheme.accentMuted,
                  },
                ]}
                onPress={() => onToggleTemplate(t.id)}
                onLongPress={() => onPreview(t)}
                delayLongPress={280}
                activeOpacity={0.85}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: selected }}
              >
                <View style={[styles.templateRowIcon, { backgroundColor: color + '22' }]}>
                  <Ionicons name={t.icon as any} size={26} color={color} />
                </View>
                <View style={styles.templateRowCopy}>
                  <Text style={styles.templateRowTitle}>{t.title}</Text>
                  <Text style={styles.templateRowDesc} numberOfLines={2}>
                    {t.purpose}
                  </Text>
                </View>
                <Ionicons
                  name={selected ? 'checkmark-circle' : 'ellipse-outline'}
                  size={24}
                  color={selected ? ClinicianTheme.accent : Colors.textTertiary}
                />
              </TouchableOpacity>
            );
          })}
        </>
      )}
    </ScrollView>
  );
}

function EditStep({
  patientName,
  planName,
  setPlanName,
  description,
  setDescription,
  personalNote,
  setPersonalNote,
  tasks,
  setTasks,
  newTask,
  setNewTask,
  onAddTask,
  saving,
  onSave,
}: {
  patientName?: string;
  planName: string;
  setPlanName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  personalNote: string;
  setPersonalNote: (v: string) => void;
  tasks: string[];
  setTasks: React.Dispatch<React.SetStateAction<string[]>>;
  newTask: string;
  setNewTask: (v: string) => void;
  onAddTask: () => void;
  saving: boolean;
  onSave: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      {patientName ? <Text style={styles.label}>For {patientName}</Text> : (
        <Text style={[styles.label, { color: Colors.error }]}>Select a patient above before sending</Text>
      )}

      <Text style={styles.fieldLabel}>Plan name</Text>
      <TextInput
        style={styles.input}
        value={planName}
        onChangeText={setPlanName}
        placeholder="e.g. Lung Health Plan"
        placeholderTextColor={Colors.textTertiary}
      />

      <Text style={styles.fieldLabel}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={description}
        onChangeText={setDescription}
        multiline
        placeholder="Optional description"
        placeholderTextColor={Colors.textTertiary}
      />

      <Text style={styles.fieldLabel}>Personal note (optional)</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={personalNote}
        onChangeText={setPersonalNote}
        multiline
        placeholder="Message from your clinician"
        placeholderTextColor={Colors.textTertiary}
      />

      <Text style={styles.fieldLabel}>Plan blocks / tasks</Text>
      {tasks.map((t, i) => (
        <View key={`${t}-${i}`} style={styles.taskRow}>
          <Ionicons name="checkmark-circle" size={18} color={ClinicianTheme.accent} />
          <Text style={styles.taskText}>{t}</Text>
          <TouchableOpacity onPress={() => setTasks((all) => all.filter((_, j) => j !== i))}>
            <Text style={styles.remove}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.addRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Add a task…"
          placeholderTextColor={Colors.textTertiary}
        />
        <TouchableOpacity style={styles.addBtn} onPress={onAddTask}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.saveBtn, saving && { opacity: 0.6 }]}
        onPress={onSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={styles.saveBtnText}>Send care plan</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

function TemplatePreview({
  template,
  isSelected,
  onToggleSelect,
  onUseAlone,
  onClose,
}: {
  template: CarePlanTemplate;
  isSelected: boolean;
  onToggleSelect: () => void;
  onUseAlone: () => void;
  onClose: () => void;
}) {
  const color = TEMPLATE_COLOR[template.colorKey];
  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Template Preview</Text>
        <TouchableOpacity onPress={onClose} style={{ width: 56 }}>
          <Text style={styles.closeLink}>Close</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
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

        {template.visualExplainers.length > 0 ? (
          <>
            <Text style={[styles.sectionLabel, { marginTop: Spacing.base }]}>
              Interactive learning
            </Text>
            <View style={styles.tagRow}>
              {template.visualExplainers.slice(0, 4).map((v) => (
                <View key={v} style={[styles.tag, { backgroundColor: color + '18' }]}>
                  <Text style={[styles.tagText, { color }]}>{v}</Text>
                </View>
              ))}
            </View>
          </>
        ) : null}

        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: color, marginTop: Spacing.lg }]}
          onPress={onToggleSelect}
        >
          <Text style={styles.saveBtnText}>
            {isSelected ? 'Remove from selection' : 'Add to selection'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelBtn} onPress={onUseAlone}>
          <Text style={[styles.cancelText, { color: ClinicianTheme.accent }]}>
            Use this template only
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: ClinicianTheme.canvas },
  flex: { flex: 1 },
  templatesPane: { flex: 1 },
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
  patientSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginHorizontal: Spacing.base,
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.sm,
  },
  patientSelectorRequired: {
    borderColor: ClinicianTheme.accent,
    backgroundColor: ClinicianTheme.accentSoft,
  },
  patientSelectorIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: ClinicianTheme.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientSelectorLabel: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  patientSelectorValue: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 2,
  },
  patientSelectorEmail: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  patientSearchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.base,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  patientSearchInput: {
    flex: 1,
    fontSize: Typography.size.base,
    color: Colors.text,
    paddingVertical: Spacing.sm,
  },
  patientList: { padding: Spacing.base, paddingBottom: Spacing.xl * 2, gap: Spacing.sm },
  patientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  patientRowSelected: {
    borderColor: ClinicianTheme.accent,
    backgroundColor: ClinicianTheme.accentSoft,
  },
  patientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ClinicianTheme.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientAvatarText: {
    fontSize: Typography.size.base,
    fontWeight: '800',
    color: ClinicianTheme.accent,
  },
  patientCopy: { flex: 1, minWidth: 0 },
  patientName: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  patientEmail: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: 2 },
  patientEmpty: { alignItems: 'center', paddingVertical: Spacing.xl },
  patientEmptyTitle: { fontSize: Typography.size.md, fontWeight: '700', color: Colors.text },
  patientEmptyHint: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  closeLink: {
    color: Colors.textSecondary,
    fontSize: Typography.size.sm,
    fontWeight: '600',
    textAlign: 'right',
  },
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing.xl * 2 },
  hubHero: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    gap: Spacing.sm,
  },
  hubIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: ClinicianTheme.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  hubTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.4,
  },
  hubFor: {
    fontSize: Typography.size.base,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  hubSub: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
    lineHeight: 20,
  },
  optionCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  optionHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionCopy: { flex: 1, gap: 2 },
  optionTitle: { ...ClinicianType.cardTitle, fontSize: Typography.size.lg },
  optionSubtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, fontWeight: '500' },
  optionDesc: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: Colors.border, marginVertical: 4 },
  includesLabel: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.md,
  },
  tagText: { fontSize: Typography.size.xs, fontWeight: '600' },
  templatesHero: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.4,
  },
  templatesSub: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginTop: -8,
  },
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
  emptySearch: {
    alignItems: 'center',
    paddingVertical: Spacing.xl * 2,
    gap: Spacing.sm,
  },
  emptySearchTitle: {
    fontSize: Typography.size.base,
    fontWeight: '600',
    color: Colors.text,
  },
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
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
    ...Shadow.sm,
  },
  categoryCheck: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 1,
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
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  categoryHeaderTitle: {
    fontSize: Typography.size.xl,
    fontWeight: '700',
    color: Colors.text,
  },
  templateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    borderWidth: 2,
    borderColor: 'transparent',
    ...Shadow.sm,
  },
  templateRowIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  templateRowCopy: { flex: 1, gap: 4 },
  templateRowTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  templateRowDesc: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 18 },
  label: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  fieldLabel: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  taskText: { flex: 1, fontSize: Typography.size.sm, color: Colors.text },
  remove: { color: Colors.error, padding: 4 },
  addRow: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'center' },
  addBtn: {
    backgroundColor: ClinicianTheme.accentSoft,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
  },
  addBtnText: { color: ClinicianTheme.accent, fontWeight: '700' },
  saveBtn: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.base,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  saveBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.base },
  cancelBtn: { alignItems: 'center', paddingVertical: Spacing.md },
  cancelText: { color: Colors.textSecondary, fontWeight: '600' },
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
  sectionLabel: { ...ClinicianType.sectionTitle },
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
  selectionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.base,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadow.sm,
  },
  clearSelection: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.sm,
  },
  continueBtn: {
    flex: 1,
    backgroundColor: ClinicianTheme.accent,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  continueBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.base,
  },
});
