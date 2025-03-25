import React from 'react';
import { LogBox } from "react-native";
import AssociationDisplayScreen from "@/app/(tabs)/associations";
import TabOneScreen from "@/app/(tabs)/connexion";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "@/app/(tabs)/inscription";
import Payment from "@/app/(tabs)/payment";
import AssociationPage1 from "@/app/(tabs)/trouverAsso";
import AssociationPage2 from "@/app/(tabs)/trouverAsso2";
import AssociationPage3 from "@/app/(tabs)/trouverAsso3";
import AssociationDetails from "@/app/(tabs)/assoDetail";

// Ignore l'erreur spécifique
LogBox.ignoreLogs(["Text strings must be rendered within a <Text> component"]);

const Stack = createStackNavigator();

export default function TabLayout() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="associations" component={AssociationDisplayScreen} />
            <Stack.Screen name="connexion" component={TabOneScreen} />
            <Stack.Screen name="inscription" component={RegisterScreen} />
            <Stack.Screen name="payment" component={Payment} />
            <Stack.Screen name="trouverAsso" component={AssociationPage1} />
            <Stack.Screen name="trouverAsso2" component={AssociationPage2} />
            <Stack.Screen name="trouverAsso3" component={AssociationPage3} />
            <Stack.Screen name="assoDetail" component={AssociationDetails} />
        </Stack.Navigator>
    );
}
