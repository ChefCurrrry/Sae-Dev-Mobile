import { Alert, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { Checkbox } from "react-native-paper";
import React, {useEffect, useState} from "react";
import {Link, router} from "expo-router";
import BackGround from "@/components/BackGround";
import RegularButton from "@/components/RegularButton";

import { useNavigation } from "@react-navigation/native";





export default function TabOneScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigation = useNavigation();



  const API_URL = "https://backenddevmobile-production.up.railway.app/api/users/login"
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
        router.push("/associations");
      } else {
        Alert.alert("Erreur", data.message);
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      Alert.alert("Erreur", "Impossible de se connecter au serveur.");
    }
  };





  return (
      <>
        <BackGround>

          <Text style={styles.title}>Connectez-vous à votre compte</Text>

          {/* Champ Email */}
          <TextInput
              style={styles.input}
              placeholder="nom.prenom@gmail.com"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
          />

          {/* Champ Password */}
          <TextInput
              style={styles.input}
              placeholder="***********"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
          />

          {/* Options Remember Me & Forgot Password */}
          <View style={styles.row}>
            <View style={styles.checkboxContainer}>
              <View style={styles.checkboxBorder}>
                <Checkbox
                    status={rememberMe ? "checked" : "unchecked"}
                    onPress={() => setRememberMe(!rememberMe)}
                    color={"#6C63FF"}
                    uncheckedColor={"#6C63FF"}
                />
              </View>
              <Text style={styles.checkboxText}>Souviens-toi de moi</Text>
            </View>
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
          </View>

          {/* Bouton Log in */}
          <RegularButton styleButton={styles.loginButton} styleText={styles.loginText} text="Se Connecter" onPress={handleLogin} ></RegularButton>

          {/* Lien pour s'inscrire */}
          <Text style={styles.signupText}>
            Pas encore de compte ?
              <Text style={styles.signupLink} onPress={() => navigation.navigate("inscription")}> S'inscrire</Text>
          </Text>
        </BackGround>
      </>
  );
};

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
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
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
    backgroundColor: "#F5F5F5",
  },
  checkboxText: {
    fontSize: 12,
    marginLeft: 10,
    color: "black",
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
    color: "black",
  },
  signupLink: {
    color: "#4968df",
    fontWeight: "bold",
  },
});