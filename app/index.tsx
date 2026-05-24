import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Splash() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />
      <View className="flex-1 px-8">
        {/* Top badge */}
        <View className="flex-1 justify-center">
          <View className="mb-6 self-start border border-gray-700 rounded-full px-3 py-1">
            <Text className="text-gray-400 text-xs tracking-widest uppercase">Momentum Rx</Text>
          </View>
          <Text
            className="text-white font-bold mb-4 leading-tight"
            style={{ fontSize: 44 }}
          >
            Prescriptive{'\n'}Fitness.{'\n'}Proactive{'\n'}Health.
          </Text>
          <Text className="text-gray-500 text-sm leading-6">
            Your AI coach builds a 4-week Rx{'\n'}personalised to your goals, body, and life.
          </Text>
        </View>

        {/* CTA */}
        <View className="pb-8 gap-3">
          <Pressable
            className="bg-white w-full py-4 rounded-2xl items-center active:opacity-80"
            onPress={() => router.push('/intake/1' as never)}
          >
            <Text className="text-black text-base font-bold">Get Started</Text>
          </Pressable>
          <Text className="text-gray-600 text-xs text-center">
            Takes 2 minutes · No account needed
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
