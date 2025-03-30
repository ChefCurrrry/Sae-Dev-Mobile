import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Checkbox } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import BackGround from "@/components/BackGround";
import RegularButton from "@/components/RegularButton";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import AppText from "@/components/AppText";
import { useTheme } from "@/components/ThemeContext";

export default function TabOneScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checkingLogin, setCheckingLogin] = useState(true);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const API_URL = "https://backenddevmobile-production.up.railway.app/api/users/login";

  const handleLogin = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Bienvenue", "Connexion réussie !");
        await SecureStore.setItemAsync("userId", String(data.user.id));
        await SecureStore.setItemAsync("nom", String(data.user.nom));
        await SecureStore.setItemAsync("prenom", String(data.user.prenom));
        await SecureStore.setItemAsync("role", String(data.user.role)); // ✅ stocker le rôle

        // ✅ Redirection selon rôle
        if (data.user.role === "admin") {
          router.replace("/profileAdmin");
        } else {
          router.replace("/profile");
        }
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      Alert.alert("Erreur", "Impossible de se connecter au serveur.");
    }
  };

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const userId = await SecureStore.getItemAsync("userId");
      const role = await SecureStore.getItemAsync("role");

      if (userId && role) {
        router.replace(role === "admin" ? "/profileAdmin" : "/profile");
      } else {
        setCheckingLogin(false);
      }
    };

    checkIfLoggedIn();
  }, []);

  if (checkingLogin) return null;

  return (
      <BackGround>
        <AppText style={styles.title}>Connectez-vous à votre compte</AppText>

        <TextInput
            style={[styles.input, {
              backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
              color: isDark ? "#fff" : "#000",
              borderColor: isDark ? "#555" : "#ddd"
            }]}
            placeholder="nom.prenom@gmail.com"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            accessibilityLabel="Champ pour entrer votre adresse email"
        />

        <TextInput
            style={[styles.input, {
              backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
              color: isDark ? "#fff" : "#000",
              borderColor: isDark ? "#555" : "#ddd"
            }]}
            placeholder="***********"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            accessibilityLabel="Champ pour entrer votre mot de passe"
        />

        {/* Afficher mot de passe */}
        <TouchableOpacity
            style={styles.checkboxTouchable}
            onPress={() => setShowPassword(!showPassword)}
            accessibilityRole="checkbox"
            accessibilityLabel="Afficher le mot de passe"
            accessibilityState={{ checked: showPassword }}
        >
          <View style={styles.checkboxBox}>
            <Checkbox
                status={showPassword ? "checked" : "unchecked"}
                onPress={() => setShowPassword(!showPassword)}
                color="#6C63FF"
                uncheckedColor="#6C63FF"
                theme={{ colors: { primary: "#6C63FF" } }}
            />
          </View>
          <AppText style={[styles.checkboxText, { color: isDark ? "#fff" : "#000" }]}>
            Afficher le mot de passe
          </AppText>
        </TouchableOpacity>

        <RegularButton
            text="Mot de passe oublié ?"
            onPress={() => router.push("/forgotPassword")}
            styleButton={styles.forgotButton}
            styleText={styles.forgotButtonText}
            accessibilityLabel={"Boutton d'accès a formulaire d'oubli de mot de passe"}
            accessibilityRole="Button"
        />

        <RegularButton
            styleButton={styles.loginButton}
            styleText={styles.loginText}
            text="Se Connecter"
            onPress={handleLogin}
            accessibilityLabel={"Boutton de confirmation de connexion"}
            accessibilityRole="Button"
        />

        <AppText style={styles.signupText}>
          Pas encore de compte ?
          <AppText
              style={styles.signupLink}
              onPress={() => router.push("/inscription")}
          >
            {" "}S'inscrire
          </AppText>
        </AppText>
      </BackGround>
  );
}

const styles = StyleSheet.create({
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
  checkboxTouchable: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxBox: {
    borderWidth: 2,
    borderColor: "#6C63FF",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    marginRight: 8,
  },
  checkboxText: {
    fontSize: 14,
  },
  forgotButton: {
    backgroundColor: "#4968df",
    borderWidth: 1,
    borderColor: "#4968df",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  forgotButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#4968df",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  loginText: {
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
});
