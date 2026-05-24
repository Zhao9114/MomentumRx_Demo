import { View } from 'react-native';

const TOTAL = 7;

export default function ProgressDots({ current }: { current: number }) {
  return (
    <View className="flex-row gap-2 justify-center">
      {Array.from({ length: TOTAL }).map((_, i) => (
        <View
          key={i}
          className={`h-2 rounded-full ${
            i + 1 === current ? 'w-5 bg-black' : 'w-2 bg-gray-300'
          }`}
        />
      ))}
    </View>
  );
}
