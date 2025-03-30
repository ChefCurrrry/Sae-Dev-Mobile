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

export default function Payment() {
    const [amount, setAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');
    const { id } = useSelectedAsso();

    const { theme } = useTheme();
    const isDark = theme === "dark";

    const formatDateToSQL = (date: Date) => {
        return date.toISOString().slice(0, 19).replace("T", " ");
    };

    const handleConfirm = async () => {
        const type = await SecureStore.getItemAsync("type");
        if (!amount || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
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
            <Text style={[styles.subtitle, { color: isDark ? "#fff" : "#000" }]}>
                Informations de paiement
            </Text>

            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: isDark ? "#2A2A2A" : "#fff",
                        color: isDark ? "#fff" : "#000",
                        borderColor: isDark ? "#555" : "#ccc",
                    }
                ]}
                placeholder="Montant du don (€)"
                placeholderTextColor={isDark ? "#aaa" : "#444"}
                value={amount}
                onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}
            />

            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: isDark ? "#2A2A2A" : "#fff",
                        color: isDark ? "#fff" : "#000",
                        borderColor: isDark ? "#555" : "#ccc",
                    }
                ]}
                placeholder="Numéro de carte bancaire"
                placeholderTextColor={isDark ? "#aaa" : "#444"}
                value={cardNumber}
                maxLength={19}
                onChangeText={(text) => {
                    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 16);
                    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
                    setCardNumber(formatted);
                }}
            />

            <View style={styles.expiryContainer}>
                <TextInput
                    style={[
                        styles.input,
                        styles.expiryInput,
                        {
                            backgroundColor: isDark ? "#2A2A2A" : "#fff",
                            color: isDark ? "#fff" : "#000",
                            borderColor: isDark ? "#555" : "#ccc",
                        }
                    ]}
                    placeholder="MM"
                    placeholderTextColor={isDark ? "#aaa" : "#444"}
                    value={expiryMonth}
                    onChangeText={(text) => setExpiryMonth(text.replace(/[^0-9]/g, ''))}
                    maxLength={2}
                />

                <TextInput
                    style={[
                        styles.input,
                        styles.expiryInput,
                        {
                            backgroundColor: isDark ? "#2A2A2A" : "#fff",
                            color: isDark ? "#fff" : "#000",
                            borderColor: isDark ? "#555" : "#ccc",
                        }
                    ]}
                    placeholder="YY"
                    placeholderTextColor={isDark ? "#aaa" : "#444"}
                    value={expiryYear}
                    onChangeText={(text) => setExpiryYear(text.replace(/[^0-9]/g, ''))}
                    maxLength={2}
                />

                <TextInput
                    style={[
                        styles.input,
                        styles.expiryInput,
                        {
                            backgroundColor: isDark ? "#2A2A2A" : "#fff",
                            color: isDark ? "#fff" : "#000",
                            borderColor: isDark ? "#555" : "#ccc",
                        }
                    ]}
                    placeholder="CVV"
                    placeholderTextColor={isDark ? "#aaa" : "#444"}
                    value={cvv}
                    onChangeText={(text) => setCvv(text.replace(/[^0-9]/g, ''))}
                    maxLength={3}
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
    expiryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: 20,
        width: '100%',
        marginLeft: 0,
    },
    expiryInput: {
        flex: 0.3,
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
