import React from 'react';
import { Stack } from 'expo-router';
import { LogBox } from "react-native";

// Ignore l'erreur spécifique
LogBox.ignoreLogs(["Text strings must be rendered within a <Text> component"]);

export default function TabLayout() {

  return (
    <Stack>
      <Stack.Screen
        name="connexion"
        options={{
          title: 'Se Connecter',
            headerShown: false,

        }}
      />
        <Stack.Screen
            name="inscription"
            options={{
                headerTitle: '',
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="associations"
            options={{
                headerTitle: '',
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="payment"
            options={{
                headerTitle: '',
                headerShown: false,
            }}
        />

    </Stack>
  );
}
