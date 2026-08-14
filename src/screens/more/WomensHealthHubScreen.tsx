import React, { useCallback, useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { Colors, Typography, Spacing } from '../../theme';
import { AppCard, ScreenHeader, ListRow } from '../../components/ui';
import AppScreen from '../../components/common/AppScreen';
import { Screen } from '../../navigation/screenNames';
import { useAppStore } from '../../store';
import { cycleTrackingService, type CycleSnapshot } from '../../services/cycleTrackingService';

export default function WomensHealthHubScreen() {
  const navigation = useNavigation<any>();
  const user = useAppStore((s) => s.user);
  const [snap, setSnap] = useState<CycleSnapshot | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!user) return;
      cycleTrackingService.getSnapshot(user.uid).then(setSnap);
    }, [user?.uid]),
  );

  const cycleSub = snap?.dayOfCycle && snap.phase
    ? `Day ${snap.dayOfCycle} · ${snap.phase.name}${
        snap.nextPeriod ? ` · next ${format(snap.nextPeriod, 'd MMM')}` : ''
      }`
    : 'Log periods, flow, and how you feel';

  return (
    <AppScreen style={styles.safe}>
      <ScreenHeader title="For women" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.lead}>
          Track your cycle, symptoms, and related learning in one place. This is wellness support — not a
          diagnosis or contraception tool.
        </Text>

        <AppCard padded={false}>
          <ListRow
            title="Cycle & period tracker"
            subtitle={cycleSub}
            iconName="calendar-outline"
            iconColor={Colors.brand}
            onPress={() => navigation.navigate(Screen.menstrualCycle)}
          />
          <ListRow
            title="Log today"
            subtitle="Flow, cramps, mood, energy, and more"
            iconName="create-outline"
            iconColor={Colors.brand}
            onPress={() => navigation.navigate(Screen.menstrualCycle)}
          />
          <ListRow
            title="Women's Wellness Circle"
            subtitle="28-day cycle-aware movement and recovery"
            iconName="leaf-outline"
            iconColor="#EC407A"
            onPress={() => navigation.navigate(Screen.programs)}
            showDivider={false}
          />
        </AppCard>

        <Text style={styles.section}>Learn</Text>
        <AppCard padded={false}>
          <ListRow
            title="Menstrual health"
            subtitle="Cycle basics, pain, and when to see a GP"
            iconName="book-outline"
            iconColor="#EC407A"
            onPress={() =>
              navigation.navigate(Screen.tabFitness, {
                screen: Screen.healthTopic,
                params: { topicId: 'menstrual-health' },
              })
            }
          />
          <ListRow
            title="PCOS"
            subtitle="Hormones, periods, and metabolic health"
            iconName="woman-outline"
            iconColor="#FF6B6B"
            onPress={() => navigation.navigate(Screen.conditionDetail, { conditionId: 'pcos' })}
          />
          <ListRow
            title="Menopause"
            subtitle="Symptoms, sleep, and long-term health"
            iconName="flower-outline"
            iconColor="#AF52DE"
            onPress={() => navigation.navigate(Screen.conditionDetail, { conditionId: 'menopause' })}
            showDivider={false}
          />
        </AppCard>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: 40 },
  lead: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  section: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
    marginTop: Spacing.sm,
  },
});
