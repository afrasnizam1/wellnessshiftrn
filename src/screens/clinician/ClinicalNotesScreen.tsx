import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { format } from 'date-fns';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, ScreenHeader } from '../../components/ui';
import { clinicianService } from '../../services/clinicianService';
import type { ClinicianStackParamList } from '../../types';
import { Screen } from '../../navigation/screenNames';
import AppScreen from '../../components/common/AppScreen';

type Route = RouteProp<ClinicianStackParamList, typeof Screen.clinicalNotes>;

export default function ClinicalNotesScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<Route>();
  const { patient } = route.params;
  const [notes, setNotes] = useState<{ id: string; text: string; createdAt: string }[]>([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clinicianService.getClinicalNotes(patient.uid).then((n) => {
      setNotes(n);
      setLoading(false);
    });
  }, [patient.uid]);

  const save = async () => {
    if (!draft.trim()) return;
    const note = await clinicianService.addClinicalNote(patient.uid, draft.trim());
    setNotes((prev) => [note, ...prev]);
    setDraft('');
    Alert.alert('Saved', 'Clinical note added.');
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <ScreenHeader
          title="Clinical Notes"
          subtitle={patient.displayName}
          onBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <AppCard style={styles.compose}>
          <TextInput
            style={styles.input}
            placeholder="Add a private clinical note..."
            placeholderTextColor={Colors.textTertiary}
            value={draft}
            onChangeText={setDraft}
            multiline
          />
          <TouchableOpacity style={styles.saveBtn} onPress={save}>
            <Text style={styles.saveBtnText}>Save note</Text>
          </TouchableOpacity>
        </AppCard>
        {loading ? (
          <Text style={styles.empty}>Loading...</Text>
        ) : notes.length === 0 ? (
          <Text style={styles.empty}>No notes yet for this patient.</Text>
        ) : (
          notes.map((note) => (
            <AppCard key={note.id} style={styles.noteCard}>
              <Text style={styles.noteDate}>
                {format(new Date(note.createdAt), 'd MMM yyyy · HH:mm')}
              </Text>
              <Text style={styles.noteText}>{note.text}</Text>
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
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing['3xl'] },
  compose: { gap: Spacing.sm },
  input: { minHeight: 100, fontSize: Typography.size.base, color: Colors.text, textAlignVertical: 'top' },
  saveBtn: { alignSelf: 'flex-end', backgroundColor: Colors.primary, borderRadius: Radius.md, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm },
  saveBtnText: { color: Colors.white, fontWeight: '700' },
  noteCard: { gap: Spacing.xs },
  noteDate: { fontSize: Typography.size.xs, color: Colors.textTertiary, fontWeight: '600' },
  noteText: { fontSize: Typography.size.sm, color: Colors.text, lineHeight: 20 },
  empty: { textAlign: 'center', color: Colors.textSecondary, paddingVertical: Spacing.xl },
});
