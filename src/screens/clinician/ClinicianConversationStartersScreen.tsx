import React, { useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import AppScreen from '../../components/common/AppScreen';

const STARTERS = [
  { category: 'Check-in', prompts: [
    'How have you been feeling since our last visit?',
    'What was the hardest part of your care plan this week?',
    'Is there anything you’d like to adjust in your daily tasks?',
  ]},
  { category: 'Motivation', prompts: [
    'What small win are you most proud of this week?',
    'What would make sticking to your plan easier?',
    'Which wellness module helped you most recently?',
  ]},
  { category: 'Clinical', prompts: [
    'Have you noticed any new symptoms we should discuss?',
    'Are you taking medications as prescribed?',
    'How is your sleep and energy compared to last week?',
  ]},
];

export default function ClinicianConversationStartersScreen() {
  const navigation = useNavigation<any>();
  const [copied, setCopied] = useState<string | null>(null);

  const sharePrompt = async (text: string) => {
    setCopied(text);
    await Share.share({ message: text });
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conversation Starters</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.intro}>Tap a prompt to share via messages or copy to your patient chat.</Text>
        {STARTERS.map((group) => (
          <View key={group.category} style={styles.section}>
            <Text style={styles.sectionTitle}>{group.category}</Text>
            {group.prompts.map((p) => (
              <TouchableOpacity key={p} style={styles.promptCard} onPress={() => sharePrompt(p)}>
                <Text style={styles.promptText}>{p}</Text>
                {copied === p && <Text style={styles.copied}>Shared</Text>}
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <TouchableOpacity style={styles.inboxBtn} onPress={() => navigation.navigate(Screen.clinicianInbox)}>
          <Text style={styles.inboxBtnText}>Open message inbox →</Text>
        </TouchableOpacity>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.base, gap: Spacing.md },
  intro: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  section: { gap: Spacing.sm },
  sectionTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  promptCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm },
  promptText: { fontSize: Typography.size.sm, color: Colors.text, lineHeight: 22 },
  copied: { marginTop: Spacing.xs, fontSize: Typography.size.xs, color: Colors.success, fontWeight: '600' },
  inboxBtn: { alignItems: 'center', paddingVertical: Spacing.md },
  inboxBtnText: { color: Colors.primary, fontWeight: '700' },
});
