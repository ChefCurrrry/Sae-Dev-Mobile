import { Alert, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { Checkbox } from "react-native-paper";
import { Image } from 'react-native';
import React, {useEffect, useState} from "react";
import {Link, router} from "expo-router";
import {initializeDatabase, loginUser} from '@/database/Database';
import { useSQLiteContext } from "expo-sqlite";

export default function TabOneScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const[users, setUsers] = useState("");
  const db = useSQLiteContext();

  useEffect(() => {
    async function initDB() {
      try {
        await initializeDatabase(db);
        console.log("✅ BDD Initialisée");

        // Vérifier les tables existantes
        /*const tables = await db.getAllAsync("SELECT name FROM sqlite_master WHERE type='table'");
        console.log("📌 Tables existantes :", tables);*/

      } catch (error) {
        console.error("❌ Erreur lors de l'initialisation de la base :", error);
      }
    }
    initDB();
  }, [db]);


  // Pour vérifier les utilisateurs dans la base
  /*useEffect(() => {
    async function fetchUsers() {
      try {
        // Récupérer les utilisateurs
        const result = await db.getAllAsync('SELECT * FROM users');
        setUsers(result); // Mettre à jour l'état
        console.log("📌 Utilisateurs récupérés :", result);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des utilisateurs :", error);
      }
    }
    fetchUsers();
  }, [db]);*/

  // Fonction de connexion
  const handleLogin = async () => {
    if (!email || !password || !email.includes("@")) {
      Alert.alert("Erreur", "Veuillez entrer un email et un mot de passe.");
      return;
    }

    try {
      const success = await loginUser(db, email, password);
      if (success) {
        Alert.alert("Succès", "Connexion réussie !");
        setEmail("");
        setPassword("");
        router.push("/two");
      } else {
        Alert.alert("Email ou Mot de Passe Incorrect");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la connexion.");
    }
  };

  return (
      <>
        <View style={styles.header}>
          <Image source={require("../../assets/images/qr-code.png")} style={styles.logo} />
        </View>

        <View style={styles.container} />
        <View style={styles.formContainer}>
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
            <Link href={"/two"} asChild>
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Bouton Log in */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>

          {/* Lien pour s'inscrire */}
          <Text style={styles.signupText}>
            Pas encore de compte ?
            <Link href={"/two"} asChild>
              <Text style={styles.signupLink}> S'inscrire</Text>
            </Link>
          </Text>
        </View>
      </>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5F5",
    height: '70%',
  },
  header: {
    height: "45%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4968df",
  },
  logo: {
    width: 80,
    height: 80,
    tintColor: "white",
    marginTop: -120,
  },
  formContainer: {
    marginTop: -680,
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    elevation: 5,
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