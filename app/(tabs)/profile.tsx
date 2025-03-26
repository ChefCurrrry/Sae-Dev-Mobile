import React from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import AppBackground from "@/components/AppBackground";
import {router} from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function ProfilScreen() {

    const handleDisconnect = async () => {
        await SecureStore.deleteItemAsync("userId");
        router.replace("/associations");

    }
    return (
        <AppBackground title="Mon Profil">
            <View style={styles.container}>
                <Text style={styles.text}>Bienvenue sur votre profil 👤</Text>
                <Button title={"DECONNEXION"} onPress={handleDisconnect}></Button>
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
