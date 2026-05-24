import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '../../store/useProfile';
import { usePlan } from '../../store/usePlan';
import { generatePlan } from '../../lib/api';
import { MOCK_PLAN } from '../../lib/mock/plan';
import { IntakeSchema } from '../../lib/schemas/intake';

const MESSAGES = [
  'Analyzing your movement profile…',
  'Applying Physics 101 principles…',
  'Running Force Field Analysis…',
  'Calibrating your Rx…',
];

export default function Loading() {
  const router = useRouter();
  const { intake } = useProfile();
  const { setPlan } = usePlan();
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function run() {
      try {
        const parsed = IntakeSchema.parse(intake);
        const plan = await generatePlan(parsed);
        setPlan(plan);
      } catch (e) {
        console.log('Plan generation failed, using mock:', e);
        setPlan(MOCK_PLAN);
      } finally {
        router.replace('/(tabs)/today' as never);
      }
    }

    const timer = setTimeout(run, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 items-center justify-center px-8 gap-8">
        <Text className="text-white text-4xl font-bold">Momentum Rx</Text>
        <Text className="text-gray-400 text-base text-center">
          {MESSAGES[msgIndex]}
        </Text>
        <View className="flex-row gap-2">
          {MESSAGES.map((_, i) => (
            <View
              key={i}
              className={`h-1.5 rounded-full ${
                i === msgIndex ? 'w-6 bg-white' : 'w-1.5 bg-gray-600'
              }`}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
