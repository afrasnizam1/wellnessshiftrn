// src/screens/insights/AIChatScreen.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography, Spacing, Radius, Shadow, Gradients } from '../../theme';
import { useAppStore } from '../../store';
import { aiService } from '../../services/ai';
import { gamificationService } from '../../services/gamificationService';
import { canAccessFeature } from '../../services/iap';
import type { ChatMessage } from '../../types';
import { format } from 'date-fns';
import AppScreen from '../../components/common/AppScreen';
import BackButton from '../../components/ui/BackButton';
import AnimatedPressable from '../../components/ui/AnimatedPressable';

const FREE_MESSAGE_LIMIT = 5;

const SUGGESTED_PROMPTS = [
  'How can I improve my sleep score?',
  'What should I eat to boost my energy?',
  'Give me a 5-minute stress relief technique',
  'Why is my wellness score low?',
  'What exercises suit my fitness level?',
];

export default function AIChatScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { user, chatMessages, addChatMessage, clearChat, wellnessScore, subscriptionTier } = useAppStore();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const canChat = canAccessFeature('aiChat', subscriptionTier);
  const freeMessagesUsed = chatMessages.filter((m) => m.role === 'user').length;
  const freeMessagesLeft = Math.max(0, FREE_MESSAGE_LIMIT - freeMessagesUsed);
  const isLimited = !canChat && freeMessagesLeft === 0;
  const showPrompts = chatMessages.length <= 1 && !loading;
  const canSend = !!input.trim() && !loading;

  useEffect(() => {
    if (chatMessages.length === 0) {
      addChatMessage({
        id: 'welcome',
        role: 'assistant',
        content: `Hi! I'm your AI Health Coach.\n\nI can see your wellness data and I'm here to give you personalised guidance. ${wellnessScore ? `Your current wellness score is ${wellnessScore.overall.toFixed(1)}/10.` : ''}\n\nWhat would you like to work on today?`,
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }, []);

  const promptUpgrade = () => {
    Alert.alert(
      'Free limit reached',
      'Upgrade to Growth or Pro for a higher AI coach message allowance.',
      [
        { text: 'Not now', style: 'cancel' },
        { text: 'Upgrade', onPress: () => navigation.navigate(Screen.subscriptionPaywall, { feature: 'aiChat' }) },
      ]
    );
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    if (isLimited) {
      promptUpgrade();
      return;
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    };

    addChatMessage(userMsg);
    setInput('');
    setLoading(true);
    scrollToBottom();
    if (user) gamificationService.recordEvent(user.uid, 'aiMessages').catch(() => {});

    try {
      const reply = await aiService.sendMessage([...chatMessages, userMsg], wellnessScore);
      addChatMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date().toISOString(),
      });
    } catch {
      addChatMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I couldn't connect right now. Please check your connection and try again.",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const onSendPress = () => {
    if (isLimited) {
      promptUpgrade();
      return;
    }
    sendMessage(input);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.messageRow, isUser && styles.messageRowUser]}>
        {!isUser && (
          <View style={styles.avatarAI}>
            <LinearGradient colors={[...Gradients.brand]} style={styles.avatarGradient}>
              <Ionicons name="sparkles" size={14} color={Colors.white} />
            </LinearGradient>
          </View>
        )}
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAI]}>
          {isUser ? (
            <LinearGradient
              colors={[...Gradients.brand]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          ) : null}
          <Text style={[styles.bubbleText, isUser && styles.bubbleTextUser]}>
            {item.content}
          </Text>
          <Text style={[styles.timestamp, isUser && styles.timestampUser]}>
            {format(new Date(item.timestamp), 'HH:mm')}
          </Text>
        </View>
      </View>
    );
  };

  const listHeader = showPrompts ? (
    <View style={styles.emptyHero}>
      <View style={styles.emptyIconWrap}>
        <LinearGradient colors={[...Gradients.brand]} style={styles.emptyIcon}>
          <Ionicons name="sparkles" size={28} color={Colors.white} />
        </LinearGradient>
      </View>
      <Text style={styles.emptyTitle}>Your wellness coach</Text>
      <Text style={styles.emptySub}>
        Ask about sleep, energy, stress, nutrition, or anything in your plan.
      </Text>
    </View>
  ) : null;

  return (
    <AppScreen style={styles.safe} edges={['top', 'left', 'right']} mesh>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} color={Colors.text} />
        <View style={styles.headerCenter}>
          <View style={styles.headerAvatar}>
            <LinearGradient colors={[...Gradients.brand]} style={styles.headerAvatarGradient}>
              <Ionicons name="sparkles" size={16} color={Colors.white} />
            </LinearGradient>
          </View>
          <View style={styles.headerCopy}>
            <Text style={styles.headerTitle} numberOfLines={1}>AI Health Coach</Text>
            <View style={styles.onlineIndicator}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Ready to help</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={clearChat}
          style={styles.clearBtn}
          hitSlop={8}
          accessibilityLabel="Clear chat"
        >
          <Ionicons name="trash-outline" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {!canChat && (
        <TouchableOpacity
          style={[styles.tierBanner, isLimited && styles.tierBannerLimited]}
          onPress={() => navigation.navigate(Screen.subscriptionPaywall, { feature: 'aiChat' })}
          activeOpacity={0.85}
        >
          <Ionicons
            name={isLimited ? 'lock-closed' : 'chatbubble-ellipses-outline'}
            size={14}
            color={isLimited ? Colors.brandDark : Colors.brand}
          />
          <Text style={[styles.tierBannerText, isLimited && styles.tierBannerTextLimited]}>
            {isLimited
              ? 'Free limit reached — tap to upgrade'
              : `${freeMessagesLeft} free message${freeMessagesLeft !== 1 ? 's' : ''} left — upgrade for more`}
          </Text>
          <Ionicons name="chevron-forward" size={14} color={isLimited ? Colors.brandDark : Colors.brand} />
        </TouchableOpacity>
      )}

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={chatMessages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={scrollToBottom}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          ListHeaderComponent={listHeader}
          ListFooterComponent={
            loading ? (
              <View style={styles.messageRow}>
                <View style={styles.avatarAI}>
                  <LinearGradient colors={[...Gradients.brand]} style={styles.avatarGradient}>
                    <Ionicons name="sparkles" size={14} color={Colors.white} />
                  </LinearGradient>
                </View>
                <View style={styles.typingBubble}>
                  <ActivityIndicator color={Colors.brand} size="small" />
                  <Text style={styles.typingText}>Thinking…</Text>
                </View>
              </View>
            ) : null
          }
        />

        {showPrompts && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.promptsRow}
            contentContainerStyle={styles.promptsContent}
            keyboardShouldPersistTaps="handled"
          >
            {SUGGESTED_PROMPTS.map((prompt) => (
              <AnimatedPressable
                key={prompt}
                style={styles.promptChip}
                onPress={() => sendMessage(prompt)}
              >
                <Text style={styles.promptText}>{prompt}</Text>
              </AnimatedPressable>
            ))}
          </ScrollView>
        )}

        <View style={[styles.composer, { paddingBottom: Math.max(insets.bottom, Spacing.sm) }]}>
          <Text style={styles.disclaimer}>
            Educational wellness guidance only — not medical advice.
          </Text>
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder={isLimited ? 'Upgrade to keep chatting…' : 'Ask anything about your wellness…'}
              placeholderTextColor={Colors.textTertiary}
              value={input}
              onChangeText={setInput}
              multiline
              maxLength={500}
              editable
              blurOnSubmit={false}
              returnKeyType="default"
              textAlignVertical="top"
              underlineColorAndroid="transparent"
              accessibilityLabel="Message input"
            />
            <TouchableOpacity
              style={[styles.sendBtn, !canSend && !isLimited && styles.sendBtnDisabled]}
              onPress={onSendPress}
              disabled={!canSend && !isLimited}
              accessibilityLabel={isLimited ? 'Upgrade to send' : 'Send message'}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={
                  isLimited || canSend
                    ? [...Gradients.brand]
                    : [Colors.border, Colors.border]
                }
                style={styles.sendBtnInner}
              >
                <Ionicons
                  name={isLimited ? 'lock-closed' : 'arrow-up'}
                  size={isLimited ? 16 : 20}
                  color={Colors.white}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  headerAvatarGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCopy: { flex: 1, minWidth: 0 },
  headerTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.2,
  },
  onlineIndicator: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.success },
  onlineText: { fontSize: Typography.size.xs, color: Colors.textSecondary, fontWeight: '500' },
  clearBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
  },

  tierBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.brandSubtle,
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.brandMuted,
  },
  tierBannerLimited: {
    backgroundColor: 'rgba(242, 77, 128, 0.12)',
    borderColor: Colors.brand,
  },
  tierBannerText: {
    flex: 1,
    fontSize: Typography.size.xs,
    color: Colors.brand,
    fontWeight: '600',
  },
  tierBannerTextLimited: { color: Colors.brandDark },

  messagesList: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
    flexGrow: 1,
  },

  emptyHero: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  emptyIconWrap: {
    ...Shadow.glow(Colors.brand),
    borderRadius: 28,
    marginBottom: Spacing.xs,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  emptySub: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },

  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  messageRowUser: { flexDirection: 'row-reverse' },

  avatarAI: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 2,
  },
  avatarGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bubble: {
    maxWidth: '78%',
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    gap: 4,
    overflow: 'hidden',
  },
  bubbleAI: {
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: Radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    ...Shadow.sm,
  },
  bubbleUser: {
    borderBottomRightRadius: Radius.sm,
    backgroundColor: Colors.brand,
  },
  bubbleText: {
    fontSize: Typography.size.base,
    color: Colors.text,
    lineHeight: 22,
  },
  bubbleTextUser: { color: Colors.white },
  timestamp: {
    fontSize: 10,
    color: Colors.textTertiary,
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  timestampUser: { color: 'rgba(255,255,255,0.7)' },

  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderBottomLeftRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    ...Shadow.sm,
  },
  typingText: { fontSize: Typography.size.sm, color: Colors.textSecondary },

  promptsRow: { maxHeight: 52, marginBottom: Spacing.xs },
  promptsContent: {
    paddingHorizontal: Spacing.base,
    gap: Spacing.sm,
    alignItems: 'center',
  },
  promptChip: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.brandMuted,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    ...Shadow.sm,
  },
  promptText: {
    fontSize: Typography.size.xs,
    color: Colors.brandDark,
    fontWeight: '600',
  },

  composer: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.xs,
    backgroundColor: Colors.glass,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
  disclaimer: {
    fontSize: 10,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
    lineHeight: 14,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius['2xl'],
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    paddingLeft: Spacing.md,
    paddingRight: Spacing.xs,
    paddingVertical: Spacing.xs,
    minHeight: 48,
    ...Shadow.sm,
  },
  input: {
    flex: 1,
    fontSize: Typography.size.base,
    color: Colors.text,
    maxHeight: 120,
    minHeight: 36,
    paddingTop: Platform.OS === 'ios' ? 8 : 6,
    paddingBottom: Platform.OS === 'ios' ? 8 : 6,
    paddingHorizontal: 0,
    lineHeight: 20,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 2,
  },
  sendBtnDisabled: { opacity: 0.45 },
  sendBtnInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
