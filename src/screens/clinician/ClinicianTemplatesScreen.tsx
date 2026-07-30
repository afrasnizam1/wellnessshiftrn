import React from 'react';
import { Screen } from '../../navigation/screenNames';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import AppScreen from '../../components/common/AppScreen';

const TEMPLATES = [
  { id: '1', title: 'Post-surgery recovery', tasks: ['Gentle walking 10 min', 'Hydration check', 'Pain log'] },
  { id: '2', title: 'Hypertension lifestyle', tasks: ['Low-sodium meals', 'BP log', 'Stress breathing 5 min'] },
  { id: '3', title: 'Diabetes management', tasks: ['Blood glucose log', 'Balanced plate meals', 'Foot check'] },
  { id: '4', title: 'Weight management', tasks: ['Daily steps goal', 'Protein at each meal', 'Weekly weigh-in'] },
  { id: '5', title: 'Mental wellness', tasks: ['Morning mood check', 'Mindfulness 10 min', 'Sleep hygiene'] },
];

export default function ClinicianTemplatesScreen() {
  const navigation = useNavigation<any>();

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Care Plan Templates</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.intro}>Start from a template, then customise tasks for each patient.</Text>
        {TEMPLATES.map((t) => (
          <View key={t.id} style={styles.card}>
            <Text style={styles.cardTitle}>{t.title}</Text>
            {t.tasks.map((task) => (
              <Text key={task} style={styles.task}>• {task}</Text>
            ))}
            <TouchableOpacity
              style={styles.useBtn}
              onPress={() => navigation.navigate(Screen.clinicianTabs, { screen: Screen.patients })}
            >
              <Text style={styles.useBtnText}>Use with patient →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.base, gap: Spacing.md },
  intro: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  card: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm, gap: Spacing.xs },
  cardTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  task: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  useBtn: { marginTop: Spacing.sm, alignSelf: 'flex-start', backgroundColor: Colors.primaryBg, borderRadius: Radius.xl, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm },
  useBtnText: { color: Colors.primary, fontWeight: '700', fontSize: Typography.size.sm },
});
