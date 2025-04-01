import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Alert,
} from 'react-native';
import { router } from "expo-router";
import BackGround from "@/components/BackGround";
import RegularButton from "@/components/RegularButton";
import * as SecureStore from "expo-secure-store";
import { useSelectedAsso } from "@/components/SelectedAssoContext";
import { useTheme } from "@/components/ThemeContext";
import AppText from "@/components/AppText";
import {CardForm, useConfirmPayment} from "@stripe/stripe-react-native";
import { useTagSelection } from "@/components/TagSelectionContext";


export default function Payment() {
    const [amount, setAmount] = useState('');
    const { id } = useSelectedAsso();
    const { confirmPayment } = useConfirmPayment();
    const { setTag1, setTag2, setTag3 } = useTagSelection();
    const { theme } = useTheme();
    const isDark = theme === "dark";


    const handleConfirm = async () => {
        if (!amount) {
            Alert.alert("Montant requis");
            return;
        }

        try {
            // 1. Récupérer le client secret depuis ton backend
            const res = await fetch("https://backenddevmobile-production.up.railway.app/api/payment/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: Math.round(parseFloat(amount) * 100) }),
            });

            const { clientSecret } = await res.json();

            if (!clientSecret) {
                Alert.alert("Erreur", "Échec de récupération du client secret.");
                return;
            }

            // 2. Utiliser Stripe pour confirmer le paiement
            const { paymentIntent, error } = await confirmPayment(clientSecret, {
                paymentMethodType: "Card",
            });

            if (error) {
                console.log("Erreur de paiement Stripe :", error);
                Alert.alert("Erreur de paiement", error.message || "Une erreur est survenue");
            } else if (paymentIntent) {
                console.log("✅ Paiement confirmé :", paymentIntent.id);
                Alert.alert("Paiement réussi 🎉");

                // Enregistrer le don dans ta BDD
                await saveDon(paymentIntent.id);
                setTag1(null);
                setTag2(null);
                setTag3(null);
                router.replace("/associations");
            }

        } catch (err) {
            console.error("Erreur :", err);
            Alert.alert("Erreur", "Une erreur est survenue.");
        }
    };

    const saveDon = async (paymentIntentId: string) => {
        const type = await SecureStore.getItemAsync("type");
        const idUser = await SecureStore.getItemAsync("userId");
        const endpoint = type === "recurrent"
            ? "https://backenddevmobile-production.up.railway.app/api/dons/registerRecurrentDon"
            : "https://backenddevmobile-production.up.railway.app/api/dons/registerDon";

        const donData = {
            idUtilisateur: idUser ? Number(idUser) : null,
            idAssociation: Number(id),
            montant: Number(amount),
            date: new Date().toISOString().slice(0, 19).replace("T", " "),
            stripeId: paymentIntentId, // facultatif mais bon pour le suivi
        };

        await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(donData),
        });
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
