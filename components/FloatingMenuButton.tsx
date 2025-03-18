import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer"; // ✅ Import du type DrawerNavigation


type NavigationProps = DrawerNavigationProp<Record<string, object | undefined>>;

export default function FloatingMenuButton() {
    const navigation = useNavigation<NavigationProps>(); // ✅ Correction du type

    return (
        <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.toggleDrawer()} // ✅ Ouvre le menu correctement
        >
            <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menuButton: {
        position: "absolute",
        top: 40, // Position en haut de l'écran
        left: 20, // Aligné à gauche
        backgroundColor: "#4968df", // Couleur de fond
        padding: 10,
        borderRadius: 50, // Arrondi
        elevation: 5, // Ombre sur Android
    },
});
