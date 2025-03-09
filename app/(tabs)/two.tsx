import { StyleSheet, Text, TextInput, Alert } from 'react-native';
import React, { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

import {Link, router} from "expo-router";
import BackGround from "@/components/BackGround"; // Importation de la fonction d'inscription
import RegularButton from '@/components/RegularButton';

export default function RegisterScreen() {
  const db = useSQLiteContext(); // Connexion à la base de données

  // États pour les champs du formulaire
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fonction de validation et d'inscription
  const handleRegister = async () => {
    router.push("/connexion");
  };

  return (
      <>
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
              placeholder="Prenom"
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
          <RegularButton styleButton={styles.registerButton} styleText={styles.registerText} text="S'inscrire" onPress={handleRegister}></RegularButton>

          <Text style={styles.signupText}>
            Vous avez un compte ?
            <Link href={"/connexion"} asChild>
              <Text style={styles.signupLink}> Se Connecter</Text>
            </Link>
          </Text>
        </BackGround>
      </>
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
