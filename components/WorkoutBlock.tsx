import { View, Text } from 'react-native';
import { Exercise } from '../types';

export default function WorkoutBlock({ exercise, index }: { exercise: Exercise; index: number }) {
  return (
    <View className="flex-row items-start py-3 border-b border-gray-50 last:border-0">
      <Text className="text-gray-300 font-bold w-6 text-sm mt-0.5">{index + 1}</Text>
      <View className="flex-1">
        <Text className="text-gray-900 font-semibold text-sm">{exercise.name}</Text>
        <Text className="text-gray-400 text-xs mt-0.5">
          {exercise.sets} × {exercise.reps} · {exercise.load}
        </Text>
        {exercise.note ? (
          <Text className="text-gray-400 text-xs italic mt-0.5">{exercise.note}</Text>
        ) : null}
      </View>
    </View>
  );
}
