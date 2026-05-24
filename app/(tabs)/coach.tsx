import { useState, useRef } from 'react';
import {
  View, Text, TextInput, Pressable,
  FlatList, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatBubble from '../../components/ChatBubble';
import { useChat } from '../../store/useChat';
import { useProfile } from '../../store/useProfile';
import { sendCoachMessage } from '../../lib/api';

const QUICK_PROMPTS = ['Form check', 'Why this exercise?', "I'm sore"];

function errorMessage(e: unknown): string {
  if (e instanceof Error) {
    if (e.message.includes('404')) return "Backend not connected yet — deploy to Railway first.";
    if (e.message.includes('401') || e.message.includes('403')) return "API key invalid or missing.";
    if (e.message.includes('529') || e.message.includes('overload')) return "Claude is overloaded, try again in a moment.";
    if (e.message.includes('fetch') || e.message.includes('network')) return "Can't reach the backend — check your internet.";
    return e.message;
  }
  return "Something went wrong. Try again.";
}

export default function Coach() {
  const { messages, addUserMessage, addAssistantMessage } = useChat();
  const { intake } = useProfile();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput('');
    addUserMessage(trimmed);

    const history = [...messages, { role: 'user' as const, content: trimmed }];
    setLoading(true);
    try {
      const reply = await sendCoachMessage(history, intake);
      addAssistantMessage(reply);
    } catch (e) {
      addAssistantMessage(errorMessage(e));
    } finally {
      setLoading(false);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
      >
        {/* Header */}
        <View className="px-5 py-4 border-b border-gray-100">
          <Text className="text-lg font-bold text-gray-900">Coach</Text>
          <Text className="text-xs text-gray-400">Momentum Rx · AI-powered</Text>
        </View>

        {/* Messages */}
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => <ChatBubble message={item} />}
          contentContainerStyle={{ padding: 16, flexGrow: 1, justifyContent: messages.length === 0 ? 'center' : 'flex-start' }}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          ListEmptyComponent={
            <View className="items-center gap-2">
              <Text className="text-gray-300 text-4xl">💬</Text>
              <Text className="text-gray-400 text-sm text-center">
                Ask your coach anything — form, recovery, nutrition, mindset.
              </Text>
            </View>
          }
        />

        {/* Typing indicator */}
        {loading && (
          <View className="px-5 pb-2 flex-row items-center gap-2">
            <ActivityIndicator size="small" color="#000" />
            <Text className="text-gray-400 text-xs">Coach is thinking…</Text>
          </View>
        )}

        {/* Quick prompts */}
        {messages.length === 0 && (
          <View className="flex-row gap-2 px-4 pb-2 flex-wrap">
            {QUICK_PROMPTS.map((p) => (
              <Pressable
                key={p}
                onPress={() => send(p)}
                className="border border-gray-200 rounded-full px-4 py-2"
              >
                <Text className="text-gray-600 text-sm">{p}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Input bar */}
        <View className="flex-row items-end px-4 py-3 border-t border-gray-100 gap-3">
          <TextInput
            className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 text-sm text-black"
            placeholder="Message your coach…"
            placeholderTextColor="#9ca3af"
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={500}
            onSubmitEditing={() => send(input)}
          />
          <Pressable
            onPress={() => send(input)}
            disabled={!input.trim() || loading}
            className={`w-10 h-10 rounded-full items-center justify-center ${
              input.trim() && !loading ? 'bg-black' : 'bg-gray-200'
            }`}
          >
            <Text className={`text-lg ${input.trim() && !loading ? 'text-white' : 'text-gray-400'}`}>↑</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
