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
  const [rememberMe, setRememberMe] = useState(false);
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
        router.push("/associations");
      } else {
        Alert.alert("Erreur", data.message);
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      Alert.alert("Erreur", "Impossible de se connecter au serveur.");
    }
  };

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const userId = await SecureStore.getItemAsync("userId");
      if (userId) {
        router.replace("/profile");
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

        {/* Email */}
        <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
                color: isDark ? "#fff" : "#000",
                borderColor: isDark ? "#555" : "#ddd",
              },
            ]}
            placeholder="nom.prenom@gmail.com"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
        />

        {/* Password */}
        <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
                color: isDark ? "#fff" : "#000",
                borderColor: isDark ? "#555" : "#ddd",
              },
            ]}
            placeholder="***********"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />

        {/* Options */}
        <View style={styles.row}>
          <View style={styles.checkboxContainer}>
            <View style={[styles.checkboxBorder, { backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5" }]}>
              <Checkbox
                  status={rememberMe ? "checked" : "unchecked"}
                  onPress={() => setRememberMe(!rememberMe)}
                  color={"#6C63FF"}
                  uncheckedColor={"#6C63FF"}
              />
            </View>
            <AppText style={styles.checkboxText}>Souviens-toi de moi</AppText>
          </View>

          <TouchableOpacity>
            <AppText style={styles.forgotPassword}>Mot de passe oublié ?</AppText>
          </TouchableOpacity>
        </View>

        {/* Connexion */}
        <RegularButton
            styleButton={styles.loginButton}
            styleText={styles.loginText}
            text="Se Connecter"
            onPress={handleLogin}
        />

        {/* Inscription */}
        <AppText style={styles.signupText}>
          Pas encore de compte ?
          <AppText style={styles.signupLink} onPress={() => router.push("/inscription")}> S'inscrire</AppText>
        </AppText>
      </BackGround>
  );
}

// Styles
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  forgotPassword: {
    color: "#4968df",
    fontSize: 12,
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
