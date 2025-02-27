import React from 'react';
import { Stack } from 'expo-router';


export default function TabLayout() {

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
