import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, ScreenHeader, FilterChip } from '../../components/ui';
import { EVIDENCE_ARTICLES } from '../../data/evidenceHubData';
import AppScreen from '../../components/common/AppScreen';

const CATEGORIES = ['All', 'Physical Activity', 'Mental Health', 'Sleep', 'Nutrition'];

export default function EvidenceHubScreen() {
  const navigation = useNavigation<any>();
  const [category, setCategory] = useState('All');

  const articles = category === 'All'
    ? EVIDENCE_ARTICLES
    : EVIDENCE_ARTICLES.filter((a) => a.category === category);

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <ScreenHeader
          title="Evidence Hub"
          subtitle="Research summaries for clinical conversations"
          onBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.disclaimer}>
          Summaries for education only — not medical advice. Verify sources before clinical use.
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {CATEGORIES.map((c) => (
            <FilterChip key={c} label={c} active={category === c} onPress={() => setCategory(c)} />
          ))}
        </ScrollView>
        {articles.map((a) => (
          <AppCard key={a.id} style={styles.card}>
            <Text style={styles.cat}>{a.category}</Text>
            <Text style={styles.title}>{a.title}</Text>
            <Text style={styles.summary}>{a.summary}</Text>
            <Text style={styles.source}>{a.source} · {a.year}</Text>
            {a.url ? (
              <Text style={styles.link} onPress={() => Linking.openURL(a.url!)}>View source</Text>
            ) : null}
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
  disclaimer: { fontSize: Typography.size.xs, color: Colors.textSecondary, lineHeight: 18 },
  chips: { gap: Spacing.sm },
  card: { gap: Spacing.sm },
  cat: { fontSize: Typography.size.xs, fontWeight: '700', color: Colors.primary },
  title: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  summary: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  source: { fontSize: Typography.size.xs, color: Colors.textTertiary },
  link: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.primary },
});
