import React from "react";
import { View, StyleSheet, Text } from "react-native";
import RegularButton from "@/components/RegularButton";
export default function AssociationPage2() {
    return (
        <View style={styles.container}>
            {/* Section supérieure avec le fond bleu */}
            <View style={styles.header}>
                <Text style={styles.title}>Trouvez l’association qui vous correspond</Text>
            </View>


            <Text style={styles.subtitle}>Quel impact souhaitez-vous avoir avecc votre don ?</Text>

            {/* Boutons */}
            <View style={styles.buttonsContainer}>
                <RegularButton
                    text="Soutenir les béneficiaires"
                    styleButton={[styles.button, styles.lightGrayButton]}
                    styleText={styles.buttonText}
                    onPress={() => alert("Soutenir les béneficiaire")}
                />
                <RegularButton
                    text="🤝Financer la recherche et l'innovation"
                    styleButton={[styles.button, styles.lightGrayButton]}
                    styleText={styles.buttonText}
                    onPress={() => alert("Financer la recherche et l'innovation")}
                />
                <RegularButton
                    text="Sensibiliser et éduquer"
                    styleButton={[styles.button, styles.lightGrayButton]}
                    styleText={styles.buttonText}
                    onPress={() => alert("Sensibiliser et éduquer")}
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
