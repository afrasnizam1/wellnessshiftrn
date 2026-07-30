import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard } from '../../components/ui';
import { VITAMIN_SCENARIOS, VITAMINS_A_TO_Z, type VitaminDetail, type VitaminScenario } from '../../data/vitaminsLearningData';
import AppScreen from '../../components/common/AppScreen';

export default function VitaminsLearningScreen() {
  const navigation = useNavigation<any>();
  const [scenario, setScenario] = useState<VitaminScenario | null>(null);
  const [vitamin, setVitamin] = useState<VitaminDetail | null>(null);

  if (vitamin) {
    return (
      <DetailShell title={vitamin.name} onBack={() => setVitamin(null)}>
        <View style={[styles.vitaminHero, { backgroundColor: vitamin.color + '22' }]}>
          <Text style={styles.vitaminHeroIcon}>{vitamin.icon}</Text>
          <Text style={styles.vitaminBestTime}>Best time: {vitamin.bestTime}</Text>
          <Text style={styles.vitaminSub}>{vitamin.bestTimeDetails}</Text>
        </View>
        <Section title="Daily dose" body={`${vitamin.dailyDose}${vitamin.upperLimit ? `\nUpper limit: ${vitamin.upperLimit}` : ''}`} />
        <Section title="Food sources" body={vitamin.foodSources.join(' • ')} />
        <Section title="Benefits" body={vitamin.benefits.join('\n• ')} prefix="• " />
        <Section title="When useful" body={vitamin.whenUseful} />
        <Section title="Notes" body={vitamin.notes} />
      </DetailShell>
    );
  }

  if (scenario) {
    return (
      <DetailShell title={scenario.title} onBack={() => setScenario(null)}>
        <Section title="Overview" body={scenario.overview} />
        <Section title="Suggestions" body={scenario.suggestions.join('\n• ')} prefix="• " />
        <Section title="Lifestyle tips" body={scenario.lifestyleTips.join('\n• ')} prefix="• " />
        <Section title="Cautions" body={scenario.cautions.join('\n• ')} prefix="• " />
      </DetailShell>
    );
  }

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vitamins & Supplements</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../assets/images/vitamins-supplements.jpg')}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={StyleSheet.absoluteFill} />
          <Text style={styles.heroTitle}>Vitamins & Supplements</Text>
          <Text style={styles.heroSub}>Benefits, best time to take, and what to choose when you feel low</Text>
        </ImageBackground>

        <Text style={styles.sectionLabel}>Support by scenario</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scenarioRow}>
          {VITAMIN_SCENARIOS.map((s) => (
            <TouchableOpacity key={s.id} style={styles.scenarioCard} onPress={() => setScenario(s)} activeOpacity={0.85}>
              <Text style={styles.scenarioIcon}>{s.icon}</Text>
              <Text style={styles.scenarioTitle}>{s.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionLabel}>Vitamins A–Z</Text>
        {VITAMINS_A_TO_Z.map((v) => (
          <AppCard key={v.id} style={styles.vitaminRow} onPress={() => setVitamin(v)}>
            <View style={[styles.vitaminIcon, { backgroundColor: v.color + '22' }]}>
              <Text>{v.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.vitaminName}>{v.name}</Text>
              <Text style={styles.vitaminHint}>{v.bestTime}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </AppCard>
        ))}

        <Text style={styles.disclaimer}>
          Educational content only — not medical advice. Consult a GP or pharmacist before starting supplements.
        </Text>
      </ScrollView>
    </AppScreen>
  );
}

function DetailShell({
  title, onBack, children,
}: { title: string; onBack: () => void; children: React.ReactNode }) {
  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
    </AppScreen>
  );
}

function Section({ title, body, prefix = '' }: { title: string; body: string; prefix?: string }) {
  return (
    <AppCard style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionBody}>{prefix && !body.startsWith('•') ? prefix + body : body}</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.sm,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 32, color: Colors.primary, fontWeight: '300', marginTop: -4 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing['3xl'] },
  hero: { height: 180, borderRadius: Radius.lg, overflow: 'hidden', justifyContent: 'flex-end', padding: Spacing.base },
  heroImage: { borderRadius: Radius.lg },
  heroTitle: { fontSize: Typography.size.xl, fontWeight: '800', color: Colors.white },
  heroSub: { fontSize: Typography.size.sm, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  sectionLabel: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text, marginTop: Spacing.sm },
  scenarioRow: { gap: Spacing.sm, paddingVertical: Spacing.xs },
  scenarioCard: {
    width: 140, backgroundColor: Colors.surface, borderRadius: Radius.lg,
    padding: Spacing.md, borderWidth: StyleSheet.hairlineWidth, borderColor: Colors.borderLight,
  },
  scenarioIcon: { fontSize: 28, marginBottom: Spacing.sm },
  scenarioTitle: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text },
  vitaminRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  vitaminIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  vitaminName: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  vitaminHint: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  chevron: { fontSize: 24, color: Colors.textTertiary },
  sectionCard: { gap: Spacing.sm },
  sectionTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  sectionBody: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
  vitaminHero: { borderRadius: Radius.lg, padding: Spacing.lg, alignItems: 'center', gap: Spacing.xs },
  vitaminHeroIcon: { fontSize: 48 },
  vitaminBestTime: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  vitaminSub: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center' },
  disclaimer: { fontSize: Typography.size.xs, color: Colors.textTertiary, lineHeight: 18, marginTop: Spacing.md },
});
