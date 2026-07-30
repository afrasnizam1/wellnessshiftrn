import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { format } from 'date-fns';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import type { ClinicianStackParamList, Message } from '../../types';
import { useAppStore } from '../../store';
import { messageService } from '../../services/firebase';
import AppScreen from '../../components/common/AppScreen';

type Route = RouteProp<ClinicianStackParamList, typeof Screen.clinicianMessages>;

export default function ClinicianMessagesScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<Route>();
  const { patient } = route.params;
  const { user } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!user) return;
    const unsub = messageService.watchMessages(patient.uid, user.uid, setMessages);
    return unsub;
  }, [user, patient.uid]);

  useFocusEffect(
    useCallback(() => {
      if (!user) return;
      messageService.markMessagesRead(patient.uid, user.uid, user.uid).catch(() => {});
    }, [user, patient.uid])
  );

  const send = async () => {
    const text = input.trim();
    if (!text || !user) return;
    setInput('');
    await messageService.sendMessage(patient.uid, user.uid, {
      senderId: user.uid,
      senderName: user.displayName,
      content: text,
      timestamp: new Date().toISOString(),
      isRead: false,
      receiverId: patient.uid,
    } as Message & { receiverId: string });
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{patient.displayName}</Text>
          <Text style={styles.headerSub}>Secure messaging</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={styles.list}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => {
            const mine = item.senderId === user?.uid;
            return (
              <View style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleTheirs]}>
                <Text style={[styles.bubbleText, mine && styles.bubbleTextMine]}>{item.content}</Text>
                <Text style={[styles.bubbleTime, mine && styles.bubbleTimeMine]}>
                  {format(new Date(item.timestamp), 'HH:mm')}
                </Text>
              </View>
            );
          }}
          ListEmptyComponent={
            <Text style={styles.empty}>No messages yet. Start the conversation.</Text>
          }
        />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message…"
            placeholderTextColor={Colors.textTertiary}
            returnKeyType="send"
            onSubmitEditing={send}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={send}>
            <Text style={styles.sendBtnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerInfo: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  headerSub: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  list: { padding: Spacing.base, gap: Spacing.sm, flexGrow: 1 },
  empty: { textAlign: 'center', color: Colors.textSecondary, marginTop: Spacing.xl },
  bubble: { maxWidth: '80%', borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm },
  bubbleMine: { alignSelf: 'flex-end', backgroundColor: Colors.primary },
  bubbleTheirs: { alignSelf: 'flex-start', backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border },
  bubbleText: { fontSize: Typography.size.base, color: Colors.text },
  bubbleTextMine: { color: Colors.white },
  bubbleTime: { fontSize: 10, color: Colors.textTertiary, marginTop: 4, alignSelf: 'flex-end' },
  bubbleTimeMine: { color: 'rgba(255,255,255,0.7)' },
  inputRow: {
    flexDirection: 'row', gap: Spacing.sm, padding: Spacing.base,
    backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.border,
  },
  input: {
    flex: 1, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.xl,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.sm, color: Colors.text,
  },
  sendBtn: { backgroundColor: Colors.primary, borderRadius: Radius.xl, paddingHorizontal: Spacing.base, justifyContent: 'center' },
  sendBtnText: { color: Colors.white, fontWeight: '700' },
});
