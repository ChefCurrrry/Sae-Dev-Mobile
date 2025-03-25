import { Alert, StyleSheet, TextInput, TouchableOpacity, View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from "react";
import { Link, router } from "expo-router";
import BackGround from "@/components/BackGround";
import RegularButton from "@/components/RegularButton";

export default function RegisterScreen() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleRegister = async () => {
        if (!nom || !prenom || !email || !age || !password || !confirmPassword) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs !");
            return;
        }

        if (isNaN(Number(age)) || parseInt(age) < 18) {
            Alert.alert("Erreur", "Vous devez avoir au moins 18 ans pour vous inscrire.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Erreur", "Les mots de passe ne correspondent pas !");
            return;
        }

        try {
            const response = await fetch("https://backenddevmobile-production.up.railway.app/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nom, prenom, email, age, password }),
            });

            const data = await response.json();

            if (data.success) {
                Alert.alert("Succès", "Inscription réussie !");
                router.push("/connexion");
            } else {
                Alert.alert("Erreur", data.message);
            }
        } catch (error) {
            console.error("Erreur d'inscription :", error);
            Alert.alert("Erreur", "Impossible de contacter le serveur.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} >
        <BackGround>

                    <Text style={styles.title}>Créez votre compte</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nom"
                        placeholderTextColor="#aaa"
                        value={nom}
                        onChangeText={setNom}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Prénom"
                        placeholderTextColor="#aaa"
                        value={prenom}
                        onChangeText={setPrenom}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Âge"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                        value={age}
                        onChangeText={setAge}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="nom.prenom@gmail.com"
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Confirmer le mot de passe"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <RegularButton
                        styleButton={styles.registerButton}
                        styleText={styles.registerText}
                        text="S'inscrire"
                        onPress={handleRegister}
                    />

                    <Text style={styles.signupText}>
                        Vous avez un compte ?
                            <Text style={styles.signupLink} onPress={() => router.push("/connexion")}> Se Connecter</Text>
                    </Text>

        </BackGround>
        </ScrollView>
    );
}

// **Styles**
const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    registerButton: {
        backgroundColor: "#4968df",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    registerText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    signupText: {
        textAlign: "center",
        fontSize: 14,
        marginTop: 15,
        color: "black",
    },
    signupLink: {
        color: "#4968df",
        fontWeight: "bold",
    },
});


