import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import AssociationDisplayScreen from "../app/(tabs)/associations";
import TabOneScreen from "../app/(tabs)/connexion";

const Drawer = createDrawerNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Associations">
                <Drawer.Screen name="Associations" component={AssociationDisplayScreen} />
                <Drawer.Screen name="Connexion" component={TabOneScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}