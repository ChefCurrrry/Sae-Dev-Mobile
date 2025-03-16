import React from "react";
import { View, StyleSheet } from "react-native";

interface Props {
    children: React.ReactNode; // ✅ Permet d'afficher du contenu dans la partie blanche
}

export default function AppBackground({ children }: Props) {
    return (
        <View style={styles.container}>
            {/* Partie haute en bleu/violet */}
            <View style={styles.header} />

            {/* Partie basse blanche qui contient les enfants */}
            <View style={styles.content}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4968df", // ✅ Bleu/Violet en haut
    },
    header: {
        height: "30%", // ✅ Hauteur de la partie bleue (ajuste si besoin)
        backgroundColor: "#4968df",
        borderBottomLeftRadius: 30, // ✅ Bord arrondi vers la partie blanche
        borderBottomRightRadius: 30,
    },
    content: {
        flex: 1,
        backgroundColor: "#fff", // ✅ Partie blanche
        borderTopLeftRadius: 30, // ✅ Bord arrondi vers le haut
        borderTopRightRadius: 30,
        padding: 20,
        marginTop: -30, // ✅ Ajuste l'effet de transition
    },
});
