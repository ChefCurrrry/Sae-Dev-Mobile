import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TagSelectionProvider } from "@/components/TagSelectionContext";
import {SelectedAssoProvider} from "@/components/SelectedAssoContext";
import { ThemeProvider } from "@/components/ThemeContext";
import {StripeProvider} from "@stripe/stripe-react-native";


export {
  ErrorBoundary,
} from 'expo-router';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
      <StripeProvider publishableKey="pk_test_51R8M2DR64pdXuIYjdTlS5jTAcfTk6qNrLyTRvKBztCCBFuGtaRMcEX9lbXr4e4fUimfrhUDXNNKxdgGPztUxoXo900rtnKCkGS">
      <ThemeProvider>
      <SelectedAssoProvider>
      <TagSelectionProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="confidentialite" options={{ headerShown: false }} />
        </Stack>
      </TagSelectionProvider>
      </SelectedAssoProvider>
      </ThemeProvider>
      </StripeProvider>
  );
}
