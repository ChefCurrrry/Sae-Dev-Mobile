import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { registerUser } from '@/database/Database';
import {Link, router} from "expo-router"; // Importation de la fonction d'inscription

export default function RegisterScreen() {
  const db = useSQLiteContext(); // Connexion à la base de données

  // États pour les champs du formulaire
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fonction de validation et d'inscription
  const handleRegister = async () => {
    // Vérification de l'âge (doit être un nombre ≥ 18)
    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge < 18) {
      Alert.alert("Erreur", "Vous devez avoir au moins 18 ans pour vous inscrire.");
      return;
    }

    // Vérification de l'email (doit contenir un '@')
    if (!email.includes("@")) {
      Alert.alert("Erreur", "Veuillez entrer un email valide.");
      return;
    }

    // Vérification du mot de passe et de la confirmation
    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    // Enregistrement de l'utilisateur dans la base de données
    try {
      const success = await registerUser(db, email, password);
      if (success) {
        Alert.alert("Succès", "Inscription réussie !");
        // Réinitialiser le formulaire après succès
        setAge("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        router.push("/");
      } else {
        Alert.alert("Erreur", "L'inscription a échoué. Vérifiez si l'email est déjà utilisé.");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
      <>
        <View style={styles.header}>
          <Image source={require("../../assets/images/qr-code.png")} style={styles.logo} />
        </View>

        <View style={styles.container} />
        <View style={styles.formContainer}>
          <Text style={styles.title}>Créez votre compte</Text>

          {/* Champ Âge */}
          <TextInput
              style={styles.input}
              placeholder="Âge"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
          />

          {/* Champ Email */}
          <TextInput
              style={styles.input}
              placeholder="nom.prenom@gmail.com"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
          />

          {/* Champ Mot de passe */}
          <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
          />

          {/* Champ Confirmation du mot de passe */}
          <TextInput
              style={styles.input}
              placeholder="Confirmer le mot de passe"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
          />

          {/* Bouton S'inscrire */}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerText}>S'inscrire</Text>
          </TouchableOpacity>

          <Text style={styles.signupText}>
            Vous avez un compte ?
            <Link href={"/"} asChild>
              <Text style={styles.signupLink}> Se Connecter</Text>
            </Link>
          </Text>
        </View>
      </>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
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
