import { ScrollView, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePlan } from '../../store/usePlan';
import { useProfile } from '../../store/useProfile';
import { MOCK_PLAN } from '../../lib/mock/plan';
import Card from '../../components/Card';

export default function Progress() {
  const { plan } = usePlan();
  const { intake } = useProfile();
  const activePlan = plan ?? MOCK_PLAN;
  const week = activePlan.weeks[0];

  const currentWeight = intake.current_weight_lb ?? 185;
  const targetWeight = intake.target_weight_lb ?? 170;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <ScrollView
        contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold text-gray-900 mb-2">Progress</Text>

        {/* Stat cards */}
        <View className="flex-row gap-3">
          <Card className="flex-1">
            <Text className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Current</Text>
            <Text className="text-2xl font-bold text-gray-900">{currentWeight}</Text>
            <Text className="text-xs text-gray-400">lb</Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Target</Text>
            <Text className="text-2xl font-bold text-gray-900">{targetWeight}</Text>
            <Text className="text-xs text-gray-400">lb</Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Streak</Text>
            <Text className="text-2xl font-bold text-gray-900">5</Text>
            <Text className="text-xs text-gray-400">days</Text>
          </Card>
        </View>

        {/* Trend card */}
        <Card>
          <View className="flex-row items-center gap-2 mb-3">
            <View className="w-2 h-2 rounded-full bg-black" />
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Weight Trend</Text>
          </View>
          <View className="flex-row items-baseline gap-2">
            <Text className="text-3xl font-bold text-gray-900">−2.3</Text>
            <Text className="text-gray-400 text-sm">lb / week avg</Text>
          </View>
          <Text className="text-gray-400 text-xs mt-1">On track for goal in ~{Math.round((currentWeight - targetWeight) / 2.3)} weeks</Text>

          {/* Simple bar chart placeholder */}
          <View className="flex-row items-end gap-1.5 mt-4 h-16">
            {[60, 75, 55, 80, 70, 85, 65].map((h, i) => (
              <View
                key={i}
                className="flex-1 rounded-t-sm"
                style={{ height: `${h}%`, backgroundColor: i === 6 ? '#111827' : '#e5e7eb' }}
              />
            ))}
          </View>
          <View className="flex-row gap-1.5 mt-1">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <Text key={i} className="flex-1 text-center text-gray-400 text-xs">{d}</Text>
            ))}
          </View>
        </Card>

        {/* Current phase */}
        <Card>
          <View className="flex-row items-center gap-2 mb-2">
            <View className="w-2 h-2 rounded-full bg-black" />
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Phase</Text>
          </View>
          <Text className="text-gray-900 font-semibold text-base">{week.phase} — Week {week.week_number}</Text>
          <Text className="text-gray-500 text-sm mt-1">{week.theme}</Text>

          {/* Phase progress bar */}
          <View className="mt-3 bg-gray-100 rounded-full h-2">
            <View className="bg-black rounded-full h-2" style={{ width: `${(week.week_number / 4) * 100}%` }} />
          </View>
          <Text className="text-gray-400 text-xs mt-1">Week {week.week_number} of 4</Text>
        </Card>

        {/* Weekly check-in CTA */}
        <Pressable
          className="bg-black rounded-2xl py-4 items-center"
          onPress={() => {}}
        >
          <Text className="text-white font-semibold">Weekly Check-in →</Text>
          <Text className="text-gray-400 text-xs mt-0.5">Coming soon</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
