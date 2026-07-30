import React, { useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, Alert, Image, Switch, TouchableOpacity,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppScreen from '../../components/common/AppScreen';
import { AppCard, BrandButton, ScreenHeader, SectionHeader } from '../../components/ui';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { useAppStore } from '../../store';
import {
  HEALTH_RECORD_KIND_LABELS,
  healthRecordsService,
  type HealthRecord,
  type HealthRecordKind,
} from '../../services/healthRecordsService';
import { imagePickerService } from '../../services/imagePickerService';
import { Screen } from '../../navigation/screenNames';

const KINDS = Object.keys(HEALTH_RECORD_KIND_LABELS) as HealthRecordKind[];

export default function HealthRecordsScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [kind, setKind] = useState<HealthRecordKind>('lab');
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [shareOnAdd, setShareOnAdd] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setRecords(await healthRecordsService.list(user.uid));
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const pickFile = async () => {
    const picked = await imagePickerService.pickFromLibrary();
    if (!picked?.uri) return;
    setFileUri(picked.uri);
  };

  const save = async () => {
    if (!user) return;
    if (!title.trim() || !fileUri) {
      Alert.alert('Missing details', 'Add a title and upload a photo of the record.');
      return;
    }
    setSaving(true);
    try {
      await healthRecordsService.add(user.uid, {
        title: title.trim(),
        kind,
        notes: notes.trim() || undefined,
        fileUri,
        mimeType: 'image/jpeg',
        sharedWithClinician: shareOnAdd,
      });
      setTitle('');
      setNotes('');
      setFileUri(null);
      await load();
      Alert.alert(
        'Record saved',
        shareOnAdd
          ? 'Stored in your vault and marked shareable with your linked GP / clinician.'
          : 'Stored privately in your vault. You can share later.',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <ScreenHeader
          title="Health records"
          subtitle="Connect documents with your GP / clinician"
          onBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <AppCard style={styles.card}>
          <Text style={styles.help}>
            Upload lab results, GP letters, prescriptions, and imaging. Mark records to share with
            a linked clinician so your care team sees the same history you track here.
          </Text>
          <BrandButton
            label="Connect / manage clinician"
            variant="outline"
            onPress={() =>
              navigation.getParent()?.navigate(Screen.tabMyCare, {
                screen: Screen.connectClinician,
              })
            }
          />
        </AppCard>

        <SectionHeader title="Add record" />
        <AppCard style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Title (e.g. Blood panel — Mar 2026)"
            placeholderTextColor={Colors.textTertiary}
            value={title}
            onChangeText={setTitle}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            {KINDS.map((k) => (
              <TouchableOpacity
                key={k}
                style={[styles.chip, kind === k && styles.chipActive]}
                onPress={() => setKind(k)}
              >
                <Text style={[styles.chipText, kind === k && styles.chipTextActive]}>
                  {HEALTH_RECORD_KIND_LABELS[k]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TextInput
            style={[styles.input, styles.notes]}
            placeholder="Notes for your clinician (optional)"
            placeholderTextColor={Colors.textTertiary}
            value={notes}
            onChangeText={setNotes}
            multiline
          />
          {fileUri ? (
            <Image source={{ uri: fileUri }} style={styles.preview} />
          ) : (
            <TouchableOpacity style={styles.upload} onPress={pickFile}>
              <Ionicons name="document-attach-outline" size={22} color={Colors.primary} />
              <Text style={styles.uploadText}>Upload photo of record</Text>
            </TouchableOpacity>
          )}
          <View style={styles.shareRow}>
            <Text style={styles.shareLabel}>Share with linked GP / clinician</Text>
            <Switch
              value={shareOnAdd}
              onValueChange={setShareOnAdd}
              trackColor={{ true: Colors.primary, false: Colors.borderLight }}
            />
          </View>
          <BrandButton label="Save record" onPress={save} loading={saving} />
        </AppCard>

        <SectionHeader title="Your vault" />
        {records.length === 0 ? (
          <AppCard>
            <Text style={styles.empty}>No records yet. Add your first document above.</Text>
          </AppCard>
        ) : (
          records.map((r) => (
            <AppCard key={r.id} style={styles.recordCard}>
              <View style={styles.recordHeader}>
                <Image source={{ uri: r.fileUri }} style={styles.thumb} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.recordTitle}>{r.title}</Text>
                  <Text style={styles.recordMeta}>
                    {HEALTH_RECORD_KIND_LABELS[r.kind]} ·{' '}
                    {new Date(r.createdAt).toLocaleDateString()}
                  </Text>
                  <Text style={styles.shareStatus}>
                    {r.sharedWithClinician ? 'Shared with care team' : 'Private'}
                  </Text>
                </View>
              </View>
              <View style={styles.recordActions}>
                <BrandButton
                  label={r.sharedWithClinician ? 'Make private' : 'Share with GP'}
                  compact
                  variant="outline"
                  onPress={async () => {
                    if (!user) return;
                    setRecords(
                      await healthRecordsService.setShared(user.uid, r.id, !r.sharedWithClinician),
                    );
                  }}
                />
                <TouchableOpacity
                  onPress={async () => {
                    if (!user) return;
                    await healthRecordsService.remove(user.uid, r.id);
                    await load();
                  }}
                  hitSlop={8}
                >
                  <Ionicons name="trash-outline" size={20} color={Colors.error} />
                </TouchableOpacity>
              </View>
            </AppCard>
          ))
        )}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.base, paddingTop: Spacing.sm },
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing['2xl'] },
  card: { gap: Spacing.md },
  help: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
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
  notes: { minHeight: 72, textAlignVertical: 'top' },
  chips: { gap: Spacing.xs },
  chip: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full ?? 999,
    backgroundColor: Colors.surfaceSecondary ?? Colors.primaryLight,
    marginRight: Spacing.xs,
  },
  chipActive: { backgroundColor: Colors.primary },
  chipText: { fontSize: Typography.size.xs, fontWeight: '600', color: Colors.textSecondary },
  chipTextActive: { color: Colors.white },
  upload: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  uploadText: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.primary },
  preview: { width: '100%', height: 180, borderRadius: Radius.lg },
  shareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  shareLabel: { flex: 1, fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text },
  empty: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  recordCard: { gap: Spacing.sm },
  recordHeader: { flexDirection: 'row', gap: Spacing.sm },
  thumb: { width: 56, height: 56, borderRadius: 10, backgroundColor: Colors.borderLight },
  recordTitle: { fontSize: Typography.size.sm, fontWeight: '800', color: Colors.text },
  recordMeta: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  shareStatus: { fontSize: Typography.size.xs, color: Colors.primary, marginTop: 4, fontWeight: '600' },
  recordActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
});
