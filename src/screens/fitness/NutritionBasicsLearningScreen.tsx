import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard } from '../../components/ui';
import {
  NUTRITION_FOUNDATIONS,
  NUTRITION_HABITS,
  SUPPLEMENT_TIMING,
  type NutritionBasicItem,
} from '../../data/nutritionBasicsLearningData';
import AppScreen from '../../components/common/AppScreen';

export default function NutritionBasicsLearningScreen() {
  const navigation = useNavigation<any>();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => setExpanded(expanded === id ? null : id);

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nutrition Basics</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=90' }}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={StyleSheet.absoluteFill} />
          <Text style={styles.heroTitle}>Nutrition Basics</Text>
          <Text style={styles.heroSub}>Simple principles to support energy, recovery, and long-term health</Text>
        </ImageBackground>

        <Text style={styles.sectionLabel}>Foundations</Text>
        {NUTRITION_FOUNDATIONS.map((item) => (
          <FoundationCard
            key={item.id}
            item={item}
            expanded={expanded === item.id}
            onToggle={() => toggle(item.id)}
          />
        ))}

        <Text style={styles.sectionLabel}>Supplements</Text>
        {SUPPLEMENT_TIMING.map((tip) => (
          <AppCard key={tip.title} style={styles.tipCard}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipBody}>{tip.body}</Text>
          </AppCard>
        ))}

        <Text style={styles.sectionLabel}>Habits</Text>
        {NUTRITION_HABITS.map((tip) => (
          <AppCard key={tip.title} style={styles.tipCard}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipBody}>{tip.body}</Text>
          </AppCard>
        ))}

        <Text style={styles.disclaimer}>
          For personalised nutrition advice, consult a registered dietitian or your GP.
        </Text>
      </ScrollView>
    </AppScreen>
  );
}

function FoundationCard({
  item, expanded, onToggle,
}: { item: NutritionBasicItem; expanded: boolean; onToggle: () => void }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <AppCard style={styles.foundationCard}>
      <TouchableOpacity style={styles.foundationHeader} onPress={onToggle} activeOpacity={0.8}>
        <Text style={styles.foundationIcon}>{item.icon}</Text>
        <Text style={styles.foundationTitle}>{item.title}</Text>
        <Text style={styles.chevron}>{expanded ? '▾' : '›'}</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.foundationBody}>
          {!imageFailed ? (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.thumb}
              resizeMode="cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <LinearGradient
              colors={['#E8F4FD', '#D4E8F7']}
              style={styles.thumbFallback}
            >
              <Text style={styles.thumbFallbackIcon}>{item.icon}</Text>
            </LinearGradient>
          )}
          <Text style={styles.foundationDetail}>{item.detail}</Text>
        </View>
      )}
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
  foundationCard: { padding: 0, overflow: 'hidden' },
  foundationHeader: { flexDirection: 'row', alignItems: 'center', padding: Spacing.base, gap: Spacing.md },
  foundationIcon: { fontSize: 24 },
  foundationTitle: { flex: 1, fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  chevron: { fontSize: 20, color: Colors.textTertiary },
  foundationBody: { paddingHorizontal: Spacing.base, paddingBottom: Spacing.base, gap: Spacing.md },
  thumb: {
    width: '100%',
    height: 120,
    borderRadius: Radius.md,
    backgroundColor: Colors.border,
  },
  thumbFallback: {
    height: 120,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbFallbackIcon: { fontSize: 40 },
  foundationDetail: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
  tipCard: { gap: Spacing.xs },
  tipTitle: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  tipBody: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  disclaimer: { fontSize: Typography.size.xs, color: Colors.textTertiary, lineHeight: 18 },
});
