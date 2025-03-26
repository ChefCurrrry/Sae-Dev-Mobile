import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AppBackground from "@/components/AppBackground";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function ProfilScreen() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const storedNom = await SecureStore.getItemAsync("nom");
            const storedPrenom = await SecureStore.getItemAsync("prenom");

            if (storedNom) setNom(storedNom);
            if (storedPrenom) setPrenom(storedPrenom);
        };

        fetchUserData();
    }, []);

    const handleDisconnect = async () => {
        await SecureStore.deleteItemAsync("userId");
        await SecureStore.deleteItemAsync("nom");
        await SecureStore.deleteItemAsync("prenom");
        router.replace("/associations");
    };

    return (
        <AppBackground title="Mon Profil">
            <View style={styles.container}>
                <Text style={styles.text}>Bienvenue {prenom} {nom} 👋</Text>
                <Button title={"DECONNEXION"} onPress={handleDisconnect} />
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
        marginBottom: 20,
    },
});
