import { Image, View, StyleSheet } from "react-native";
import React from "react";
import { router } from "expo-router";
import RegularButton from "@/components/RegularButton";
import AppText from "@/components/AppText";
import { useTheme } from "@/components/ThemeContext";

export default function bienvenueDisplayScreen() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const handlePress = () => {
        router.push("/associations");
    };

    return (
        <>
            <View style={styles.header}>
                <Image source={require("../assets/images/franceAssosSante.png")} style={styles.logo} />
            </View>

            <View style={[styles.container, { backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5" }]} />

            <View style={[styles.formContainer, { backgroundColor: isDark ? "#1E1E1E" : "#fff" }]}>
                <AppText style={styles.title}>Bienvenue sur notre Application</AppText>

                <AppText style={styles.title2}>Faites un geste pour la France, chaque don compte !</AppText>
                <AppText style={styles.title2}>Choisissez une cause qui vous tiens à cœur et contribuez-y dès maintenant</AppText>
                <AppText style={styles.title2}>Découvrez et aidez les associations partenaires en quelques clics !</AppText>

                <RegularButton
                    styleButton={styles.loginButton}
                    styleText={styles.loginText}
                    text="Continuer"
                    onPress={handlePress}
                />
            </View>
        </>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        height: "70%",
    },
    header: {
        height: "45%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4968df",
    },
    logo: {
        width: "100%",
        height: 200,
        tintColor: "white",
        marginTop: -120,
        resizeMode: "contain",
    },
    formContainer: {
        marginTop: -750,
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 20,
        elevation: 5,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    title2: {
        fontSize: 23,
        textAlign: "center",
        marginBottom: 15,
    },
    loginButton: {
        backgroundColor: "#4968df",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 15,
    },
    loginText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
