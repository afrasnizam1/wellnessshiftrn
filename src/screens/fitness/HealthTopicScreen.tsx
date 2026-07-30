// src/screens/fitness/HealthTopicScreen.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { FITNESS_MODULES } from '../../data/fitnessData';
import { HEALTH_TOPIC_ALIASES } from '../../data/healthTopicContent';
import { getRichHealthEducation } from '../../data/healthEducationResolver';
import { AppCard, IconBadge, SectionHeader } from '../../components/ui';
import AppScreen from '../../components/common/AppScreen';
import { navigateToFitnessModule } from '../../utils/fitnessModuleRouter';
import type { IoniconName } from '../../theme/icons';

const HERO_HEIGHT = 220;
const DEFAULT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=85&auto=format&fit=crop';

function heroFallbackColors(accent: string): [string, string] {
  return [accent, '#1E293B'];
}

function HeroBlock({
  title,
  subtitle,
  heroImageUrl,
  heroIcon,
  accentColor,
  topInset,
  onBack,
}: {
  title: string;
  subtitle?: string;
  heroImageUrl: string;
  heroIcon: IoniconName;
  accentColor: string;
  topInset: number;
  onBack: () => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = !imageFailed;

  const topBar = (
    <View style={[styles.heroTopBar, { paddingTop: topInset + Spacing.xs }]}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn} accessibilityLabel="Go back">
        <Ionicons name="chevron-back" size={22} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );

  const bottomContent = (
    <View style={styles.heroBottom}>
      <View style={styles.heroTitleRow}>
        <IconBadge name={heroIcon} color={accentColor} size="md" variant="solid" />
        <View style={styles.heroTextCol}>
          <Text style={styles.heroTitle} numberOfLines={2}>{title}</Text>
          {subtitle ? (
            <Text style={styles.heroSub} numberOfLines={2}>{subtitle}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );

  if (showImage) {
    return (
      <ImageBackground
        source={{ uri: heroImageUrl }}
        style={styles.hero}
        onError={() => setImageFailed(true)}
      >
        <LinearGradient
          colors={['rgba(15,23,42,0.55)', 'rgba(15,23,42,0.25)', 'rgba(15,23,42,0.82)']}
          style={StyleSheet.absoluteFill}
        />
        {topBar}
        {bottomContent}
      </ImageBackground>
    );
  }

  return (
    <LinearGradient colors={heroFallbackColors(accentColor)} style={styles.hero}>
      {topBar}
      {bottomContent}
    </LinearGradient>
  );
}

export default function HealthTopicScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const rawTopicId = route.params?.topicId ?? '';
  const topicId = HEALTH_TOPIC_ALIASES[rawTopicId] ?? rawTopicId;
  const module = FITNESS_MODULES.find((m) => m.id === topicId || m.id === rawTopicId);

  const title = module?.title ?? 'Health Topic';
  const subtitle = module?.subtitle;

  const rich = useMemo(
    () => getRichHealthEducation(topicId, rawTopicId, title, subtitle, module),
    [topicId, rawTopicId, title, subtitle, module],
  );

  const accentColor = rich.accentColor || module?.color || Colors.primary;

  const relatedModules = (rich.relatedModuleIds ?? [])
    .map((id) => FITNESS_MODULES.find((m) => m.id === id))
    .filter(Boolean);

  return (
    <AppScreen style={styles.safe} mesh={false} backgroundColor="#EEF1F7">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HeroBlock
          title={title}
          subtitle={subtitle}
          heroImageUrl={rich.heroImageUrl || DEFAULT_HERO_IMAGE}
          heroIcon={rich.heroIcon}
          accentColor={accentColor}
          topInset={insets.top}
          onBack={() => navigation.goBack()}
        />

        <View style={styles.contentPanel}>
          <AppCard style={styles.blockCard}>
            <Text style={styles.blockLabel}>Overview</Text>
            <Text style={styles.introText}>{rich.intro}</Text>
          </AppCard>

          <AppCard style={styles.blockCard}>
            <Text style={styles.blockLabel}>Key takeaways</Text>
            <View style={styles.takeawayList}>
              {rich.keyTakeaways.map((point) => (
                <View key={point} style={styles.takeawayRow}>
                  <View style={[styles.takeawayDot, { backgroundColor: accentColor }]} />
                  <Text style={styles.takeawayText}>{point}</Text>
                </View>
              ))}
            </View>
          </AppCard>

          {rich.sections.map((section) => (
            <View key={section.title} style={styles.section}>
              <SectionHeader title={section.title} />
              {section.intro ? (
                <Text style={styles.sectionIntro}>{section.intro}</Text>
              ) : null}
              {section.imageUrl ? (
                <Image
                  source={{ uri: section.imageUrl }}
                  style={styles.sectionImage}
                  resizeMode="cover"
                />
              ) : null}
              <View style={styles.cardStack}>
                {section.cards.map((card) => (
                  <AppCard key={`${section.title}-${card.title}`} style={styles.infoCard} elevated={false}>
                    <IconBadge name={card.icon} color={accentColor} size="md" />
                    <View style={styles.infoCardText}>
                      <Text style={styles.cardTitle}>{card.title}</Text>
                      <Text style={styles.cardBody}>{card.body}</Text>
                    </View>
                  </AppCard>
                ))}
              </View>
            </View>
          ))}

          {rich.tips?.map((tip) => (
            <AppCard
              key={tip.title}
              style={[styles.blockCard, styles.tipCard, { borderLeftColor: accentColor }]}
            >
              <View style={styles.tipHeader}>
                <Ionicons name="bulb-outline" size={18} color={accentColor} />
                <Text style={[styles.tipTitle, { color: accentColor }]}>{tip.title}</Text>
              </View>
              <Text style={styles.tipBody}>{tip.body}</Text>
            </AppCard>
          ))}

          {relatedModules.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Related in Fitness Hub" />
              <View style={styles.cardStack}>
                {relatedModules.map((mod) => (
                  <AppCard
                    key={mod!.id}
                    style={styles.relatedCard}
                    onPress={() => navigateToFitnessModule(navigation, mod!)}
                  >
                    <IconBadge name="arrow-forward-circle-outline" color={accentColor} size="sm" />
                    <View style={styles.relatedText}>
                      <Text style={styles.relatedTitle}>{mod!.title}</Text>
                      <Text style={styles.relatedSub}>{mod!.subtitle}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
                  </AppCard>
                ))}
              </View>
            </View>
          ) : null}

          <AppCard style={[styles.blockCard, styles.disclaimerCard]} elevated={false}>
            <View style={styles.disclaimerRow}>
              <Ionicons name="medical-outline" size={18} color={Colors.info} />
              <Text style={styles.disclaimerText}>
                This content is for educational purposes only and does not constitute medical advice.
                Always consult a qualified healthcare professional for personal health concerns.
              </Text>
            </View>
          </AppCard>
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scrollContent: { paddingBottom: Spacing['3xl'] },
  hero: {
    width: '100%',
    height: HERO_HEIGHT,
    justifyContent: 'space-between',
  },
  heroTopBar: {
    paddingHorizontal: Spacing.base,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBottom: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.lg,
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  heroTextCol: { flex: 1, gap: 2 },
  heroTitle: {
    fontSize: Typography.size.xl,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.3,
  },
  heroSub: {
    fontSize: Typography.size.sm,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 19,
  },
  contentPanel: {
    marginTop: -Spacing.lg,
    marginHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    gap: Spacing.md,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    backgroundColor: '#EEF1F7',
  },
  blockCard: { gap: Spacing.sm },
  blockLabel: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  introText: {
    fontSize: Typography.size.base,
    color: Colors.text,
    lineHeight: 24,
  },
  takeawayList: { gap: Spacing.sm, marginTop: 2 },
  takeawayRow: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'flex-start' },
  takeawayDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 8,
  },
  takeawayText: {
    flex: 1,
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  section: { gap: Spacing.sm },
  sectionIntro: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.xs,
  },
  sectionImage: {
    width: '100%',
    height: 152,
    borderRadius: Radius.lg,
    backgroundColor: Colors.border,
    marginBottom: Spacing.xs,
  },
  cardStack: { gap: Spacing.sm },
  infoCard: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
  },
  infoCardText: { flex: 1, gap: 4 },
  cardTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  cardBody: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 21,
  },
  tipCard: {
    borderLeftWidth: 3,
    backgroundColor: '#F8FAFF',
  },
  tipHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  tipTitle: { fontSize: Typography.size.base, fontWeight: '700' },
  tipBody: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 21,
  },
  relatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.white,
  },
  relatedText: { flex: 1 },
  relatedTitle: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  relatedSub: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  disclaimerCard: { backgroundColor: '#EFF6FF' },
  disclaimerRow: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'flex-start' },
  disclaimerText: {
    flex: 1,
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
