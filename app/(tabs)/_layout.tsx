import React from 'react';
import { LogBox } from "react-native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import AssociationDisplayScreen from "@/app/(tabs)/associations";
import TabOneScreen from "@/app/(tabs)/connexion";
import {createStackNavigator} from "@react-navigation/stack";
import RegisterScreen from "@/app/(tabs)/inscription";
import Payment from "@/app/(tabs)/payment";
import AssociationPage1 from "@/app/(tabs)/trouverAsso";
import AssociationPage2 from "@/app/(tabs)/trouverAsso2";
import AssociationPage3 from "@/app/(tabs)/trouverAsso3";

// Ignore l'erreur spécifique
LogBox.ignoreLogs(["Text strings must be rendered within a <Text> component"]);

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function InternalStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="connexion" component={TabOneScreen} />
            <Stack.Screen name="associations" component={AssociationDisplayScreen} />
            <Stack.Screen name="inscription" component={RegisterScreen} />
            <Stack.Screen name="payment" component={Payment} />
            <Stack.Screen name="trouverAsso" component={AssociationPage1} />
            <Stack.Screen name="trouverAsso2" component={AssociationPage2} />
            <Stack.Screen name="trouverAsso3" component={AssociationPage3} />
        </Stack.Navigator>
    );
}

// 🛠️ Drawer Navigator qui affiche uniquement "Associations" et "Connexion"
export default function TabLayout() {
    return (
        <Drawer.Navigator
            initialRouteName="Associations"
            screenOptions={{
                headerShown: false, // ✅ Corrigé la syntaxe
                drawerLabelStyle: {
                    fontSize: 18, // ✅ Taille du texte
                    fontWeight: "bold", // ✅ Texte en gras
                    color: "#333", // ✅ Couleur du texte
                },
                drawerStyle: {
                    backgroundColor: "#F0F0F0", // ✅ Fond du menu
                    width: 250, // ✅ Largeur du menu
                },
                drawerActiveTintColor: "#4968df", // ✅ Couleur du texte actif
                drawerInactiveTintColor: "#555", // ✅ Couleur du texte inactif
                drawerItemStyle: {
                    marginVertical: 10, // ✅ Espacement entre les éléments
                }
            }}
        >
            <Drawer.Screen name="Associations" component={AssociationDisplayScreen} />
            <Drawer.Screen name="Connexion" component={InternalStack} />
        </Drawer.Navigator>

    );
}
