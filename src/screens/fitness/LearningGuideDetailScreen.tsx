import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard } from '../../components/ui';
import { getLearningGuide } from '../../data/learningGuides';
import { getRichLearningGuide } from '../../data/learningGuideContent';
import AppScreen from '../../components/common/AppScreen';

export default function LearningGuideDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const topicId = route.params?.topicId ?? '';
  const guide = getLearningGuide(topicId);
  const rich = getRichLearningGuide(topicId);
  const [heroFailed, setHeroFailed] = useState(false);

  if (!rich && !guide) {
    return (
      <AppScreen>
        <Text style={{ padding: Spacing.base }}>Guide not found</Text>
      </AppScreen>
    );
  }

  const title = guide?.title ?? rich?.heroTitle ?? 'Learning Guide';

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {guide && !heroFailed ? (
          <ImageBackground
            source={{ uri: guide.imageUrl }}
            style={styles.hero}
            imageStyle={styles.heroImage}
            onError={() => setHeroFailed(true)}
          >
            <LinearGradient colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.7)']} style={StyleSheet.absoluteFill} />
            <Text style={styles.heroTitle}>{title}</Text>
            <Text style={styles.heroSub}>{guide.subtitle}</Text>
          </ImageBackground>
        ) : (
          <LinearGradient colors={guide?.fallbackColors ?? ['#946BFA', '#389EFA']} style={styles.heroFallback}>
            <Text style={styles.heroTitle}>{title}</Text>
            <Text style={styles.heroSub}>{guide?.subtitle}</Text>
          </LinearGradient>
        )}

        {rich?.sections.map((section) => (
          <View key={section.title}>
            <Text style={styles.sectionLabel}>{section.title}</Text>
            {section.items.map((item) => (
              <AppCard key={item.title} style={styles.itemCard}>
                <Text style={styles.itemIcon}>{item.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemBody}>{item.body}</Text>
                </View>
              </AppCard>
            ))}
          </View>
        ))}

        {rich?.tips?.map((tip) => (
          <AppCard key={tip.title} style={styles.tipCard}>
            <Text style={styles.tipTitle}>💡 {tip.title}</Text>
            <Text style={styles.tipBody}>{tip.body}</Text>
          </AppCard>
        ))}

        {rich?.disclaimer && (
          <Text style={styles.disclaimer}>{rich.disclaimer}</Text>
        )}
      </ScrollView>
    </AppScreen>
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
  heroFallback: { height: 160, borderRadius: Radius.lg, justifyContent: 'flex-end', padding: Spacing.base },
  heroTitle: { fontSize: Typography.size.xl, fontWeight: '800', color: Colors.white },
  heroSub: { fontSize: Typography.size.sm, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  sectionLabel: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text, marginTop: Spacing.sm },
  itemCard: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.sm },
  itemIcon: { fontSize: 24 },
  itemTitle: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  itemBody: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20, marginTop: 4 },
  tipCard: { gap: Spacing.xs, backgroundColor: Colors.primaryLight },
  tipTitle: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.primary },
  tipBody: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  disclaimer: { fontSize: Typography.size.xs, color: Colors.textTertiary, lineHeight: 18 },
});
