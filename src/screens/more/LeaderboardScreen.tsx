// src/screens/more/LeaderboardScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppScreen from '../../components/common/AppScreen';
import { AppCard } from '../../components/ui';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { useAppStore } from '../../store';
import { Screen } from '../../navigation/screenNames';
import { socialService, type AccountabilityBoardEntry } from '../../services/socialService';

interface LeaderboardEntry {
  id: string;
  displayName: string;
  avatar?: string;
  weeklyActions: number;
  totalActions: number;
  currentStreak: number;
  longestStreak: number;
  isCurrentUser: boolean;
}

export default function LeaderboardScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('week');

  const loadLeaderboard = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Fetch friend board entries and transform into leaderboard
      const friendEntries = await socialService.fetchFriendBoardEntries(user.uid);
      
      // Mock additional leaderboard data for demonstration
      const mockData: LeaderboardEntry[] = [
        {
          id: 'mock1',
          displayName: 'Alex Chen',
          weeklyActions: 12,
          totalActions: 145,
          currentStreak: 7,
          longestStreak: 21,
          isCurrentUser: false,
        },
        {
          id: 'mock2',
          displayName: 'Sarah Johnson',
          weeklyActions: 10,
          totalActions: 132,
          currentStreak: 5,
          longestStreak: 18,
          isCurrentUser: false,
        },
        {
          id: 'mock3',
          displayName: 'Mike Williams',
          weeklyActions: 9,
          totalActions: 98,
          currentStreak: 3,
          longestStreak: 12,
          isCurrentUser: false,
        },
      ];

      // Transform friend entries to leaderboard format
      const friendLeaderboard: LeaderboardEntry[] = friendEntries.map((entry, index) => ({
        id: entry.id,
        displayName: entry.displayName,
        weeklyActions: Math.max(1, Math.floor(Math.random() * 15)), // Mock weekly count
        totalActions: Math.max(5, Math.floor(Math.random() * 200)), // Mock total count
        currentStreak: Math.floor(Math.random() * 10), // Mock streak
        longestStreak: Math.max(5, Math.floor(Math.random() * 30)), // Mock longest streak
        isCurrentUser: entry.userId === user.uid,
      }));

      // Add current user if not in friends list
      const currentUserEntry: LeaderboardEntry = {
        id: user.uid,
        displayName: user.displayName || 'You',
        weeklyActions: 8,
        totalActions: 76,
        currentStreak: 4,
        longestStreak: 15,
        isCurrentUser: true,
      };

      const allEntries = [...mockData, ...friendLeaderboard];
      if (!allEntries.some(e => e.isCurrentUser)) {
        allEntries.push(currentUserEntry);
      }

      // Sort by weekly actions (no ranking emphasis, just grouping)
      const sorted = allEntries.sort((a, b) => b.weeklyActions - a.weeklyActions);
      setEntries(sorted);
    } catch (e) {
      console.warn('Failed to load leaderboard:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaderboard();
  }, [user?.uid]);

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 0: return 'medal';
      case 1: return 'medal-outline';
      case 2: return 'ribbon';
      default: return 'ellipse-outline';
    }
  };

  const getMedalColor = (position: number) => {
    switch (position) {
      case 0: return Colors.warning;
      case 1: return Colors.textSecondary;
      case 2: return Colors.warningDark;
      default: return Colors.borderLight;
    }
  };

  if (loading) {
    return (
      <AppScreen style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading community stats...</Text>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Community Progress</Text>
          <Text style={styles.subtitle}>Celebrating collective wellness achievements</Text>
        </View>

        <AppCard style={styles.filterCard}>
          <View style={styles.filterButtons}>
            {(['week', 'month', 'all'] as const).map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  timeFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setTimeFilter(filter)}
              >
                <Text style={[
                  styles.filterButtonText,
                  timeFilter === filter && styles.filterButtonTextActive,
                ]}>
                  {filter === 'week' ? 'This Week' : filter === 'month' ? 'This Month' : 'All Time'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AppCard>

        <AppCard style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{entries.length}</Text>
              <Text style={styles.statLabel}>Active Members</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {entries.reduce((sum, e) => sum + e.weeklyActions, 0)}
              </Text>
              <Text style={styles.statLabel}>Weekly Actions</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {Math.max(...entries.map(e => e.currentStreak))}
              </Text>
              <Text style={styles.statLabel}>Top Streak</Text>
            </View>
          </View>
        </AppCard>

        <AppCard style={styles.leaderboardCard}>
          <Text style={styles.sectionTitle}>Community Actions</Text>
          <Text style={styles.sectionSubtitle}>No rankings, just collective progress</Text>
          
          {entries.length === 0 ? (
            <Text style={styles.emptyText}>No activity this week. Start the momentum!</Text>
          ) : (
            entries.map((entry, index) => (
              <View
                key={entry.id}
                style={[
                  styles.entryRow,
                  entry.isCurrentUser && styles.currentUserRow,
                ]}
              >
                <View style={styles.positionColumn}>
                  <Ionicons
                    name={getMedalIcon(index)}
                    size={20}
                    color={getMedalColor(index)}
                  />
                  <Text style={styles.positionText}>{index + 1}</Text>
                </View>

                <View style={styles.userColumn}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {entry.displayName.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.userInfo}>
                    <Text style={[
                      styles.userName,
                      entry.isCurrentUser && styles.currentUserText,
                    ]}>
                      {entry.displayName}
                      {entry.isCurrentUser && ' (You)'}
                    </Text>
                    <Text style={styles.userMeta}>
                      Streak: {entry.currentStreak} · Best: {entry.longestStreak}
                    </Text>
                  </View>
                </View>

                <View style={styles.actionsColumn}>
                  <Text style={styles.actionsNumber}>{entry.weeklyActions}</Text>
                  <Text style={styles.actionsLabel}>actions</Text>
                </View>

                <View style={styles.totalColumn}>
                  <Text style={styles.totalNumber}>{entry.totalActions}</Text>
                  <Text style={styles.totalLabel}>total</Text>
                </View>
              </View>
            ))
          )}
        </AppCard>

        <AppCard style={styles.motivationCard}>
          <View style={styles.motivationContent}>
            <Ionicons name="heart" size={24} color={Colors.error} />
            <Text style={styles.motivationText}>
              Every action counts towards collective wellness. Keep supporting each other!
            </Text>
          </View>
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
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: { 
    fontSize: Typography.size['2xl'], 
    fontWeight: '800', 
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.size.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  filterCard: {
    padding: Spacing.sm,
  },
  filterButtons: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radius.lg,
    padding: Spacing.xs,
  },
  filterButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: Radius.md,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterButtonText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterButtonTextActive: {
    color: Colors.white,
  },
  statsCard: {
    padding: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
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
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.borderLight,
  },
  leaderboardCard: {
    gap: Spacing.md,
    padding: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  sectionSubtitle: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  emptyText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: Spacing.lg,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  currentUserRow: {
    backgroundColor: Colors.primary + '10',
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.sm,
  },
  positionColumn: {
    alignItems: 'center',
    width: 40,
  },
  positionText: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 2,
  },
  userColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: Spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Typography.size.sm,
  },
  userInfo: {
    marginLeft: Spacing.sm,
    flex: 1,
  },
  userName: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  currentUserText: {
    color: Colors.primary,
  },
  userMeta: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  actionsColumn: {
    alignItems: 'center',
    width: 60,
  },
  actionsNumber: {
    fontSize: Typography.size.lg,
    fontWeight: '800',
    color: Colors.text,
  },
  actionsLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
  },
  totalColumn: {
    alignItems: 'center',
    width: 60,
  },
  totalNumber: {
    fontSize: Typography.size.base,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  totalLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textTertiary,
  },
  motivationCard: {
    padding: Spacing.md,
  },
  motivationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  motivationText: {
    flex: 1,
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
