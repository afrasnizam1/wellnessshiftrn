import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, ScreenHeader, FilterChip } from '../../components/ui';
import { BLOG_POSTS, type BlogCategory, type BlogPost } from '../../data/blogData';
import AppScreen from '../../components/common/AppScreen';

const CATEGORIES: (BlogCategory | 'All')[] = ['All', 'Fitness', 'Nutrition', 'Mental Health', 'Lifestyle', 'Recovery', 'Technology'];

export default function BlogScreen() {
  const navigation = useNavigation<any>();
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [selected, setSelected] = useState<BlogPost | null>(null);

  const posts = category === 'All' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === category);

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <ScreenHeader title="Wellness Blog" subtitle="Articles & expert tips" onBack={() => navigation.goBack()} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {CATEGORIES.map((c) => (
            <FilterChip key={c} label={c} active={category === c} onPress={() => setCategory(c)} />
          ))}
        </ScrollView>
        {posts.map((post) => (
          <TouchableOpacity key={post.id} activeOpacity={0.85} onPress={() => setSelected(post)}>
            <AppCard style={styles.card} padded={false}>
              <Image source={{ uri: post.imageUrl }} style={styles.image} />
              <View style={styles.body}>
                <Text style={styles.cat}>{post.category}</Text>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.excerpt} numberOfLines={2}>{post.excerpt}</Text>
                <Text style={styles.meta}>{post.date} · {post.readTime} · {post.author}</Text>
              </View>
            </AppCard>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={!!selected} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setSelected(null)}>
        {selected ? (
          <ScrollView style={styles.modalScroll} contentContainerStyle={styles.modalContent}>
            <Image source={{ uri: selected.imageUrl }} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{selected.title}</Text>
            <Text style={styles.modalMeta}>{selected.author} · {selected.date}</Text>
            <Text style={styles.modalBody}>{selected.body}</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelected(null)}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : null}
      </Modal>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.base, paddingTop: Spacing.sm },
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing['3xl'] },
  chips: { gap: Spacing.sm, marginBottom: Spacing.sm },
  card: { overflow: 'hidden' },
  image: { width: '100%', height: 140, backgroundColor: Colors.borderLight },
  body: { padding: Spacing.base, gap: 4 },
  cat: { fontSize: Typography.size.xs, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase' },
  title: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  excerpt: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 18 },
  meta: { fontSize: Typography.size.xs, color: Colors.textTertiary, marginTop: 4 },
  modalScroll: { flex: 1, backgroundColor: Colors.background },
  modalContent: { paddingBottom: Spacing['3xl'] },
  modalImage: { width: '100%', height: 220 },
  modalTitle: { fontSize: Typography.size.xl, fontWeight: '800', color: Colors.text, padding: Spacing.base, letterSpacing: -0.4 },
  modalMeta: { fontSize: Typography.size.sm, color: Colors.textSecondary, paddingHorizontal: Spacing.base, marginBottom: Spacing.md },
  modalBody: { fontSize: Typography.size.base, color: Colors.text, lineHeight: 24, paddingHorizontal: Spacing.base },
  closeBtn: { margin: Spacing.base, backgroundColor: Colors.primary, borderRadius: Radius.lg, padding: Spacing.base, alignItems: 'center' },
  closeBtnText: { color: Colors.white, fontWeight: '700' },
});
