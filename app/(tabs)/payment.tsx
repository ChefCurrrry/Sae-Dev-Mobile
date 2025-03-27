import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
} from 'react-native';
import { useLocalSearchParams } from "expo-router";
import RegularButton from "@/components/RegularButton";
import BackGround from "@/components/BackGround";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function Payment() {
    const [amount, setAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');
    const {idAsso} = useLocalSearchParams();

    const handleConfirm = async () => {
        if (amount && cardNumber && expiryMonth && expiryYear && cvv) {
            const idUser = await SecureStore.getItemAsync("UserId");
            const donData = {
                idUtilisateur : idUser,
                idAssociation: idAsso, // 👈 récupéré de l'URL
                montant: Number(amount),
                date: new Date().toISOString(),
                // autres infos si besoin
            };

            try {
                const response = await fetch("https://backenddevmobile-production.up.railway.app/api/dons/registerDon", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(donData),
                });

                if (response.ok) {
                    Alert.alert("Merci 🙌", "Votre don a bien été enregistré !");
                    router.push("/associations");
                } else {
                    Alert.alert("Erreur", "Une erreur est survenue.");
                }
            } catch (error) {
                console.error("❌ Erreur lors de l'envoi du don :", error);
                Alert.alert("Erreur", "Impossible de contacter le serveur.");
            }
        } else {
            Alert.alert("Remplissez tous les champs");
        }
    };


    return (
        <BackGround>
            <Text style={styles.subtitle}>Informations de paiement</Text>

            <TextInput
                style={styles.input}
                placeholder="Montant du don (€)"
                placeholderTextColor="#444"
                value={amount}
                onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}
            />

            <TextInput
                style={styles.input}
                placeholder="Numéro de carte bancaire"
                placeholderTextColor="#444"
                value={cardNumber}
                maxLength={19}
                onChangeText={(text) => {
                    // Supprime les caractères non numériques
                    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 16);

                    // Ajoute un espace toutes les 4 chiffres
                    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();

                    setCardNumber(formatted);
                }}
            />

            <View style={styles.expiryContainer}>
                <TextInput
                    style={[styles.input, styles.expiryInput]}
                    placeholder="MM"
                    placeholderTextColor="#444"
                    value={expiryMonth}
                    onChangeText={(text) => setExpiryMonth(text.replace(/[^0-9]/g, ''))}
                    maxLength={2}
                />
                <TextInput
                    style={[styles.input, styles.expiryInput]}
                    placeholder="YY"
                    placeholderTextColor="#444"
                    value={expiryYear}
                    onChangeText={(text) => setExpiryYear(text.replace(/[^0-9]/g, ''))}
                    maxLength={2}
                />
                <TextInput
                    style={[styles.input, styles.expiryInput]}
                    placeholder="CVV"
                    placeholderTextColor="#444"
                    value={cvv}
                    onChangeText={(text) => setCvv(text.replace(/[^0-9]/g, ''))}
                    secureTextEntry={true}
                    maxLength={3}
                />
            </View>



            <RegularButton
                text="Valider le paiement"
                onPress={handleConfirm}
                styleButton={styles.confirmButton}
                styleText={styles.confirmButtonText}
            />
        </BackGround>
    );
}

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginHorizontal: 20,
        marginTop: 15,
        fontSize: 16,
    },
    expiryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 0,
    },
    expiryInput: {
        flex: 0.48,
    },
    confirmButton: {
        backgroundColor: '#5E76FA',
        paddingVertical: 15,
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 30,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
