// src/screens/more/SocialChallengesScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppScreen from '../../components/common/AppScreen';
import { AppCard } from '../../components/ui';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { useAppStore } from '../../store';
import { Screen } from '../../navigation/screenNames';
import { socialService, type SocialChallenge } from '../../services/socialService';

interface RouteParams {
  challengeId?: string;
}

export default function SocialChallengesScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { user } = useAppStore();
  const [challenges, setChallenges] = useState<SocialChallenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<SocialChallenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'joined' | 'created'>('active');

  const challengeId = route.params?.challengeId;

  const loadChallenges = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const allChallenges = await socialService.fetchChallenges();
      setChallenges(allChallenges);
      
      if (challengeId) {
        const challenge = allChallenges.find(c => c.id === challengeId);
        if (challenge) {
          setSelectedChallenge(challenge);
        }
      }
    } catch (e) {
      console.warn('Failed to load challenges:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChallenges();
  }, [user?.uid, challengeId]);

  const joinChallenge = async (challengeId: string) => {
    if (!user) return;
    try {
      await socialService.joinChallenge(challengeId, user.uid, user.displayName);
      loadChallenges();
    } catch (e) {
      console.warn('Failed to join challenge:', e);
    }
  };

  const leaveChallenge = async (challengeId: string) => {
    if (!user) return;
    try {
      await socialService.leaveChallenge(challengeId, user.uid);
      loadChallenges();
    } catch (e) {
      console.warn('Failed to leave challenge:', e);
    }
  };

  const getFilteredChallenges = () => {
    if (!user) return challenges;
    
    switch (activeTab) {
      case 'joined':
        return challenges.filter(c => c.participants?.some(p => p.userId === user.uid));
      case 'created':
        return challenges.filter(c => c.createdBy === user.uid);
      default:
        return challenges;
    }
  };

  const isUserJoined = (challenge: SocialChallenge) => {
    return user && challenge.participants?.some(p => p.userId === user.uid);
  };

  const getChallengeProgress = (challenge: SocialChallenge) => {
    const userParticipant = challenge.participants?.find(p => p.userId === user?.uid);
    return userParticipant?.progress || 0;
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  if (loading) {
    return (
      <AppScreen style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading challenges...</Text>
        </View>
      </AppScreen>
    );
  }

  if (selectedChallenge) {
    return (
      <AppScreen style={styles.safe}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.detailHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setSelectedChallenge(null)}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>
            <Text style={styles.detailTitle}>Challenge Details</Text>
          </View>

          <AppCard style={styles.challengeDetailCard}>
            <View style={styles.challengeDetailHeader}>
              <View style={styles.categoryBadge}>
                <Ionicons name="fitness-outline" size={16} color={Colors.white} />
                <Text style={styles.categoryText}>{selectedChallenge.category}</Text>
              </View>
              <Text style={styles.durationText}>
                {getDaysRemaining(selectedChallenge.endDate)} days left
              </Text>
            </View>
            
            <Text style={styles.challengeTitle}>{selectedChallenge.title}</Text>
            <Text style={styles.challengeDescription}>{selectedChallenge.description}</Text>
            
            <View style={styles.challengeStats}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{selectedChallenge.participantCount}</Text>
                <Text style={styles.statLabel}>Participants</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{selectedChallenge.duration}</Text>
                <Text style={styles.statLabel}>Days</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{selectedChallenge.targetValue}</Text>
                <Text style={styles.statLabel}>{selectedChallenge.targetUnit}/day</Text>
              </View>
            </View>

            {isUserJoined(selectedChallenge) && (
              <View style={styles.progressSection}>
                <Text style={styles.progressTitle}>Your Progress</Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${Math.min(100, (getChallengeProgress(selectedChallenge) / selectedChallenge.targetValue) * 100)}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {getChallengeProgress(selectedChallenge)} / {selectedChallenge.targetValue} {selectedChallenge.targetUnit} today
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.actionButton,
                isUserJoined(selectedChallenge) ? styles.leaveButton : styles.joinButton,
              ]}
              onPress={() => isUserJoined(selectedChallenge) 
                ? leaveChallenge(selectedChallenge.id) 
                : joinChallenge(selectedChallenge.id)
              }
            >
              <Text style={[
                styles.actionButtonText,
                isUserJoined(selectedChallenge) ? styles.leaveButtonText : styles.joinButtonText,
              ]}>
                {isUserJoined(selectedChallenge) ? 'Leave Challenge' : 'Join Challenge'}
              </Text>
            </TouchableOpacity>
          </AppCard>

          <AppCard style={styles.participantsCard}>
            <Text style={styles.participantsTitle}>Participants</Text>
            {selectedChallenge.participants?.slice(0, 10).map((participant, index) => (
              <View key={participant.userId} style={styles.participantRow}>
                <Text style={styles.participantRank}>{index + 1}</Text>
                <View style={styles.participantAvatar}>
                  <Text style={styles.avatarText}>
                    {participant.displayName.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.participantName}>{participant.displayName}</Text>
                <Text style={styles.participantProgress}>
                  {participant.progress}/{selectedChallenge.targetValue}
                </Text>
              </View>
            ))}
          </AppCard>
        </ScrollView>
      </AppScreen>
    );
  }

  const filteredChallenges = getFilteredChallenges();

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Challenges</Text>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => navigation.navigate(Screen.createChallenge)}
          >
            <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
          {(['active', 'joined', 'created'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.tabActive,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredChallenges.length === 0 ? (
          <AppCard style={styles.emptyCard}>
            <Ionicons name="trophy-outline" size={48} color={Colors.textTertiary} />
            <Text style={styles.emptyTitle}>No challenges found</Text>
            <Text style={styles.emptyText}>
              {activeTab === 'created' 
                ? 'Create your first challenge to motivate others!'
                : activeTab === 'joined'
                ? 'Join a challenge to start your wellness journey!'
                : 'Be the first to create a challenge!'
              }
            </Text>
            {activeTab !== 'created' && (
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation.navigate(Screen.createChallenge)}
              >
                <Text style={styles.emptyButtonText}>Create Challenge</Text>
              </TouchableOpacity>
            )}
          </AppCard>
        ) : (
          filteredChallenges.map((challenge) => (
            <TouchableOpacity
              key={challenge.id}
              style={styles.challengeCard}
              onPress={() => setSelectedChallenge(challenge)}
            >
              <View style={styles.challengeHeader}>
                <View style={styles.challengeCategory}>
                  <Ionicons name="fitness-outline" size={16} color={Colors.white} />
                  <Text style={styles.challengeCategoryText}>{challenge.category}</Text>
                </View>
                <Text style={styles.challengeDays}>
                  {getDaysRemaining(challenge.endDate)} days left
                </Text>
              </View>
              
              <Text style={styles.challengeCardTitle}>{challenge.title}</Text>
              <Text style={styles.challengeCardDescription}>{challenge.description}</Text>
              
              <View style={styles.challengeFooter}>
                <View style={styles.challengeMeta}>
                  <Ionicons name="people-outline" size={16} color={Colors.textSecondary} />
                  <Text style={styles.metaText}>{challenge.participantCount} joined</Text>
                </View>
                <View style={styles.challengeMeta}>
                  <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
                  <Text style={styles.metaText}>{challenge.duration} days</Text>
                </View>
                {isUserJoined(challenge) && (
                  <View style={styles.joinedBadge}>
                    <Text style={styles.joinedText}>Joined</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}
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
  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radius.lg,
    padding: Spacing.xs,
    marginBottom: Spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: Radius.md,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.white,
  },
  emptyCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  emptyTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  emptyText: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  emptyButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.base,
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
  challengeCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
  },
  challengeCategoryText: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.white,
  },
  challengeDays: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
  },
  challengeCardTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  challengeCardDescription: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  metaText: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
  },
  joinedBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
  },
  joinedText: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.white,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  backButton: {
    padding: Spacing.sm,
  },
  detailTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  challengeDetailCard: {
    gap: Spacing.md,
  },
  challengeDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
  },
  categoryText: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.white,
  },
  durationText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  challengeTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  challengeDescription: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  challengeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.md,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radius.lg,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  progressSection: {
    gap: Spacing.sm,
  },
  progressTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.success,
  },
  progressText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  actionButton: {
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: Colors.primary,
  },
  leaveButton: {
    backgroundColor: Colors.borderLight,
  },
  actionButtonText: {
    fontWeight: '700',
    fontSize: Typography.size.base,
  },
  joinButtonText: {
    color: Colors.white,
  },
  leaveButtonText: {
    color: Colors.textSecondary,
  },
  participantsCard: {
    gap: Spacing.md,
  },
  participantsTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  participantRank: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    width: 20,
  },
  participantAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.sm,
  },
  participantName: {
    flex: 1,
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  participantProgress: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
});
