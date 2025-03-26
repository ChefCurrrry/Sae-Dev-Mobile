import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppBackground from "@/components/AppBackground";

export default function ProfilScreen() {
    return (
        <AppBackground title="Mon Profil">
            <View style={styles.container}>
                <Text style={styles.text}>Bienvenue sur votre profil 👤</Text>
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
});
