import React, { useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import AppScreen from '../../components/common/AppScreen';

export default function ClinicianPracticeModeScreen() {
  const navigation = useNavigation<any>();
  const [demoPatients, setDemoPatients] = useState(true);
  const [showScores, setShowScores] = useState(true);
  const [autoTriage, setAutoTriage] = useState(true);

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Practice Mode</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.intro}>Configure how your clinician portal behaves for your practice workflow.</Text>
        {[
          { label: 'Demo patient data', sub: 'Show sample patients when none are linked', value: demoPatients, set: setDemoPatients },
          { label: 'Wellness scores on list', sub: 'Display score badges on patient cards', value: showScores, set: setShowScores },
          { label: 'Auto triage alerts', sub: 'Flag inactive or low-score patients', value: autoTriage, set: setAutoTriage },
        ].map((row) => (
          <View key={row.label} style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.rowSub}>{row.sub}</Text>
            </View>
            <Switch value={row.value} onValueChange={row.set} trackColor={{ true: Colors.primary }} />
          </View>
        ))}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Practice details</Text>
          <Text style={styles.body}>Add clinic name, specialty, and contact info in Profile so patients recognise your care team.</Text>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(Screen.editClinicianProfile)}>
            <Text style={styles.btnText}>Edit profile →</Text>
          </TouchableOpacity>
        </View>
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
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm, gap: Spacing.md },
  rowLabel: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  rowSub: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  card: { backgroundColor: Colors.primaryBg, borderRadius: Radius.lg, padding: Spacing.base, gap: Spacing.sm, borderWidth: 1, borderColor: Colors.primary + '33' },
  cardTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  body: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  btn: { alignSelf: 'flex-start', marginTop: Spacing.xs },
  btnText: { color: Colors.primary, fontWeight: '700' },
});
