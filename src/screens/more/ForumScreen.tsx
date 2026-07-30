import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../navigation/screenNames';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, ScreenHeader, SegmentedControl } from '../../components/ui';
import { FORUM_GROUPS, FORUM_POSTS, type ForumPost } from '../../data/forumData';
import AppScreen from '../../components/common/AppScreen';

const TABS = ['Feed', 'Groups', 'Support'];

export default function ForumScreen() {
  const navigation = useNavigation<any>();
  const [tab, setTab] = useState('Feed');
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<ForumPost[]>(FORUM_POSTS);
  const [draft, setDraft] = useState('');

  const filtered = posts.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q);
  });

  const publish = () => {
    if (!draft.trim()) return;
    const post: ForumPost = {
      id: String(Date.now()),
      title: draft.trim().slice(0, 80),
      content: draft.trim(),
      author: 'You',
      group: 'General Wellness',
      postType: 'Discussion',
      likes: 0,
      replies: 0,
      tags: [],
      createdAt: 'Just now',
    };
    setPosts((prev) => [post, ...prev]);
    setDraft('');
    Alert.alert('Posted', 'Your post is visible in the community feed.');
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <ScreenHeader title="Community" subtitle="Connect with others on your wellness journey" onBack={() => navigation.goBack()} />
        <SegmentedControl options={TABS} value={tab} onChange={setTab} compact />
      </View>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {tab === 'Feed' && (
          <>
            <View style={styles.searchWrap}>
              <Ionicons name="search" size={18} color={Colors.textTertiary} />
              <TextInput
                style={styles.search}
                placeholder="Search posts..."
                placeholderTextColor={Colors.textTertiary}
                value={query}
                onChangeText={setQuery}
              />
            </View>
            <AppCard style={styles.compose}>
              <TextInput
                style={styles.composeInput}
                placeholder="Share an update or question..."
                placeholderTextColor={Colors.textTertiary}
                value={draft}
                onChangeText={setDraft}
                multiline
              />
              <TouchableOpacity style={styles.postBtn} onPress={publish}>
                <Text style={styles.postBtnText}>Post</Text>
              </TouchableOpacity>
            </AppCard>
            {filtered.map((post) => (
              <AppCard key={post.id} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <Text style={styles.postType}>{post.postType}</Text>
                  <Text style={styles.postTime}>{post.createdAt}</Text>
                </View>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postContent}>{post.content}</Text>
                <Text style={styles.postMeta}>{post.author} · {post.group}</Text>
                <View style={styles.postStats}>
                  <Text style={styles.stat}>{post.likes} likes</Text>
                  <Text style={styles.stat}>{post.replies} replies</Text>
                </View>
              </AppCard>
            ))}
          </>
        )}
        {tab === 'Groups' && FORUM_GROUPS.map((g) => (
          <AppCard key={g} style={styles.groupCard}>
            <Text style={styles.groupTitle}>{g}</Text>
            <Text style={styles.groupSub}>{posts.filter((p) => p.group === g).length} posts</Text>
          </AppCard>
        ))}
        {tab === 'Support' && (
          <AppCard>
            <Text style={styles.supportTitle}>Need help?</Text>
            <Text style={styles.supportBody}>
              This community is for peer support. For medical emergencies call 999. For non-urgent NHS advice call 111.
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate(Screen.help)}>
              <Text style={styles.supportLink}>Open Help & FAQ →</Text>
            </TouchableOpacity>
          </AppCard>
        )}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.base, paddingTop: Spacing.sm, gap: Spacing.sm },
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing['3xl'] },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.surfaceSecondary, borderRadius: Radius.md, paddingHorizontal: Spacing.md, paddingVertical: 10,
  },
  search: { flex: 1, fontSize: Typography.size.base, color: Colors.text, padding: 0 },
  compose: { gap: Spacing.sm },
  composeInput: { minHeight: 72, fontSize: Typography.size.base, color: Colors.text, textAlignVertical: 'top' },
  postBtn: { alignSelf: 'flex-end', backgroundColor: Colors.primary, borderRadius: Radius.md, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm },
  postBtnText: { color: Colors.white, fontWeight: '700' },
  postCard: { gap: Spacing.xs },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  postType: { fontSize: Typography.size.xs, fontWeight: '700', color: Colors.primary },
  postTime: { fontSize: Typography.size.xs, color: Colors.textTertiary },
  postTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  postContent: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  postMeta: { fontSize: Typography.size.xs, color: Colors.textTertiary },
  postStats: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.xs },
  stat: { fontSize: Typography.size.xs, color: Colors.textSecondary, fontWeight: '600' },
  groupCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  groupTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  groupSub: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  supportTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text, marginBottom: Spacing.sm },
  supportBody: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20, marginBottom: Spacing.md },
  supportLink: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.primary },
});
