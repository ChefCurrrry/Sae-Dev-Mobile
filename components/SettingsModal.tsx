import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "@/components/AppText";
import RegularButton from "@/components/RegularButton";
import { useTheme } from "@/components/ThemeContext";

interface Props {
    visible: boolean;
    onClose: () => void;
    toggleTheme: () => void;
    toggleTextSize: () => void; // ✅ Ajouté
    isDark: boolean;
    isLargeText: boolean; // ✅ Renommé pour cohérence
}

export default function SettingsModal({
                                          visible,
                                          onClose,
                                          toggleTheme,
                                          toggleTextSize,
                                          isDark,
                                          isLargeText,
                                      }: Props) {
    const modalBackground = isDark ? "#1E1E1E" : "#fff";

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={[styles.settingsModal, { backgroundColor: modalBackground }]}>
                    <AppText style={styles.title}>⚙️ Paramètres</AppText>

                    <TouchableOpacity style={styles.settingOption} onPress={toggleTheme}>
                        <AppText style={styles.settingText}>
                            {isDark ? "🌙 Mode sombre activé" : "☀️ Mode clair activé"}
                        </AppText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleTextSize} style={styles.settingOption}>
                        <AppText style={styles.settingText}>
                            {isLargeText ? "🔠 Texte agrandi activé" : "🔡 Texte standard"}
                        </AppText>
                    </TouchableOpacity>

                    <RegularButton
                        text="Fermer"
                        styleButton={styles.loginButton}
                        styleText={styles.loginText}
                        onPress={onClose}
                        accessibilityLabel={"Boutton de fermeture des paramètres"}
                        accessibilityRole={"Button"}
                    />
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    settingsModal: {
        width: "80%",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
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
    loginButton: {
        backgroundColor: "#4968df",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
        width: "100%",
    },
    loginText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
