// src/screens/more/MessagesScreen.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput,
  TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { useAppStore } from '../../store';
import { messageService } from '../../services/firebase';
import { clinicianService } from '../../services/clinicianService';
import { format } from 'date-fns';
import type { Message } from '../../types';
import AppScreen from '../../components/common/AppScreen';

interface ClinicianInfo {
  clinicianId: string;
  clinicianName: string;
  specialty?: string;
}

export default function MessagesScreen() {
  const navigation = useNavigation<any>();
  const { user, carePlan } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [clinician, setClinician] = useState<ClinicianInfo | null>(null);
  const [loadingClinician, setLoadingClinician] = useState(true);
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!user) return;
    if (carePlan) {
      setClinician({
        clinicianId: carePlan.clinicianId,
        clinicianName: carePlan.clinicianName,
        specialty: carePlan.specialty,
      });
      setLoadingClinician(false);
      return;
    }
    setLoadingClinician(true);
    clinicianService.getPatientClinicianInfo(user.uid).then((info) => {
      setClinician(info);
      setLoadingClinician(false);
    });
  }, [user, carePlan]);

  useEffect(() => {
    if (!user || !clinician) return;
    const unsub = messageService.watchMessages(user.uid, clinician.clinicianId, (msgs) => {
      setMessages(msgs);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    });
    return unsub;
  }, [user, clinician]);

  useFocusEffect(
    useCallback(() => {
      if (!user || !clinician) return;
      messageService.markMessagesRead(user.uid, clinician.clinicianId, user.uid).catch(() => {});
    }, [user, clinician])
  );

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || !user || !clinician || sending) return;
    setInput('');
    setSending(true);
    try {
      await messageService.sendMessage(user.uid, clinician.clinicianId, {
        senderId: user.uid,
        senderName: user.displayName,
        receiverId: clinician.clinicianId,
        content: text,
        timestamp: new Date().toISOString(),
        isRead: false,
      });
    } finally {
      setSending(false);
    }
  };

  if (loadingClinician) {
    return (
      <AppScreen style={[styles.safe, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </AppScreen>
    );
  }

  if (!clinician) {
    return (
      <AppScreen style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Messages</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>💬</Text>
          <Text style={styles.emptyTitle}>No clinician connected</Text>
          <Text style={styles.emptySub}>Connect with a clinician to start messaging.</Text>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{clinician.clinicianName}</Text>
          {clinician.specialty ? (
            <Text style={styles.headerSub}>{clinician.specialty}</Text>
          ) : null}
        </View>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyChat}>
              <Text style={styles.emptyChatText}>No messages yet. Say hello to your clinician!</Text>
            </View>
          }
          renderItem={({ item }) => {
            const isMe = item.senderId === user?.uid;
            return (
              <View style={[styles.messageRow, isMe && styles.messageRowMe]}>
                <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
                  {!isMe && <Text style={styles.senderName}>{item.senderName}</Text>}
                  <Text style={[styles.messageText, isMe && styles.messageTextMe]}>{item.content}</Text>
                  <Text style={[styles.messageTime, isMe && styles.messageTimeMe]}>
                    {format(new Date(item.timestamp), 'HH:mm')}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Message your clinician…"
            placeholderTextColor={Colors.textTertiary}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!input.trim() || sending) && styles.sendBtnDisabled]}
            onPress={sendMessage}
            disabled={!input.trim() || sending}
          >
            {sending ? (
              <ActivityIndicator color={Colors.white} size="small" />
            ) : (
              <Text style={styles.sendBtnText}>↑</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  centered: { justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  headerSub: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  messagesList: { padding: Spacing.base, gap: Spacing.sm, paddingBottom: Spacing.lg },
  messageRow: { flexDirection: 'row' },
  messageRowMe: { flexDirection: 'row-reverse' },
  bubble: { maxWidth: '78%', borderRadius: Radius.lg, padding: Spacing.md, gap: 2 },
  bubbleThem: { backgroundColor: Colors.white, borderBottomLeftRadius: 4, ...Shadow.sm },
  bubbleMe: { backgroundColor: Colors.primary, borderBottomRightRadius: 4 },
  senderName: { fontSize: Typography.size.xs, fontWeight: '700', color: Colors.primary, marginBottom: 2 },
  messageText: { fontSize: Typography.size.sm, color: Colors.text, lineHeight: 20 },
  messageTextMe: { color: Colors.white },
  messageTime: { fontSize: 10, color: Colors.textTertiary, alignSelf: 'flex-end', marginTop: 2 },
  messageTimeMe: { color: 'rgba(255,255,255,0.6)' },
  emptyChat: { alignItems: 'center', paddingTop: Spacing['3xl'] },
  emptyChatText: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center' },
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.sm,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.border,
  },
  input: {
    flex: 1, borderWidth: 1.5, borderColor: Colors.border,
    borderRadius: Radius.xl, paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm, fontSize: Typography.size.base,
    color: Colors.text, maxHeight: 100, backgroundColor: Colors.surfaceSecondary,
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: Colors.border },
  sendBtnText: { color: Colors.white, fontSize: 18, fontWeight: '700' },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.md, padding: Spacing.xl },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text },
  emptySub: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center' },
});
