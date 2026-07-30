// src/screens/more/SocialHubScreen.tsx
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
import { socialService, type Friend, type AccountabilityBoardEntry, type SocialChallenge } from '../../services/socialService';

export default function SocialHubScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pending, setPending] = useState<Friend[]>([]);
  const [entries, setEntries] = useState<AccountabilityBoardEntry[]>([]);
  const [challenges, setChallenges] = useState<SocialChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [friendEmail, setFriendEmail] = useState('');

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const [f, p, e, c] = await Promise.all([
      socialService.fetchFriends(user.uid),
      socialService.fetchPendingRequests(user.uid),
      socialService.fetchFriendBoardEntries(user.uid),
      socialService.fetchChallenges(),
    ]);
    setFriends(f);
    setPending(p);
    setEntries(e);
    setChallenges(c);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [user?.uid]);

  const accept = async (friendId: string) => {
    if (!user) return;
    await socialService.acceptFriendRequest(user.uid, friendId);
    load();
  };

  const sendRequest = async () => {
    if (!user || !friendEmail.trim()) return;
    // In a real app, this would look up the friend by email. Here we use the email as a placeholder ID.
    const friendId = friendEmail.trim().toLowerCase().replace(/\s+/g, '_');
    await socialService.sendFriendRequest(user.uid, friendId, user.displayName, friendEmail.trim());
    setFriendEmail('');
    load();
  };

  const recordWin = async (action: string) => {
    if (!user) return;
    await socialService.addBoardEntry(user.uid, user.displayName, action, 'general');
    load();
  };

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Social Accountability</Text>
        <Text style={styles.subtitle}>Stay connected and motivated without the pressure of rankings.</Text>

        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate(Screen.addFriend)}>
          <Ionicons name="person-add-outline" size={20} color={Colors.white} />
          <Text style={styles.fabText}>Add friend</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator style={{ marginTop: Spacing.xl }} color={Colors.primary} />
        ) : (
          <>
            <AppCard style={styles.section}>
              <Text style={styles.sectionTitle}>Friends</Text>
              {friends.length === 0 && pending.length === 0 && (
                <Text style={styles.empty}>No friends yet. Add someone to start supporting each other.</Text>
              )}
              {pending.map((req) => (
                <View key={req.friendId} style={styles.row}>
                  <View style={styles.rowText}>
                    <Text style={styles.rowName}>{req.displayName}</Text>
                    <Text style={styles.rowMeta}>Pending request</Text>
                  </View>
                  <TouchableOpacity style={styles.smallButton} onPress={() => accept(req.friendId)}>
                    <Text style={styles.smallButtonText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              ))}
              {friends.map((friend) => (
                <View key={friend.friendId} style={styles.row}>
                  <View style={styles.rowText}>
                    <Text style={styles.rowName}>{friend.displayName}</Text>
                    <Text style={styles.rowMeta}>Buddy</Text>
                  </View>
                  <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                </View>
              ))}
            </AppCard>

            <AppCard style={styles.section}>
              <Text style={styles.sectionTitle}>Buddy board</Text>
              {entries.length === 0 ? (
                <Text style={styles.empty}>Your friends' wins will appear here. No scores, just support.</Text>
              ) : (
                entries.map((entry) => (
                  <View key={entry.id} style={styles.boardRow}>
                    <Text style={styles.boardName}>{entry.displayName}</Text>
                    <Text style={styles.boardAction}>{entry.action}</Text>
                    <Text style={styles.boardTime}>{new Date(entry.createdAt).toLocaleDateString()}</Text>
                  </View>
                ))
              )}
              <TouchableOpacity style={styles.outlineButton} onPress={() => recordWin('Completed a wellness task')}>
                <Text style={styles.outlineButtonText}>Share a win</Text>
              </TouchableOpacity>
            </AppCard>

            <AppCard style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Challenges</Text>
                <TouchableOpacity onPress={() => navigation.navigate(Screen.createChallenge)}>
                  <Text style={styles.linkText}>Create</Text>
                </TouchableOpacity>
              </View>
              {challenges.length === 0 ? (
                <Text style={styles.empty}>No active challenges. Start one with your friends.</Text>
              ) : (
                challenges.map((challenge) => (
                  <TouchableOpacity
                    key={challenge.id}
                    style={styles.challengeRow}
                    onPress={() => navigation.navigate(Screen.socialChallenges, { challengeId: challenge.id })}
                  >
                    <View style={styles.rowText}>
                      <Text style={styles.rowName}>{challenge.title}</Text>
                      <Text style={styles.rowMeta}>{challenge.description}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
                  </TouchableOpacity>
                ))
              )}
            </AppCard>

            <AppCard style={styles.section}>
              <Text style={styles.sectionTitle}>Quick invite</Text>
              <TextInput
                style={styles.input}
                placeholder="Friend's email or username"
                value={friendEmail}
                onChangeText={setFriendEmail}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={Colors.textTertiary}
              />
              <TouchableOpacity style={styles.button} onPress={sendRequest}>
                <Text style={styles.buttonText}>Send invite</Text>
              </TouchableOpacity>
            </AppCard>
          </>
        )}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingTop: Spacing.xl, gap: Spacing.md, paddingBottom: Spacing['2xl'] },
  title: { fontSize: Typography.size['2xl'], fontWeight: '800', color: Colors.text, textAlign: 'center' },
  subtitle: { fontSize: Typography.size.base, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.xs },
  fab: {
    flexDirection: 'row', alignSelf: 'center', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.primary, borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
  },
  fabText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.sm },
  section: { gap: Spacing.md },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  linkText: { fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.md },
  rowText: { flex: 1 },
  rowName: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  rowMeta: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: 2 },
  boardRow: { borderBottomWidth: 1, borderBottomColor: Colors.borderLight, paddingVertical: Spacing.sm },
  boardName: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text },
  boardAction: { fontSize: Typography.size.base, color: Colors.textSecondary, marginTop: 2 },
  boardTime: { fontSize: Typography.size.xs, color: Colors.textTertiary, marginTop: 2 },
  empty: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center', marginVertical: Spacing.sm },
  input: {
    borderWidth: 1, borderColor: Colors.borderLight, borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    fontSize: Typography.size.base, color: Colors.text,
  },
  button: {
    backgroundColor: Colors.primary, borderRadius: Radius.lg,
    paddingVertical: Spacing.md, alignItems: 'center',
  },
  buttonText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.base },
  outlineButton: {
    borderWidth: 1, borderColor: Colors.primary, borderRadius: Radius.lg,
    paddingVertical: Spacing.sm, alignItems: 'center',
  },
  outlineButtonText: { color: Colors.primary, fontWeight: '700', fontSize: Typography.size.base },
  smallButton: {
    backgroundColor: Colors.primary, borderRadius: Radius.md,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
  },
  smallButtonText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.sm },
  challengeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.md, paddingVertical: Spacing.sm },
});
