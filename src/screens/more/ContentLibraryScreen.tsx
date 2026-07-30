import React, { useMemo, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, FilterChip, ListRow, ScreenHeader } from '../../components/ui';
import {
  CONTENT_LIBRARY_CATEGORIES,
  searchContentLibrary,
  type ContentLibraryCategory,
  type ContentLibraryItem,
} from '../../data/contentLibraryData';
import AppScreen from '../../components/common/AppScreen';

export default function ContentLibraryScreen() {
  const navigation = useNavigation<any>();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ContentLibraryCategory>('All');

  const items = useMemo(() => searchContentLibrary(query, category), [query, category]);

  const openItem = (item: ContentLibraryItem) => {
    const { tab, screen, params } = item.navigate;
    if (tab === Screen.tabFitness) {
      navigation.navigate(Screen.tabFitness, { screen, params });
    } else {
      navigation.navigate(screen, params);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <ScreenHeader
        title="Content Library"
        subtitle={`${items.length} articles, guides & programs`}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={Colors.textTertiary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search wellness content..."
          placeholderTextColor={Colors.textTertiary}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        {CONTENT_LIBRARY_CATEGORIES.map((cat) => (
          <FilterChip
            key={cat}
            label={cat}
            active={category === cat}
            onPress={() => setCategory(cat)}
          />
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No content found</Text>
            <Text style={styles.emptySub}>Try a different search or category</Text>
          </View>
        ) : (
          <AppCard padded={false}>
            {items.map((item, index) => (
              <ListRow
                key={item.id}
                title={item.title}
                subtitle={item.subtitle}
                icon={<Text style={styles.emoji}>{item.icon}</Text>}
                iconBg={Colors.primaryLight}
                onPress={() => openItem(item)}
                showDivider={index < items.length - 1}
              />
            ))}
          </AppCard>
        )}
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    marginHorizontal: Spacing.base, marginBottom: Spacing.sm,
    backgroundColor: 'rgba(118, 118, 128, 0.12)', borderRadius: Radius.md,
    paddingHorizontal: Spacing.md, paddingVertical: 10,
  },
  searchInput: { flex: 1, fontSize: Typography.size.base, color: Colors.text, padding: 0 },
  filterRow: { paddingHorizontal: Spacing.base, paddingBottom: Spacing.sm, gap: Spacing.sm },
  list: { padding: Spacing.base },
  emoji: { fontSize: 20 },
  empty: { alignItems: 'center', paddingTop: Spacing['3xl'], gap: Spacing.sm },
  emptyTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  emptySub: { fontSize: Typography.size.sm, color: Colors.textSecondary },
});
