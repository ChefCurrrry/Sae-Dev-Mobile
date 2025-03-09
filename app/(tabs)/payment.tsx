import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function PaymentScreen() {
    // État pour suivre l'option sélectionnée, à null par defaut
// Type explicite pour le state : peut être number ou null
    const [selectedOption, setSelectedOption] = useState<number | null>(null);


    //  liste d'options
    const paymentOptions = [
        { id: 1, label: 'Carte bancaire' },
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

            {/* Bouton confirmation */}
            <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                    if (selectedOption !== null) {
                        // Votre logique de confirmation
                        console.log(`Option sélectionnée : ${selectedOption}`);
                    } else {
                        // Gérer le cas où aucune option n'est sélectionnée
                        console.log('Aucune option sélectionnée');
                    }
                }}
            >
                <Text style={styles.confirmButtonText}>Confirmer</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

// Styles de base
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff', // Couleur de fond globale
    },
    header: {
        backgroundColor: '#5E76FA', // Ajustez la couleur selon vos besoins
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

        // Faire remonter le container sur le header
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
        borderColor: '#5E76FA', // Couleur de surlignage pour l'option sélectionnée
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
