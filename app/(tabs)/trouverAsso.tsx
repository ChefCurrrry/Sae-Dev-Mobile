import React from "react";
import { View, StyleSheet, Text } from "react-native";
import RegularButton from "@/components/RegularButton";
export default function AssociationPage1() {
    return (
        <View style={styles.container}>
            {/* Section supérieure avec le fond bleu */}
            <View style={styles.header}>
                <Text style={styles.title}>Trouvez l’association qui vous correspond</Text>
            </View>

            <Text style={styles.subtitle}>Les causes qui vous tiennent à cœur ?</Text>

            {/* Boutons */}
            <View style={styles.buttonsContainer}>
                <RegularButton
                    text="🩺 Santé et recherche médicale"
                    styleButton={[styles.button, styles.lightGrayButton]}
                    styleText={styles.buttonText}
                    onPress={() => alert("Santé et recherche médicale")}
                />
                <RegularButton
                    text="🤝 Solidarité et inclusion"
                    styleButton={[styles.button, styles.lightGrayButton]}
                    styleText={styles.buttonText}
                    onPress={() => alert("Solidarité et inclusion")}
                />
                <RegularButton
                    text="🌱 Environnement et écologie"
                    styleButton={[styles.button, styles.lightGrayButton]}
                    styleText={styles.buttonText}
                    onPress={() => alert("Environnement et écologie")}
                />
                <RegularButton
                    text="🏠 Lutte contre la précarité"
                    styleButton={[styles.button, styles.lightGrayButton]}
                    styleText={styles.buttonText}
                    onPress={() => alert("Lutte contre la précarité")}
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
        backgroundColor: "#4462cf", // Bleu pour le fond
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
