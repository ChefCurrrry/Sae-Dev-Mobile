// pages/forgotPassword.tsx

import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import BackGround from "@/components/BackGround";
import RegularButton from "@/components/RegularButton";
import AppText from "@/components/AppText";
import { useTheme } from "@/components/ThemeContext";
import {router} from "expo-router";

export default function ForgotPassword() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handlePasswordReset = async () => {
        if (!email || !newPassword) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }

        try {
            const response = await fetch("https://backenddevmobile-production.up.railway.app/api/users/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                Alert.alert("Succès", "Votre mot de passe a été mis à jour.");
                router.push("/connexion");
            } else {
                Alert.alert("Erreur", data.message || "Une erreur est survenue.");
            }
        } catch (error) {
            console.error("Erreur:", error);
            Alert.alert("Erreur", "Impossible de contacter le serveur.");
        }
    };

    return (
        <BackGround>
            <AppText style={styles.subtitle}>Veuillez saisir votre email et un nouveau mot de passe :</AppText>

            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
                        color: isDark ? "#fff" : "#000",
                        borderColor: isDark ? "#555" : "#ddd",
                    },
                ]}
                placeholder="Adresse email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                accessibilityLabel="Champ pour saisir l'adresse email"
            />

            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
                        color: isDark ? "#fff" : "#000",
                        borderColor: isDark ? "#555" : "#ddd",
                    },
                ]}
                placeholder="Nouveau mot de passe"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                accessibilityLabel="Champ pour saisir le nouveau mot de passe"
            />

            <RegularButton
                text="Réinitialiser"
                onPress={handlePasswordReset}
                styleButton={styles.button}
                styleText={styles.buttonText}
                accessibilityRole="button"
                accessibilityLabel="Valider la réinitialisation du mot de passe"
            />
        </BackGround>
    );
}

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 22,
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
    },
    button: {
        backgroundColor: "#4968df",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
