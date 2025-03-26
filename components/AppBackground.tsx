import React from "react";
import {View, StyleSheet, Text, Image} from "react-native";
import {Link, router} from "expo-router";

interface Props {
    children: React.ReactNode; // ✅ Permet d'afficher du contenu dans la partie blanche
    title?: string; // ✅ Optionnel, permet d'afficher un texte en haut
}

export default function AppBackground({ children, title }: Props) {
    return (
        <View style={styles.container}>
            {/* Partie haute en bleu/violet */}
            <View style={styles.header}>
                <View style={styles.profileIcon}>
                    <Link href={"/connexion"}>
                    <Image source={require('../assets/images/profil-de-lutilisateur.png')} />
                    </Link>
                </View>
                <Text style={styles.pageTitle}>{title}</Text>
            </View>

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
        justifyContent: "center", // ✅ Centre le texte verticalement
        alignItems: "center", // ✅ Centre le texte horizontalement
        paddingTop: 50, // ✅ Ajuste l'espace en haut si besoin (évite le notch sur iOS)
    },
    content: {
        flex: 1,
        backgroundColor: "#fff", // ✅ Partie blanche
        borderTopLeftRadius: 30, // ✅ Bord arrondi vers le haut
        borderTopRightRadius: 30,
        padding: 20,
        marginTop: -50, // ✅ Ajuste l'effet de transition
    },
    pageTitle: {
        fontSize: 37,
        fontWeight: "bold",
        color: "#fff", // ✅ Texte en blanc
        textAlign: "center",
        marginBottom: 40,
    },
    profileIcon: {
        width: "100%",
        height: 40,
        alignItems: "flex-end",
        marginRight: 50,
        marginTop: -40,
    }
});
