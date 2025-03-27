import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AppBackground from "@/components/AppBackground";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import RegularButton from "@/components/RegularButton";

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
                <RegularButton text={"DECONNEXION"} styleButton={styles.loginButton} styleText={styles.loginText} onPress={handleDisconnect} />
                <RegularButton text={"Mes Dons Planifiés"} styleButton={styles.loginButton} styleText={styles.loginText} onPress={handleDisconnect} />
                <RegularButton text={"Voir les Associations"} styleButton={styles.loginButton} styleText={styles.loginText} onPress={() => {router.push("/associations")}} />
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
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
    loginButton: {
        width: "100%",
        backgroundColor: "#4968df",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
    },
    loginText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
