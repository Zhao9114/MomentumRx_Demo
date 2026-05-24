import { View, Text } from 'react-native';

interface MacroRingProps {
  label: string;
  value: number;
  total: number;
  unit: string;
  color: string;
}

export default function MacroRing({ label, value, total, unit, color }: MacroRingProps) {
  const pct = Math.min(value / total, 1);
  const SIZE = 72;
  const STROKE = 7;
  const R = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;
  const dash = pct * CIRC;

  return (
    <View className="items-center gap-1">
      {/* Simple progress ring via border trick */}
      <View
        style={{
          width: SIZE,
          height: SIZE,
          borderRadius: SIZE / 2,
          borderWidth: STROKE,
          borderColor: '#f3f4f6',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Filled arc overlay — approximated with a colored border on one side */}
        <View
          style={{
            position: 'absolute',
            width: SIZE,
            height: SIZE,
            borderRadius: SIZE / 2,
            borderWidth: STROKE,
            borderColor: 'transparent',
            borderTopColor: color,
            borderRightColor: pct > 0.25 ? color : 'transparent',
            borderBottomColor: pct > 0.5 ? color : 'transparent',
            borderLeftColor: pct > 0.75 ? color : 'transparent',
            transform: [{ rotate: '-90deg' }],
          }}
        />
        <Text className="text-xs font-bold text-gray-800">{value}</Text>
        <Text className="text-gray-400" style={{ fontSize: 9 }}>{unit}</Text>
      </View>
      <Text className="text-xs text-gray-500 font-medium">{label}</Text>
    </View>
  );
}
