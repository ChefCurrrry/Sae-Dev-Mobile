import React from "react";
import { View, StyleSheet, Text } from "react-native";
import RegularButton from "@/components/RegularButton";
import { useTagSelection } from "@/components/TagSelectionContext";
import { router } from "expo-router";
import { useTheme } from "@/components/ThemeContext";

export default function AssociationPage2() {
    const { setTag2 } = useTagSelection();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <View style={[styles.container, { backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF" }]}>
            {/* Section supérieure avec le fond bleu */}
            <View style={styles.header}>
                <Text
                    style={styles.title}
                    accessibilityRole="header"
                    accessibilityLabel="Trouvez l’association qui vous correspond"
                >
                    Trouvez l’association qui vous correspond
                </Text>
            </View>

            <Text
                style={[styles.subtitle, { color: isDark ? "#fff" : "#3A3A3A" }]}
                accessibilityLabel="Quel impact souhaitez-vous avoir avec votre don ?"
            >
                Quel impact souhaitez-vous avoir avec votre don ?
            </Text>

            {/* Boutons */}
            <View style={styles.buttonsContainer}>
                <RegularButton
                    text="Soutenir les bénéficiaires"
                    styleButton={[
                        styles.button,
                        { backgroundColor: isDark ? "#333" : "#E5E5E5" },
                    ]}
                    styleText={{ color: isDark ? "#fff" : "#3A3A3A", fontSize: 14, fontWeight: "600" }}
                    onPress={() => {
                        setTag2(3);
                        router.push("/trouverAsso3");
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Choisir de soutenir les bénéficiaires"
                />
                <RegularButton
                    text="🤝 Financer la recherche et l'innovation"
                    styleButton={[
                        styles.button,
                        { backgroundColor: isDark ? "#333" : "#E5E5E5" },
                    ]}
                    styleText={{ color: isDark ? "#fff" : "#3A3A3A", fontSize: 14, fontWeight: "600" }}
                    onPress={() => {
                        setTag2(1);
                        router.push("/trouverAsso3");
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Choisir de financer la recherche et l’innovation"
                />
                <RegularButton
                    text="Sensibiliser et éduquer"
                    styleButton={[
                        styles.button,
                        { backgroundColor: isDark ? "#333" : "#E5E5E5" },
                    ]}
                    styleText={{ color: isDark ? "#fff" : "#3A3A3A", fontSize: 14, fontWeight: "600" }}
                    onPress={() => {
                        setTag2(2);
                        router.push("/trouverAsso3");
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Choisir de sensibiliser et éduquer"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});
