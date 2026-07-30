// src/screens/more/SocialFeedScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppScreen from '../../components/common/AppScreen';
import { AppCard } from '../../components/ui';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { useAppStore } from '../../store';
import { Screen } from '../../navigation/screenNames';
import { socialService, type SocialChallenge, type AccountabilityBoardEntry } from '../../services/socialService';

interface FeedPost {
  id: string;
  userId: string;
  displayName: string;
  avatar?: string;
  content: string;
  category: string;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

export default function SocialFeedScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [challenges, setChallenges] = useState<SocialChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const loadFeed = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Fetch friend board entries as feed posts
      const entries = await socialService.fetchFriendBoardEntries(user.uid);
      const feedPosts: FeedPost[] = entries.map(entry => ({
        id: entry.id,
        userId: entry.userId,
        displayName: entry.displayName,
        content: entry.action,
        category: entry.category,
        createdAt: entry.createdAt,
        likes: Math.floor(Math.random() * 5), // Mock likes
        comments: Math.floor(Math.random() * 3), // Mock comments
        isLiked: false,
      }));
      
      // Add some mock community posts
      const mockPosts: FeedPost[] = [
        {
          id: 'mock1',
          userId: 'community',
          displayName: 'Community Challenge',
          content: 'Complete 10 minutes of mindfulness meditation today',
          category: 'mental',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          likes: 12,
          comments: 4,
          isLiked: false,
        },
        {
          id: 'mock2',
          userId: 'community',
          displayName: 'Weekly Wellness Tip',
          content: 'Drinking water first thing in the morning helps kickstart your metabolism',
          category: 'nutrition',
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          likes: 8,
          comments: 2,
          isLiked: true,
        },
      ];

      setPosts([...feedPosts, ...mockPosts].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
      
      const activeChallenges = await socialService.fetchChallenges();
      setChallenges(activeChallenges);
    } catch (e) {
      console.warn('Failed to load feed:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, [user?.uid]);

  const handleCreatePost = async () => {
    if (!user || !newPost.trim()) return;
    try {
      await socialService.addBoardEntry(user.uid, user.displayName, newPost.trim(), 'general');
      setNewPost('');
      setShowCreatePost(false);
      loadFeed();
    } catch (e) {
      console.warn('Failed to create post:', e);
    }
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const joinChallenge = async (challengeId: string) => {
    if (!user) return;
    try {
      await socialService.joinChallenge(challengeId, user.uid, user.displayName);
      loadFeed();
    } catch (e) {
      console.warn('Failed to join challenge:', e);
    }
  };

  if (loading) {
    return (
      <AppScreen style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading community feed...</Text>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Community Feed</Text>
          <TouchableOpacity 
            style={styles.createButton} 
            onPress={() => setShowCreatePost(!showCreatePost)}
          >
            <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {showCreatePost && (
          <AppCard style={styles.createPostCard}>
            <TextInput
              style={styles.postInput}
              placeholder="Share your wellness win..."
              value={newPost}
              onChangeText={setNewPost}
              multiline
              maxLength={200}
              placeholderTextColor={Colors.textTertiary}
            />
            <View style={styles.postActions}>
              <TouchableOpacity 
                style={[styles.postButton, !newPost.trim() && styles.postButtonDisabled]}
                onPress={handleCreatePost}
                disabled={!newPost.trim()}
              >
                <Text style={styles.postButtonText}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => { setShowCreatePost(false); setNewPost(''); }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </AppCard>
        )}

        {challenges.length > 0 && (
          <AppCard style={styles.section}>
            <Text style={styles.sectionTitle}>Active Challenges</Text>
            {challenges.map((challenge) => (
              <TouchableOpacity 
                key={challenge.id} 
                style={styles.challengeCard}
                onPress={() => navigation.navigate(Screen.socialChallenges, { challengeId: challenge.id })}
              >
                <View style={styles.challengeHeader}>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <Text style={styles.challengeParticipants}>
                    {challenge.participantCount} participants
                  </Text>
                </View>
                <Text style={styles.challengeDescription}>{challenge.description}</Text>
                <TouchableOpacity 
                  style={styles.joinButton}
                  onPress={() => joinChallenge(challenge.id)}
                >
                  <Text style={styles.joinButtonText}>Join Challenge</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </AppCard>
        )}

        <AppCard style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Updates</Text>
          {posts.length === 0 ? (
            <Text style={styles.emptyText}>No posts yet. Be the first to share!</Text>
          ) : (
            posts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.userInfo}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>
                        {post.displayName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userName}>{post.displayName}</Text>
                      <Text style={styles.postTime}>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{post.category}</Text>
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.postContent}>{post.content}</Text>
                
                <View style={styles.postFooter}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleLike(post.id)}
                  >
                    <Ionicons 
                      name={post.isLiked ? "heart" : "heart-outline"} 
                      size={20} 
                      color={post.isLiked ? Colors.error : Colors.textSecondary} 
                    />
                    <Text style={[styles.actionText, post.isLiked && styles.actionTextLiked]}>
                      {post.likes}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="chatbubble-outline" size={20} color={Colors.textSecondary} />
                    <Text style={styles.actionText}>{post.comments}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </AppCard>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    gap: Spacing.md,
  },
  loadingText: { 
    fontSize: Typography.size.base, 
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  content: { 
    padding: Spacing.base, 
    paddingTop: Spacing.xl, 
    gap: Spacing.md, 
    paddingBottom: Spacing['2xl'] 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: { 
    fontSize: Typography.size['2xl'], 
    fontWeight: '800', 
    color: Colors.text 
  },
  createButton: {
    padding: Spacing.sm,
  },
  createPostCard: {
    gap: Spacing.md,
    padding: Spacing.md,
  },
  postInput: {
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    fontSize: Typography.size.base,
    color: Colors.text,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  postActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  postButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  postButtonDisabled: {
    backgroundColor: Colors.borderLight,
  },
  postButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.base,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Colors.textSecondary,
    fontWeight: '700',
    fontSize: Typography.size.base,
  },
  section: { gap: Spacing.md },
  sectionTitle: { 
    fontSize: Typography.size.lg, 
    fontWeight: '700', 
    color: Colors.text 
  },
  emptyText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: Spacing.lg,
  },
  challengeCard: {
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    gap: Spacing.sm,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  challengeParticipants: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  challengeDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  joinButton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  joinButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.sm,
  },
  postCard: {
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    gap: Spacing.sm,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.base,
  },
  userDetails: {
    gap: 2,
  },
  userName: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  postTime: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
  },
  categoryBadge: {
    backgroundColor: Colors.borderLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
  },
  categoryText: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  postContent: {
    fontSize: Typography.size.base,
    color: Colors.text,
    lineHeight: 20,
  },
  postFooter: {
    flexDirection: 'row',
    gap: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  actionText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  actionTextLiked: {
    color: Colors.error,
  },
});
