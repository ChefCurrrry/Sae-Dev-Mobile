import React, {useState} from "react";
import {View, StyleSheet, Text, Image, TouchableOpacity, Modal} from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useTheme } from "@/components/ThemeContext";
import AppText from "@/components/AppText";
import RegularButton from "@/components/RegularButton";
import SettingsModal from "@/components/SettingsModal";

interface Props {
    children: React.ReactNode;
    title?: string;
}

export default function AppBackground({ children, title }: Props) {
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [largeText, setLargeText] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";
    const modalBackground = isDark ? "#1E1E1E" : "#fff";

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
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.leftIcon} onPress={handleProfileClick}>
                        <Image style={styles.icon} source={require("../assets/images/profil-de-lutilisateur.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rightIcon} onPress={() => setShowSettingsModal(true)}>
                        <Image style={styles.icon} source={require("../assets/images/parametres-cog.png")} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.pageTitle}>{title}</Text>
            </View>

            <View style={[styles.content, { backgroundColor: isDark ? "#1E1E1E" : "#fff" }]}>
                {children}
            </View>
            <SettingsModal
                visible={showSettingsModal}
                onClose={() => setShowSettingsModal(false)}
                toggleTheme={toggleTheme}
                isDark={isDark}
                largeText={largeText}
                setLargeText={setLargeText}
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
    content: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        marginTop: -50,
    },
    pageTitle: {
        fontSize: 37,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        marginBottom: 30,
    },
    icon: {
        width: 40,   // 🔼 augmenté depuis 30
        height: 40,  // 🔼 augmenté depuis 30
        tintColor: "#fff",
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