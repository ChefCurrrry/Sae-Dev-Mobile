import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import RegularButton from "@/components/RegularButton";

export default function Payment() {
    // État pour suivre l'option sélectionnée, à null par défaut
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    // Liste d'options de paiement
    const paymentOptions = [
        { id: 1, label: 'Carte bancaire' }, // AJOUTER IMAGE
        { id: 2, label: 'Google & Apple pay' },
        { id: 3, label: 'Virement SEPA' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header bleu/violet */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Moyen de paiement</Text>
            </View>

            <View style={styles.contentContainer}>
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
            </View>

            {/* Bouton confirmation avec RegularButton */}
            <RegularButton
                text="Confirmer"
                onPress={() => {
                    if (selectedOption !== null) {
                        console.log(`Option sélectionnée : ${selectedOption}`);
                    } else {
                        console.log('Aucune option sélectionnée');
                    }
                }}
                styleButton={styles.confirmButton}
                styleText={styles.confirmButtonText}
            />
        </SafeAreaView>
    );
}

// Styles de base
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        backgroundColor: '#5E76FA',
        paddingVertical: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 30,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
    },
    subtitle: {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 20,
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
        marginTop: 40,
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
        marginBottom: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

