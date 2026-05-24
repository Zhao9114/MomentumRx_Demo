import { ScrollView, View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Card from '../../components/Card';
import WorkoutBlock from '../../components/WorkoutBlock';
import MacroRing from '../../components/MacroRing';
import { usePlan } from '../../store/usePlan';
import { useProfile } from '../../store/useProfile';
import { MOCK_PLAN } from '../../lib/mock/plan';
import { MOCK_TODAY_WORKOUT } from '../../lib/mock/workout';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export default function Today() {
  const { plan } = usePlan();
  const { intake } = useProfile();
  const [expanded, setExpanded] = useState(true);

  const activePlan = plan ?? MOCK_PLAN;
  const name = intake.name ?? activePlan.generated_for;
  const week = activePlan.weeks[0];
  const today = MOCK_TODAY_WORKOUT;
  const nutrition = week.nutrition;

  // Mid-day macro progress (~60%)
  const consumed = {
    protein: Math.round(nutrition.protein_g * 0.62),
    carbs: Math.round(nutrition.carbs_g * 0.58),
    fat: Math.round(nutrition.fat_g * 0.61),
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View className="mb-2">
          <Text className="text-2xl font-bold text-gray-900">
            {greeting()}, {name}
          </Text>
          <Text className="text-gray-400 text-sm mt-0.5">{formatDate()}</Text>
        </View>

        {/* Daily coach message */}
        <Card>
          <View className="flex-row items-center gap-2 mb-2">
            <View className="w-2 h-2 rounded-full bg-black" />
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Coach</Text>
          </View>
          <Text className="text-gray-700 text-sm leading-5 italic">
            "Today's hinge session is your Physics 101 application day — tension under load, not just moving weight.
            Keep the bar close, brace before you pull, and leave 3 in the tank on every set."
          </Text>
        </Card>

        {/* Today's session */}
        <Card>
          <View className="flex-row items-center justify-between mb-1">
            <View className="flex-row items-center gap-2">
              <View className="w-2 h-2 rounded-full bg-black" />
              <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Today's Session</Text>
            </View>
            <Pressable onPress={() => setExpanded((e) => !e)}>
              <Text className="text-gray-400 text-xs">{expanded ? 'Collapse' : 'Expand'}</Text>
            </Pressable>
          </View>
          <Text className="text-gray-900 font-semibold text-base mb-3">{today.focus}</Text>
          {expanded && today.exercises.map((ex, i) => (
            <WorkoutBlock key={ex.name} exercise={ex} index={i} />
          ))}
          {!expanded && (
            <Text className="text-gray-400 text-sm">{today.exercises.length} exercises</Text>
          )}
        </Card>

        {/* Macros */}
        <Card>
          <View className="flex-row items-center gap-2 mb-4">
            <View className="w-2 h-2 rounded-full bg-black" />
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Macros Today</Text>
          </View>
          <View className="flex-row justify-around">
            <MacroRing
              label="Protein"
              value={consumed.protein}
              total={nutrition.protein_g}
              unit="g"
              color="#111827"
            />
            <MacroRing
              label="Carbs"
              value={consumed.carbs}
              total={nutrition.carbs_g}
              unit="g"
              color="#6b7280"
            />
            <MacroRing
              label="Fat"
              value={consumed.fat}
              total={nutrition.fat_g}
              unit="g"
              color="#d1d5db"
            />
          </View>
          <Text className="text-center text-gray-400 text-xs mt-4">
            {nutrition.calories} kcal target · mid-day snapshot
          </Text>
        </Card>

        {/* Weekly focus */}
        <Card>
          <View className="flex-row items-center gap-2 mb-2">
            <View className="w-2 h-2 rounded-full bg-black" />
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Week {week.week_number} · {week.phase}
            </Text>
          </View>
          <Text className="text-gray-900 font-semibold text-base mb-1">
            Physics 101: {week.theme}
          </Text>
          <Text className="text-gray-500 text-sm leading-5">{week.habit_focus}</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
