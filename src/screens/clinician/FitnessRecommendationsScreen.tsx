import React, { useMemo, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, fitnessModuleIonIcon } from '../../theme';
import { ClinicianTheme } from '../../theme/clinicianTheme';
import type { ClinicianStackParamList, FitnessModule } from '../../types';
import { useAppStore } from '../../store';
import { clinicianService } from '../../services/clinicianService';
import {
  FITNESS_MODULES,
  FITNESS_DOMAIN_GROUPS,
} from '../../data/fitnessData';
import AppScreen from '../../components/common/AppScreen';
import { AppCard, AnimatedPressable, ListRow, ScreenHeader, SectionHeader } from '../../components/ui';
import { resolveDisplayName } from '../../utils/greetingName';

type Route = RouteProp<ClinicianStackParamList, typeof Screen.fitnessRecommendations>;

function matchesQuery(m: FitnessModule, q: string): boolean {
  return (
    m.title.toLowerCase().includes(q) ||
    m.subtitle.toLowerCase().includes(q) ||
    m.id.toLowerCase().includes(q) ||
    (m.exploreTags ?? []).some((t) => t.toLowerCase().includes(q)) ||
    (m.domain ?? '').toLowerCase().includes(q)
  );
}

export default function FitnessRecommendationsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<Route>();
  const { patient } = route.params;
  const { user } = useAppStore();
  const [selected, setSelected] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);

  const patientName = resolveDisplayName(patient);

  const filteredGroups = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return FITNESS_DOMAIN_GROUPS;
    return FITNESS_DOMAIN_GROUPS
      .map((g) => ({ ...g, data: g.data.filter((m) => matchesQuery(m, q)) }))
      .filter((g) => g.data.length > 0);
  }, [search]);

  const toggle = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const save = async () => {
    if (!user || selected.length === 0) {
      Alert.alert('Select modules', 'Choose at least one Fitness Hub module.');
      return;
    }
    setSaving(true);
    try {
      await clinicianService.saveFitnessHubRecommendations({
        clinicianId: user.uid,
        clinicianName: user.displayName,
        patientId: patient.uid,
        patientName,
        moduleIds: selected,
        personalNote: note.trim() || undefined,
      });
      Alert.alert('Sent', `Recommendations sent to ${patientName}.`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      console.warn('[FitnessRecommendations] save failed', e);
      Alert.alert('Error', 'Could not save recommendations. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppScreen mesh={false} backgroundColor={ClinicianTheme.canvas} style={styles.safe}>
      <ScreenHeader
        title="Recommend modules"
        onBack={() => navigation.goBack()}
        rightLabel={selected.length ? `Send (${selected.length})` : undefined}
        onRightPress={selected.length && !saving ? save : undefined}
        rightDisabled={saving}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          For {patientName} · {FITNESS_MODULES.length} Fitness Hub modules
        </Text>

        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search modules…"
            placeholderTextColor={Colors.textTertiary}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
          />
          {search.length > 0 ? (
            <AnimatedPressable onPress={() => setSearch('')} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color={Colors.textSecondary} />
            </AnimatedPressable>
          ) : null}
        </View>

        <TextInput
          style={styles.noteInput}
          value={note}
          onChangeText={setNote}
          placeholder="Personal note (optional)"
          placeholderTextColor={Colors.textTertiary}
          multiline
        />

        {filteredGroups.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No modules match</Text>
            <Text style={styles.emptyHint}>Try a different search term</Text>
          </View>
        ) : (
          filteredGroups.map((group) => (
            <View key={String(group.title)} style={styles.group}>
              <SectionHeader title={String(group.title)} />
              <AppCard padded={false}>
                {group.data.map((m, index) => {
                  const on = selected.includes(m.id);
                  return (
                    <ListRow
                      key={m.id}
                      title={m.title}
                      subtitle={m.subtitle}
                      iconName={fitnessModuleIonIcon(m)}
                      iconColor={m.color}
                      badge={m.isPremium ? 'PRO' : undefined}
                      badgeColor={Colors.brand}
                      onPress={() => toggle(m.id)}
                      showDivider={index < group.data.length - 1}
                      animated={false}
                      trailing={
                        <View style={[styles.check, on && styles.checkOn]}>
                          {on ? (
                            <Ionicons name="checkmark" size={14} color={Colors.white} />
                          ) : null}
                        </View>
                      }
                    />
                  );
                })}
              </AppCard>
            </View>
          ))
        )}

        <AnimatedPressable
          style={[styles.saveBtn, (saving || selected.length === 0) && styles.saveBtnDisabled]}
          onPress={save}
          disabled={saving || selected.length === 0}
        >
          {saving ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.saveBtnText}>
              {selected.length ? `Send ${selected.length} recommendation${selected.length === 1 ? '' : 's'}` : 'Select modules to send'}
            </Text>
          )}
        </AnimatedPressable>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing['3xl'] },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  searchInput: { flex: 1, fontSize: Typography.size.base, color: Colors.text, paddingVertical: 2 },
  noteInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    minHeight: 72,
    color: Colors.text,
    backgroundColor: Colors.surface,
    textAlignVertical: 'top',
  },
  group: { gap: Spacing.xs },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOn: {
    backgroundColor: ClinicianTheme.accent,
    borderColor: ClinicianTheme.accent,
  },
  empty: { alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.xs },
  emptyTitle: { fontSize: Typography.size.md, fontWeight: '700', color: Colors.text },
  emptyHint: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  saveBtn: {
    backgroundColor: ClinicianTheme.accent,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.base,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  saveBtnDisabled: { opacity: 0.5 },
  saveBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.sm },
});
