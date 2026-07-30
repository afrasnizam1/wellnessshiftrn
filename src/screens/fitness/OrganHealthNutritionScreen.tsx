import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../navigation/screenNames';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, ScreenHeader, IconBadge } from '../../components/ui';
import { ORGAN_SECTIONS } from '../../data/organHealthNutrition';
import type { IoniconName } from '../../theme/icons';
import AppScreen from '../../components/common/AppScreen';

export default function OrganHealthNutritionScreen() {
  const navigation = useNavigation<any>();

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <ScreenHeader
          title="Organ Health & Nutrition"
          subtitle="Foods and habits that support each system"
          onBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.intro}>
          Explore how nutrition and lifestyle support major organ systems. Tap a section for the full health topic guide.
        </Text>
        {ORGAN_SECTIONS.map((organ) => (
          <AppCard key={organ.id} style={styles.organCard}>
            <View style={styles.organHeader}>
              <IconBadge name={organ.icon as IoniconName} color={organ.color} size="md" />
              <View style={{ flex: 1 }}>
                <Text style={styles.organTitle}>{organ.title}</Text>
                <Text style={styles.organSub}>{organ.subtitle}</Text>
              </View>
            </View>
            <Text style={styles.sectionLabel}>Key nutrients</Text>
            {organ.nutrients.map((n) => (
              <Text key={n} style={styles.bullet}>• {n}</Text>
            ))}
            <Text style={styles.sectionLabel}>Daily tips</Text>
            {organ.tips.map((t) => (
              <Text key={t} style={styles.bullet}>• {t}</Text>
            ))}
            <TouchableOpacity
              style={[styles.linkBtn, { borderColor: organ.color + '44' }]}
              onPress={() => navigation.navigate(Screen.healthTopic, { topicId: organ.topicId })}
            >
              <Text style={[styles.linkText, { color: organ.color }]}>Read full guide →</Text>
            </TouchableOpacity>
          </AppCard>
        ))}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.base, paddingTop: Spacing.sm },
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing['3xl'] },
  intro: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  organCard: { gap: Spacing.sm },
  organHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  organTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  organSub: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  sectionLabel: { fontSize: Typography.size.xs, fontWeight: '700', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: Spacing.sm },
  bullet: { fontSize: Typography.size.sm, color: Colors.text, lineHeight: 20, paddingLeft: Spacing.xs },
  linkBtn: { marginTop: Spacing.sm, borderWidth: 1, borderRadius: Radius.md, padding: Spacing.sm, alignItems: 'center' },
  linkText: { fontWeight: '700', fontSize: Typography.size.sm },
});
