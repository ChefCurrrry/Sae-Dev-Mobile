import { Image, StyleSheet, TouchableOpacity, View, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/components/ThemeContext";
import SettingsModal from "@/components/SettingsModal";

// @ts-ignore
export default function BackGround({ children }) {
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const { theme, toggleTheme, isLargeText, toggleTextSize } = useTheme();
    const isDark = theme === "dark";
    const { height } = useWindowDimensions();

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => setShowSettingsModal(true)}
                    accessibilityLabel="Ouvrir les paramètres"
                    accessibilityRole="button"
                >
                    <Image
                        style={styles.icon}
                        source={require("../assets/images/parametres-cog.png")}
                        accessibilityIgnoresInvertColors
                    />
                </TouchableOpacity>

                <Image
                    source={require("../assets/images/franceAssosSante.png")}
                    style={styles.logo}
                    resizeMode="contain"
                    accessibilityLabel="Logo de France Assos Santé"
                />
            </View>

            <View style={[styles.container, { backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5", height: height * 0.7 }]} />

            <View style={[
                styles.formContainer,
                {
                    backgroundColor: isDark ? "#1E1E1E" : "#fff",
                },
            ]}>
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
    },
    formContainer: {
        marginTop: -750,
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
});
