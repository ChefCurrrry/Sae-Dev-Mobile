import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Alert,
    Text,
} from 'react-native';
import { router } from "expo-router";
import BackGround from "@/components/BackGround";
import RegularButton from "@/components/RegularButton";
import * as SecureStore from "expo-secure-store";
import { useSelectedAsso } from "@/components/SelectedAssoContext";
import { useTheme } from "@/components/ThemeContext";
import AppText from "@/components/AppText";
import {CardField, CardForm, useConfirmPayment} from "@stripe/stripe-react-native";

export default function Payment() {
    const [amount, setAmount] = useState('');
    const { id } = useSelectedAsso();
    const { confirmPayment, loading } = useConfirmPayment();

    const { theme } = useTheme();
    const isDark = theme === "dark";

    const formatDateToSQL = (date: Date) => {
        return date.toISOString().slice(0, 19).replace("T", " ");
    };

    const handleConfirm = async () => {
        const type = await SecureStore.getItemAsync("type");
        if (!amount) {
            Alert.alert("Remplissez tous les champs");
            return;
        }

        if (!id) {
            Alert.alert("Erreur", "Association non définie.");
            return;
        }

        const idUser = await SecureStore.getItemAsync("userId");

        if (type === "recurrent" && !idUser) {
            Alert.alert("Connexion requise", "Veuillez vous connecter pour planifier un don récurrent.");
            router.push("/connexion");
            return;
        }

        const donData = {
            idUtilisateur: idUser ? Number(idUser) : null,
            idAssociation: Number(id),
            montant: Number(amount),
            date: formatDateToSQL(new Date()),
        };

        const endpoint = type === "recurrent"
            ? "https://backenddevmobile-production.up.railway.app/api/dons/registerRecurrentDon"
            : "https://backenddevmobile-production.up.railway.app/api/dons/registerDon";

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(donData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                Alert.alert("Merci 🙌", type === "recurrent" ? "Don récurrent enregistré !" : "Don enregistré !");
                router.push("/associations");
            } else {
                console.error("❌ Réponse backend :", data);
                Alert.alert("Erreur", data.message || "Une erreur est survenue.");
            }
        } catch (error) {
            console.error("❌ Erreur lors de l'envoi du don :", error);
            Alert.alert("Erreur", "Impossible de contacter le serveur.");
        }
    };

    return (
        <BackGround>
            <AppText style={[styles.subtitle, { color: isDark ? "#fff" : "#000" }]}>
                Informations de paiement
            </AppText>

            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: "#2A2A2A", // toujours sombre
                        color: "#fff",              // texte blanc
                        borderColor: "#444",        // optionnel pour meilleure lisibilité
                    },
                ]}
                placeholder="Montant du don (€)"
                placeholderTextColor="#bbb"
                value={amount}
                onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}
            />



            <View style={[styles.cardFormWrapper, { borderRadius: 8 }]}>
                <CardForm
                    style={styles.cardForm}
                    onFormComplete={(cardDetails) => {
                        console.log("✅ Carte complète :", cardDetails);
                    }}
                    cardStyle={{
                        backgroundColor: "#2A2A2A",
                        textColor: "#fff",
                        placeholderColor: "#bbb",
                        fontSize: 16,
                    }}

                    placeholders={{
                        number: "1234 1234 1234 1234",
                        expiration: "MM/AA",
                        cvc: "CVC",
                        postalCode: "Code postal",
                    }}
                />
            </View>



            <RegularButton
                text="Valider le paiement"
                onPress={handleConfirm}
                styleButton={styles.confirmButton}
                styleText={styles.confirmButtonText}
                accessibilityLabel={"Boutton de validation de paiement"}
                accessibilityRole={"Button"}
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
        borderRadius: 8,
        padding: 12,
        marginHorizontal: 20,
        marginTop: 15,
        fontSize: 16,
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
    cardFormWrapper: {
        width: '90%',
        marginVertical: 20,
        alignSelf: 'center',
        borderRadius: 8,
        padding: 4,
    },
    cardForm: {
        height: 170, // ajuste si nécessaire
        width: '100%',
    },


});
