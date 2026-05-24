import { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePlan } from '../../store/usePlan';
import { MOCK_PLAN } from '../../lib/mock/plan';
import { Week, Session } from '../../types';

type Day = Session['day'];
const ALL_DAYS: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const PHASE_COLORS: Record<string, string> = {
  Build: '#111827',
  Sharpen: '#d97706',
  Peak: '#dc2626',
  Rest: '#9ca3af',
};

const PHASE_BG: Record<string, string> = {
  Build: '#f0f0f0',
  Sharpen: '#fef3c7',
  Peak: '#fee2e2',
  Rest: '#f3f4f6',
};


function SessionCard({ session }: { session: Session }) {
  const [open, setOpen] = useState(false);
  return (
    <View className="border border-gray-100 rounded-2xl mb-2 overflow-hidden">
      <Pressable
        onPress={() => setOpen((o) => !o)}
        className="flex-row items-center justify-between px-4 py-3 bg-white"
      >
        <View>
          <Text className="font-semibold text-sm text-gray-900">{session.day}</Text>
          <Text className="text-xs text-gray-400 mt-0.5">{session.focus}</Text>
        </View>
        <Text className="text-gray-400 text-xs">{open ? '▲' : '▼'}</Text>
      </Pressable>
      {open && (
        <View className="px-4 pb-3 bg-gray-50 gap-2">
          {session.exercises.map((ex, i) => (
            <View key={i} className="flex-row items-start gap-2">
              <Text className="text-gray-300 text-xs w-4 mt-0.5">{i + 1}</Text>
              <View className="flex-1">
                <Text className="text-xs font-semibold text-gray-800">{ex.name}</Text>
                <Text className="text-xs text-gray-400">{ex.sets} × {ex.reps} · {ex.load}</Text>
                {ex.note ? <Text className="text-xs text-gray-400 italic">{ex.note}</Text> : null}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function WeekRow({ week, isSelected, onPress }: { week: Week; isSelected: boolean; onPress: () => void }) {
  const color = PHASE_COLORS[week.phase];
  const sessionDays = new Set(week.sessions.map((s) => s.day));

  return (
    <Pressable
      onPress={onPress}
      className={`rounded-2xl p-4 mb-3 border ${isSelected ? 'border-black' : 'border-transparent'}`}
      style={{ backgroundColor: PHASE_BG[week.phase] }}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View>
          <Text className="font-bold text-sm text-gray-900">Week {week.week_number}</Text>
          <Text className="text-xs mt-0.5" style={{ color }}>{week.phase} · {week.theme}</Text>
        </View>
        <View
          className="px-2 py-1 rounded-full"
          style={{ backgroundColor: color }}
        >
          <Text className="text-white text-xs font-semibold">{week.phase}</Text>
        </View>
      </View>
      <View className="flex-row gap-1">
        {ALL_DAYS.map((day) => (
          <View
            key={day}
            className="flex-1 items-center py-1 rounded-lg"
            style={{ backgroundColor: sessionDays.has(day) ? color : '#e5e7eb' }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: sessionDays.has(day) ? '#fff' : '#9ca3af' }}
            >
              {day[0]}
            </Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

export default function Plan() {
  const { plan } = usePlan();
  const activePlan = plan ?? MOCK_PLAN;
  const [selectedWeek, setSelectedWeek] = useState(0);
  const week = activePlan.weeks[selectedWeek];

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold text-gray-900 mb-1">Your Plan</Text>
        <Text className="text-gray-400 text-sm mb-6">
          4-week Rx for {activePlan.generated_for}
        </Text>

        {/* Week selector */}
        {activePlan.weeks.map((w, i) => (
          <WeekRow
            key={w.week_number}
            week={w}
            isSelected={selectedWeek === i}
            onPress={() => setSelectedWeek(i)}
          />
        ))}

        {/* Selected week detail */}
        <View className="mt-4">
          <Text className="text-base font-bold text-gray-900 mb-1">
            Week {week.week_number} Sessions
          </Text>
          <Text className="text-xs text-gray-400 mb-4">{week.habit_focus}</Text>
          {week.sessions.map((s, i) => (
            <SessionCard key={i} session={s} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
