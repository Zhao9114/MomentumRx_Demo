import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import ProgressDots from '../../components/ProgressDots';
import { useProfile } from '../../store/useProfile';
import { Intake } from '../../types';

const TOTAL = 7;

type Goal = Intake['goal'];
type Experience = Intake['experience'];

const GOALS: { value: Goal; label: string }[] = [
  { value: 'lose_weight', label: 'Lose weight' },
  { value: 'build_muscle', label: 'Build muscle' },
  { value: 'perform', label: 'Perform' },
  { value: 'longevity', label: 'Longevity' },
];

const EXPERIENCES: { value: Experience; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

function ChipSelect<T extends string>({
  options,
  selected,
  onSelect,
}: {
  options: { value: T; label: string }[];
  selected: T | undefined;
  onSelect: (v: T) => void;
}) {
  return (
    <View className="flex-row flex-wrap gap-3">
      {options.map((o) => (
        <Pressable
          key={o.value}
          onPress={() => onSelect(o.value)}
          className={`px-5 py-3 rounded-2xl border ${
            selected === o.value
              ? 'bg-black border-black'
              : 'bg-white border-gray-200'
          }`}
        >
          <Text className={selected === o.value ? 'text-white font-semibold' : 'text-gray-700'}>
            {o.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function Stepper({
  value,
  min,
  max,
  onChange,
}: {
  value: number | undefined;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const current = value ?? min;
  return (
    <View className="flex-row items-center gap-6">
      <Pressable
        onPress={() => onChange(Math.max(min, current - 1))}
        className="w-12 h-12 rounded-full border border-gray-200 items-center justify-center"
      >
        <Text className="text-2xl text-gray-700">−</Text>
      </Pressable>
      <Text className="text-4xl font-bold w-12 text-center">{current}</Text>
      <Pressable
        onPress={() => onChange(Math.min(max, current + 1))}
        className="w-12 h-12 rounded-full border border-gray-200 items-center justify-center"
      >
        <Text className="text-2xl text-gray-700">+</Text>
      </Pressable>
    </View>
  );
}

export default function IntakeStep() {
  const { step } = useLocalSearchParams<{ step: string }>();
  const router = useRouter();
  const { intake, setField } = useProfile();
  const stepNum = parseInt(step, 10);

  function canAdvance(): boolean {
    switch (stepNum) {
      case 1: return !!intake.name?.trim();
      case 2: return !!intake.goal;
      case 3: return !!intake.days_per_week;
      case 4: return !!intake.experience;
      case 5: return !!intake.current_weight_lb && !!intake.target_weight_lb;
      case 6: return true;
      case 7: return true;
      default: return false;
    }
  }

  function handleNext() {
    if (stepNum < TOTAL) {
      router.push(`/intake/${stepNum + 1}` as never);
    } else {
      router.push('/intake/loading' as never);
    }
  }

  function handleBack() {
    if (stepNum > 1) {
      router.back();
    } else {
      router.push('/' as never);
    }
  }

  function renderStep() {
    switch (stepNum) {
      case 1:
        return (
          <>
            <Text className="text-2xl font-bold mb-2">What's your name?</Text>
            <Text className="text-gray-500 mb-8">We'll personalise everything to you.</Text>
            <TextInput
              className="border border-gray-200 rounded-2xl px-4 py-4 text-base text-black"
              placeholder="Your first name"
              placeholderTextColor="#9ca3af"
              value={intake.name ?? ''}
              onChangeText={(v) => setField('name', v)}
              autoFocus
            />
          </>
        );
      case 2:
        return (
          <>
            <Text className="text-2xl font-bold mb-2">What's your primary goal?</Text>
            <Text className="text-gray-500 mb-8">Pick one — we'll optimise the Rx around it.</Text>
            <ChipSelect options={GOALS} selected={intake.goal} onSelect={(v) => setField('goal', v)} />
          </>
        );
      case 3:
        return (
          <>
            <Text className="text-2xl font-bold mb-2">Days per week available?</Text>
            <Text className="text-gray-500 mb-8">Be realistic — consistency beats frequency.</Text>
            <Stepper value={intake.days_per_week} min={1} max={7} onChange={(v) => setField('days_per_week', v)} />
          </>
        );
      case 4:
        return (
          <>
            <Text className="text-2xl font-bold mb-2">Training experience?</Text>
            <Text className="text-gray-500 mb-8">Honest answer gets the better program.</Text>
            <ChipSelect options={EXPERIENCES} selected={intake.experience} onSelect={(v) => setField('experience', v)} />
          </>
        );
      case 5:
        return (
          <>
            <Text className="text-2xl font-bold mb-2">Weight targets</Text>
            <Text className="text-gray-500 mb-8">Current and goal weight in lbs.</Text>
            <View className="gap-4">
              <View>
                <Text className="text-sm text-gray-500 mb-1">Current weight (lb)</Text>
                <TextInput
                  className="border border-gray-200 rounded-2xl px-4 py-4 text-base text-black"
                  placeholder="e.g. 185"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  value={intake.current_weight_lb?.toString() ?? ''}
                  onChangeText={(v) => setField('current_weight_lb', parseFloat(v) || 0)}
                />
              </View>
              <View>
                <Text className="text-sm text-gray-500 mb-1">Target weight (lb)</Text>
                <TextInput
                  className="border border-gray-200 rounded-2xl px-4 py-4 text-base text-black"
                  placeholder="e.g. 170"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  value={intake.target_weight_lb?.toString() ?? ''}
                  onChangeText={(v) => setField('target_weight_lb', parseFloat(v) || 0)}
                />
              </View>
            </View>
          </>
        );
      case 6:
        return (
          <>
            <Text className="text-2xl font-bold mb-2">Injuries or limitations?</Text>
            <Text className="text-gray-500 mb-8">Anything we should program around — joints, pain, restrictions.</Text>
            <TextInput
              className="border border-gray-200 rounded-2xl px-4 py-4 text-base text-black"
              placeholder="e.g. Lower back tightness, right shoulder impingement, or none"
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
              style={{ minHeight: 100, textAlignVertical: 'top' }}
              value={intake.injuries ?? ''}
              onChangeText={(v) => setField('injuries', v)}
            />
          </>
        );
      case 7:
        return (
          <>
            <Text className="text-2xl font-bold mb-2">What gets in the way?</Text>
            <Text className="text-gray-500 mb-8">Your biggest friction point — the real reason consistency breaks down.</Text>
            <TextInput
              className="border border-gray-200 rounded-2xl px-4 py-4 text-base text-black"
              placeholder="e.g. Late nights at work kill my morning sessions, or I skip when I'm stressed"
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
              style={{ minHeight: 100, textAlignVertical: 'top' }}
              value={intake.friction ?? ''}
              onChangeText={(v) => setField('friction', v)}
            />
          </>
        );
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-6 pb-8">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-8">
            <Pressable onPress={handleBack} className="p-2 -ml-2">
              <Feather name="arrow-left" size={22} color="#6b7280" />
            </Pressable>
            <ProgressDots current={stepNum} />
            <Text className="text-gray-400 text-xs w-16 text-right">{stepNum} / {TOTAL}</Text>
          </View>

          {/* Step content */}
          <View className="flex-1">
            {renderStep()}
          </View>

          {/* Next button */}
          <Pressable
            onPress={handleNext}
            disabled={!canAdvance()}
            className={`w-full py-4 rounded-2xl items-center mt-6 ${
              canAdvance() ? 'bg-black' : 'bg-gray-200'
            }`}
          >
            <Text className={`text-base font-semibold ${canAdvance() ? 'text-white' : 'text-gray-400'}`}>
              {stepNum === TOTAL ? 'Build my Rx →' : 'Next →'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
