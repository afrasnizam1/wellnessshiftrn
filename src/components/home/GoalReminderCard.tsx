// src/components/home/GoalReminderCard.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { AnimatedPressable } from '../ui';
import { GOAL_REMINDER_ACTIONS, type PrimaryGoal } from '../../data/onboardingGoals';
import { getDailyWellnessBoost } from '../../data/dailyWellnessBoosts';

interface Props {
  goal: PrimaryGoal;
}

export default function GoalReminderCard({ goal }: Props) {
  const navigation = useNavigation<any>();
  const [done, setDone] = useState(false);
  const clinician = goal === 'clinician' ? GOAL_REMINDER_ACTIONS.clinician : null;
  const boost = useMemo(() => (clinician ? null : getDailyWellnessBoost(goal)), [clinician, goal]);

  const title = clinician?.title ?? boost!.title;
  const subtitle = clinician?.subtitle ?? boost!.subtitle;
  const icon = (clinician?.icon ?? boost!.icon) as any;

  const onPress = () => {
    if (clinician) {
      navigation.navigate(clinician.tab, { screen: clinician.screen });
      return;
    }
    if (done) return;

    const dest = boost?.destination;
    if (dest) {
      if ('tab' in dest && dest.tab) {
        navigation.navigate(dest.tab, { screen: dest.screen });
      } else {
        navigation.navigate(dest.screen);
      }
      return;
    }

    Alert.alert(title, 'You do not need the app for this one — do it now, then come back and tap Done.', [
      { text: 'Later', style: 'cancel' },
      { text: 'Done', onPress: () => setDone(true) },
    ]);
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={22} color={done ? Colors.success : Colors.primary} />
        </View>
        <View style={styles.content}>
          <Text style={styles.kicker}>{done ? 'Boost complete' : "Today's boost"}</Text>
          <Text style={styles.title}>{done ? 'Nice work — that is one win for today' : title}</Text>
          <Text style={styles.subtitle}>{done ? 'Come back tomorrow for a new nudge' : subtitle}</Text>
        </View>
        <Ionicons
          name={done ? 'checkmark-circle' : 'chevron-forward'}
          size={20}
          color={done ? Colors.success : Colors.textTertiary}
        />
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.sm,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1 },
  kicker: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  title: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text, letterSpacing: -0.2 },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: 3 },
});
