import {Image, View, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import { router } from "expo-router";
import RegularButton from "@/components/RegularButton";
import AppText from "@/components/AppText";
import { useTheme } from "@/components/ThemeContext";
import SettingsModal from "@/components/SettingsModal";

export default function bienvenueDisplayScreen() {
    const { theme, toggleTheme, isLargeText, toggleTextSize } = useTheme();
    const isDark = theme === "dark";
    const [showSettingsModal, setShowSettingsModal] = useState(false);



    const handlePress = () => {
        router.replace("/confidentialite");
    };

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity style={styles.settingsButton} onPress={() => setShowSettingsModal(true)}>
                    <Image style={styles.icon} source={require("../assets/images/parametres-cog.png")} />
                </TouchableOpacity>
                <Image source={require("../assets/images/franceAssosSante.png")} style={styles.logo} />
            </View>

            <View style={[styles.container, { backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5" }]} />

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
                    accessibilityLabel={"Bouton du menu réglages"}
                    accessibilityRole={"button"}
                />
            </View>
            <SettingsModal
                visible={showSettingsModal}
                onClose={() => setShowSettingsModal(false)}
                toggleTheme={toggleTheme}
                toggleTextSize={toggleTextSize}
                isDark={isDark}
                isLargeText={isLargeText}
            />


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
    icon: {
        width: 40,
        height: 40,
        tintColor: "#fff",
    },
    settingsButton: {
        position: "absolute",
        top: 35,
        right: 20,
        padding: 5,
        zIndex: 10,
    },
});
