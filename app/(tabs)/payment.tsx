import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import RegularButton from "@/components/RegularButton";
import BackGround from "@/components/BackGround";
import { Picker } from '@react-native-picker/picker';
import { router } from "expo-router";

export default function Payment() {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [amount, setAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');

    const paymentOptions = [
        { id: 1, label: 'Carte bancaire', image: require('@/assets/images/card.png') },
        { id: 2, label: 'Google & Apple Pay', image: require('@/assets/images/card.png') },
        { id: 3, label: 'Virement SEPA', image: require('@/assets/images/card.png') },
    ];

    const handleConfirm = () => {
        if (selectedOption && amount && cardNumber && expiryMonth && expiryYear && cvv) {
            console.log("Paiement validé");
            router.push("/associations");
        } else {
            console.log("Veuillez remplir tous les champs");
        }
    };

    return (
        <BackGround>
            <Text style={styles.subtitle}>Sélectionnez votre moyen de paiement</Text>


            {/* Zone de saisie du montant */}
            <TextInput
                style={styles.input}
                placeholder="Montant du don (€)"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />

            {/* Numéro de carte */}
            <TextInput
                style={styles.input}
                placeholder="Numéro de carte bancaire"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
            />

            {/* Date d'expiration */}
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={expiryMonth}
                    onValueChange={(itemValue) => setExpiryMonth(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Mois" value="" />
                    {Array.from({ length: 12 }, (_, i) => {
                        const month = String(i + 1).padStart(2, '0');
                        return <Picker.Item key={month} label={month} value={month} />;
                    })}
                </Picker>

                <Picker
                    selectedValue={expiryYear}
                    onValueChange={(itemValue) => setExpiryYear(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Année" value="" />
                    {Array.from({ length: 10 }, (_, i) => {
                        const year = String(new Date().getFullYear() + i);
                        return <Picker.Item key={year} label={year} value={year} />;
                    })}
                </Picker>
            </View>

            {/* CVV */}
            <TextInput
                style={styles.input}
                placeholder="CVV"
                keyboardType="numeric"
                secureTextEntry={true}
                value={cvv}
                onChangeText={setCvv}
                maxLength={3}
            />

            {/* Bouton de confirmation */}
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
    paymentOption: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginBottom: 10,
        marginTop: 20,
    },
    selectedOption: {
        borderColor: '#5E76FA',
        backgroundColor: '#EEF0FF',
    },
    paymentOptionText: {
        fontSize: 17,
        color: '#333',
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
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 15,
    },
    picker: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 8,
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
