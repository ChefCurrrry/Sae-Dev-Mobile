import React from "react";
import { View, StyleSheet, Text, AccessibilityInfo } from "react-native";
import RegularButton from "@/components/RegularButton";
import { useTagSelection } from "@/components/TagSelectionContext";
import { router } from "expo-router";
import { useTheme } from "@/components/ThemeContext";
import AppText from "@/components/AppText";

export default function AssociationPage1() {
    const { setTag1 } = useTagSelection();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <View
            style={[styles.container, { backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF" }]}
            accessible={true}
            accessibilityLabel="Page de sélection des causes"
            accessibilityRole="header"
        >
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

            <AppText
                style={[styles.subtitle, { color: isDark ? "#fff" : "#3A3A3A" }]}
                accessibilityRole="text"
                accessibilityLabel="Les causes qui vous tiennent à cœur"
            >
                Les causes qui vous tiennent à cœur ?
            </AppText>

            {/* Boutons */}
            <View style={styles.buttonsContainer}>
                <RegularButton
                    text="🩺 Santé et recherche médicale"
                    styleButton={[styles.button, { backgroundColor: isDark ? "#333" : "#E5E5E5" }]}
                    styleText={{ color: isDark ? "#fff" : "#3A3A3A", fontSize: 14, fontWeight: "600" }}
                    onPress={() => {
                        setTag1(2);
                        router.push("/trouverAsso2");
                    }}
                    accessibilityLabel="Santé et recherche médicale"
                    accessibilityRole="button"
                />
                <RegularButton
                    text="🤝 Solidarité et inclusion"
                    styleButton={[styles.button, { backgroundColor: isDark ? "#333" : "#E5E5E5" }]}
                    styleText={{ color: isDark ? "#fff" : "#3A3A3A", fontSize: 14, fontWeight: "600" }}
                    onPress={() => {
                        setTag1(1);
                        router.push("/trouverAsso2");
                    }}
                    accessibilityLabel="Solidarité et inclusion"
                    accessibilityRole="button"
                />
                <RegularButton
                    text="🌱 Environnement et écologie"
                    styleButton={[styles.button, { backgroundColor: isDark ? "#333" : "#E5E5E5" }]}
                    styleText={{ color: isDark ? "#fff" : "#3A3A3A", fontSize: 14, fontWeight: "600" }}
                    onPress={() => {
                        setTag1(3);
                        router.push("/trouverAsso2");
                    }}
                    accessibilityLabel="Environnement et écologie"
                    accessibilityRole="button"
                />
                <RegularButton
                    text="🏠 Lutte contre la précarité"
                    styleButton={[styles.button, { backgroundColor: isDark ? "#333" : "#E5E5E5" }]}
                    styleText={{ color: isDark ? "#fff" : "#3A3A3A", fontSize: 14, fontWeight: "600" }}
                    onPress={() => {
                        setTag1(4);
                        router.push("/trouverAsso2");
                    }}
                    accessibilityLabel="Lutte contre la précarité"
                    accessibilityRole="button"
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
