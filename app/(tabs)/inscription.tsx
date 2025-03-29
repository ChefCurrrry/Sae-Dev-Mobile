import {
    Alert,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    Platform,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import BackGround from "@/components/BackGround";
import RegularButton from "@/components/RegularButton";
import { Checkbox } from "react-native-paper";
import AppText from "@/components/AppText";
import { useTheme } from "@/components/ThemeContext";

export default function RegisterScreen() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";

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
            const response = await fetch(
                "https://backenddevmobile-production.up.railway.app/api/users/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nom, prenom, email, age, password }),
                }
            );

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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <BackGround>
                <AppText style={styles.title}>Créez votre compte</AppText>

                <TextInput
                    style={[styles.input, {
                        backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
                        color: isDark ? "#fff" : "#000",
                        borderColor: isDark ? "#555" : "#ddd",
                    }]}
                    placeholder="Nom"
                    placeholderTextColor="#aaa"
                    value={nom}
                    onChangeText={setNom}
                />

                <TextInput
                    style={[styles.input, {
                        backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
                        color: isDark ? "#fff" : "#000",
                        borderColor: isDark ? "#555" : "#ddd",
                    }]}
                    placeholder="Prénom"
                    placeholderTextColor="#aaa"
                    value={prenom}
                    onChangeText={setPrenom}
                />

                <TextInput
                    style={[styles.input, {
                        backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
                        color: isDark ? "#fff" : "#000",
                        borderColor: isDark ? "#555" : "#ddd",
                    }]}
                    placeholder="Âge"
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                    value={age}
                    onChangeText={setAge}
                />

                <TextInput
                    style={[styles.input, {
                        backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
                        color: isDark ? "#fff" : "#000",
                        borderColor: isDark ? "#555" : "#ddd",
                    }]}
                    placeholder="nom.prenom@gmail.com"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={[styles.input, {
                        backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
                        color: isDark ? "#fff" : "#000",
                        borderColor: isDark ? "#555" : "#ddd",
                    }]}
                    placeholder="Mot de passe"
                    placeholderTextColor="#aaa"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />

                <TextInput
                    style={[styles.input, {
                        backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
                        color: isDark ? "#fff" : "#000",
                        borderColor: isDark ? "#555" : "#ddd",
                    }]}
                    placeholder="Confirmer le mot de passe"
                    placeholderTextColor="#aaa"
                    secureTextEntry={!showPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <View style={styles.checkboxContainer}>
                    <View style={[styles.checkboxBorder, { backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5" }]}>
                        <Checkbox
                            status={showPassword ? "checked" : "unchecked"}
                            onPress={() => setShowPassword(!showPassword)}
                            color="#6C63FF"
                            uncheckedColor="#6C63FF"
                        />
                    </View>
                    <AppText style={styles.checkboxText}>Afficher le mot de passe</AppText>
                </View>

                <RegularButton
                    styleButton={styles.registerButton}
                    styleText={styles.registerText}
                    text="S'inscrire"
                    onPress={handleRegister}
                />

                <AppText style={styles.signupText}>
                    Vous avez un compte ?
                    <AppText style={styles.signupLink} onPress={() => router.push("/connexion")}> Se connecter</AppText>
                </AppText>
            </BackGround>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
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
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
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
    },
    signupLink: {
        color: "#4968df",
        fontWeight: "bold",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    checkboxBorder: {
        borderWidth: 1,
        borderColor: "#4968df",
        borderRadius: 10,
    },
    checkboxText: {
        fontSize: 12,
        marginLeft: 10,
    },
});
