import { View, Text } from 'react-native';
import { Message } from '../store/useChat';

export default function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <View className={`flex-row mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <View
        className={`max-w-xs px-4 py-3 rounded-3xl ${
          isUser
            ? 'bg-black rounded-br-sm'
            : 'bg-gray-100 rounded-bl-sm'
        }`}
        style={{ maxWidth: '78%' }}
      >
        <Text className={`text-sm leading-5 ${isUser ? 'text-white' : 'text-gray-800'}`}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}
