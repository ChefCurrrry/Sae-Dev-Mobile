import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import RegularButton from "@/components/RegularButton";
import BackGround from "@/components/BackGround";

export default function Payment() {
    // État pour suivre l'option sélectionnée, à null par défaut
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    // Liste d'options de paiement
    const paymentOptions = [
        { id: 1, label: 'Carte bancaire' }, // AJOUTER IMAGE
        { id: 2, label: 'Google & Apple pay' },
        { id: 3, label: 'Virement SEPA' },
    ];

    const handlePress = () => {
        if (selectedOption !== null) {
            console.log(`Option sélectionnée : ${selectedOption}`);
        } else {
            console.log('Aucune option sélectionnée');
        }
    }

    return (
        <BackGround>
                <Text style={styles.subtitle}>Sélectionnez votre moyen de paiement</Text>

                {/* Liste des options de paiement */}
                {paymentOptions.map((option) => {
                    const isSelected = selectedOption === option.id;
                    return (
                        <TouchableOpacity
                            key={option.id}
                            style={[
                                styles.paymentOption,
                                isSelected && styles.selectedOption
                            ]}
                            onPress={() => setSelectedOption(option.id)}
                        >
                            <Text style={styles.paymentOptionText}>{option.label}</Text>
                        </TouchableOpacity>
                    );
                })}


            {/* Bouton confirmation avec RegularButton */}
            <RegularButton
                text="Confirmer"
                onPress={handlePress}
                styleButton={styles.confirmButton}
                styleText={styles.confirmButtonText}
            />
        </BackGround>
    );
}

// Styles de base
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
    confirmButton: {
        backgroundColor: '#5E76FA',
        paddingVertical: 15,
        marginHorizontal: 20,
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

