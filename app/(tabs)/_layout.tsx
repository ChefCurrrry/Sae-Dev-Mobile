import React from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Se Connecter',
            headerShown: false,
        }}
      />
      <Stack.Screen
        name="two"
        options={{
            headerTitle: '',
            headerShown: false,
        }}
      />
    </Stack>
  );
}
