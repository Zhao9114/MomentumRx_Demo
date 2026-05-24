import { View } from 'react-native';
import { ReactNode } from 'react';

export default function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <View className={`bg-white rounded-3xl border border-gray-100 p-5 shadow-sm ${className}`}>
      {children}
    </View>
  );
}
