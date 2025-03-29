import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useTheme } from "@/components/ThemeContext";
import AppText from "@/components/AppText";
import SettingsModal from "@/components/SettingsModal";

interface Props {
    children: React.ReactNode;
    title?: string;
}

export default function AppBackground({ children, title }: Props) {
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const { theme, toggleTheme, isLargeText, toggleTextSize } = useTheme();
    const isDark = theme === "dark";

    const handleProfileClick = async () => {
        const userId = await SecureStore.getItemAsync("userId");
        if (userId) {
            router.push("/profile");
        } else {
            router.push("/connexion");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* Icônes profil & paramètres */}
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.leftIcon} onPress={handleProfileClick}>
                        <Image style={styles.icon} source={require("../assets/images/profil-de-lutilisateur.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rightIcon} onPress={() => setShowSettingsModal(true)}>
                        <Image style={styles.icon} source={require("../assets/images/parametres-cog.png")} />
                    </TouchableOpacity>
                </View>

                {/* Titre centré */}
                {title && <AppText style={styles.pageTitle}>{title}</AppText>}
            </View>

            {/* Zone blanche ou noire selon le thème */}
            <View style={[styles.content, { backgroundColor: isDark ? "#1E1E1E" : "#fff" }]}>
                {children}
            </View>

            {/* Modal paramètres */}
            <SettingsModal
                visible={showSettingsModal}
                onClose={() => setShowSettingsModal(false)}
                toggleTheme={toggleTheme}
                toggleTextSize={toggleTextSize}
                isDark={isDark}
                isLargeText={isLargeText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4968df",
    },
    header: {
        height: "30%",
        backgroundColor: "#4968df",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
        position: "relative",
    },
    headerIcons: {
        position: "absolute",
        top: 40,
        left: 20,
        right: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leftIcon: {
        padding: 5,
    },
    rightIcon: {
        padding: 5,
    },
    icon: {
        width: 40,
        height: 40,
        tintColor: "#fff",
    },
    pageTitle: {
        fontSize: 37,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        marginBottom: 30,
    },
    content: {
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        marginTop: -50,
    },
});
