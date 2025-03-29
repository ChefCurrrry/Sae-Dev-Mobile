import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/components/ThemeContext";
import SettingsModal from "@/components/SettingsModal";


// @ts-ignore
export default function BackGround({ children }) {
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const { theme, toggleTheme, isLargeText, toggleTextSize } = useTheme();
    const isDark = theme === "dark";

    return (
        <>
            <View style={styles.header}>
                {/* Icône paramètre positionnée en haut à droite */}
                <TouchableOpacity style={styles.settingsButton} onPress={() => setShowSettingsModal(true)}>
                    <Image style={styles.icon} source={require("../assets/images/parametres-cog.png")} />
                </TouchableOpacity>

                <Image source={require("../assets/images/franceAssosSante.png")} style={styles.logo} />
            </View>

            <View style={[styles.container, { backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5" }]} />
            <View style={[styles.formContainer, { backgroundColor: isDark ? "#1E1E1E" : "#fff" }]}>
                {children}
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        height: "70%",
    },
    header: {
        height: "45%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4968df",
        position: "relative",
    },
    logo: {
        width: "100%",
        height: 200,
        marginTop: -120,
        resizeMode: "contain",
    },
    formContainer: {
        marginTop: -750,
        backgroundColor: "white",
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 20,
        elevation: 5,
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
    settingsModal: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        elevation: 5,
    },
    settingOption: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        width: "100%",
    },
    settingText: {
        fontSize: 16,
        textAlign: "center",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    loginButton: {
        width: "100%",
        backgroundColor: "#4968df",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
    },
    loginText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
