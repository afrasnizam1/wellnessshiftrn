import React, { useEffect, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { ClinicianLayout, ClinicianTheme } from '../../theme/clinicianTheme';
import { useAppStore } from '../../store';
import { clinicianService } from '../../services/clinicianService';
import type { ClinicianStackParamList } from '../../types';
import AppScreen from '../../components/common/AppScreen';
import ClinicianHeroHeader from '../../components/clinician/ClinicianHeroHeader';
import ClinicianPatientCard from '../../components/clinician/ClinicianPatientCard';

type Nav = NativeStackNavigationProp<ClinicianStackParamList>;

export default function PatientsScreen() {
  const navigation = useNavigation<Nav>();
  const { user } = useAppStore();
  const [patients, setPatients] = useState<Awaited<ReturnType<typeof clinicianService.fetchLinkedPatients>>>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    if (!user) return;
    setPatients(await clinicianService.fetchLinkedPatients(user.uid));
  };

  useEffect(() => {
    if (!user) return;
    load().finally(() => setLoading(false));
    return clinicianService.watchLinkedPatients(user.uid, setPatients);
  }, [user]);

  const filtered = patients.filter(
    (p) =>
      p.displayName.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  const attentionCount = patients.filter((p) => p.needsAttention).length;

  if (loading) {
    return (
      <AppScreen mesh={false} backgroundColor={Colors.background} style={styles.loading}>
        <ActivityIndicator size="large" color={ClinicianTheme.accent} />
      </AppScreen>
    );
  }

  return (
    <View style={styles.root}>
      <ClinicianHeroHeader
        title="Patients"
        subtitle={`${patients.length} linked${attentionCount ? ` · ${attentionCount} need attention` : ''}`}
        actions={[
          { icon: 'person-add-outline', onPress: () => navigation.navigate(Screen.addPatient) },
        ]}
      >
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or email"
            placeholderTextColor={Colors.textSecondary}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
          {search.length > 0 ? (
            <TouchableOpacity onPress={() => setSearch('')} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </ClinicianHeroHeader>

      <AppScreen mesh={false} backgroundColor={Colors.background} style={styles.body} edges={[]}>
        <FlatList
          data={filtered}
          keyExtractor={(p) => p.uid}
          style={styles.list}
          contentContainerStyle={filtered.length === 0 ? styles.listEmpty : styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                await load();
                setRefreshing(false);
              }}
              tintColor={ClinicianTheme.accent}
            />
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <View style={styles.emptyIcon}>
                <Ionicons name="people-outline" size={32} color={ClinicianTheme.accent} />
              </View>
              <Text style={styles.emptyTitle}>No patients found</Text>
              <Text style={styles.emptyHint}>
                {search
                  ? 'Try a different search term.'
                  : 'Share your invite code from the dashboard to link patients.'}
              </Text>
              {!search ? (
                <TouchableOpacity
                  style={styles.emptyBtn}
                  onPress={() => navigation.navigate(Screen.addPatient)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.emptyBtnText}>Add patient</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          }
          renderItem={({ item: p }) => (
            <ClinicianPatientCard
              patient={p}
              urgent={p.needsAttention}
              onPress={() => navigation.navigate(Screen.patientDetail, { patient: p })}
            />
          )}
        />
      </AppScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.backgroundSecondary,
    marginHorizontal: Spacing.base,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.size.base,
    color: Colors.text,
    paddingVertical: 2,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    paddingBottom: ClinicianLayout.tabBarBottomInset,
    gap: Spacing.sm,
  },
  listEmpty: {
    flexGrow: 1,
    paddingHorizontal: Spacing.base,
    paddingBottom: ClinicianLayout.tabBarBottomInset,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing['2xl'],
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: ClinicianTheme.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  emptyTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '800',
    color: Colors.text,
  },
  emptyHint: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyBtn: {
    marginTop: Spacing.sm,
    backgroundColor: ClinicianTheme.accent,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
  },
  emptyBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.sm,
  },
});
