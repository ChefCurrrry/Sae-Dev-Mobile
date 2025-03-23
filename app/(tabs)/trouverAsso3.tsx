import React from "react";
import { View, StyleSheet, Text } from "react-native";
import RegularButton from "@/components/RegularButton";
export default function AssociationPage3() {
    return (
        <View style={styles.container}>
            {/* Section supérieure avec le fond bleu */}
            <View style={styles.header}>
                <Text style={styles.title}>Trouvez l’association qui vous correspond</Text>
            </View>


            <Text style={styles.subtitle}>Préferez-vous une association déjà bien établie ou une plus petite structure ?</Text>

            {/* Boutons */}
            <View style={styles.buttonsContainer}>
                <RegularButton
                    text="Grande association"
                    styleButton={[styles.button, styles.lightGrayButton]}
                    styleText={styles.buttonText}
                    onPress={() => alert("Grande association")}
                />
                <RegularButton
                    text="Petite association"
                    styleButton={[styles.button, styles.lightGrayButton]}
                    styleText={styles.buttonText}
                    onPress={() => alert("Petite association")}
                />
                <RegularButton
                    text="Peu importe"
                    styleButton={[styles.button, styles.lightGrayButton]}
                    styleText={styles.buttonText}
                    onPress={() => alert("Peu importe")}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        backgroundColor: "#4462cf",
        paddingVertical: 70,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#FFFFFF",
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
        color: "#3A3A3A",
        marginVertical: 20,
    },
    buttonsContainer: {
        paddingTop: 30,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    button: {

        width: "100%",
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom: 35,
        alignItems: "center",
    },

    lightGrayButton: {
        backgroundColor: "#E5E5E5",
    },

    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#3A3A3A",
    },
});
