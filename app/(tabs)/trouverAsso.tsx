import React from "react";
import { View, StyleSheet, Text } from "react-native";
import RegularButton from "@/components/RegularButton";
import { useTagSelection } from "@/components/TagSelectionContext";
import { router } from "expo-router";
import { useTheme } from "@/components/ThemeContext";

export default function AssociationPage1() {
    const { setTag1 } = useTagSelection();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <View style={[styles.container, { backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF" }]}>
            {/* Section supérieure avec le fond bleu */}
            <View style={styles.header}>
                <Text style={styles.title}>Trouvez l’association qui vous correspond</Text>
            </View>

            <Text style={[styles.subtitle, { color: isDark ? "#fff" : "#3A3A3A" }]}>
                Les causes qui vous tiennent à cœur ?
            </Text>

            {/* Boutons */}
            <View style={styles.buttonsContainer}>
                <RegularButton
                    text="🩺 Santé et recherche médicale"
                    styleButton={[
                        styles.button,
                        { backgroundColor: isDark ? "#333" : "#E5E5E5" },
                    ]}
                    styleText={{ color: isDark ? "#fff" : "#3A3A3A", fontSize: 14, fontWeight: "600" }}
                    onPress={() => {
                        setTag1(2);
                        router.push("/trouverAsso2");
                    }}
                />
                <RegularButton
                    text="🤝 Solidarité et inclusion"
                    styleButton={[
                        styles.button,
                        { backgroundColor: isDark ? "#333" : "#E5E5E5" },
                    ]}
                    styleText={{ color: isDark ? "#fff" : "#3A3A3A", fontSize: 14, fontWeight: "600" }}
                    onPress={() => {
                        setTag1(1);
                        router.push("/trouverAsso2");
                    }}
                />
                <RegularButton
                    text="🌱 Environnement et écologie"
                    styleButton={[
                        styles.button,
                        { backgroundColor: isDark ? "#333" : "#E5E5E5" },
                    ]}
                    styleText={{ color: isDark ? "#fff" : "#3A3A3A", fontSize: 14, fontWeight: "600" }}
                    onPress={() => {
                        setTag1(3);
                        router.push("/trouverAsso2");
                    }}
                />
                <RegularButton
                    text="🏠 Lutte contre la précarité"
                    styleButton={[
                        styles.button,
                        { backgroundColor: isDark ? "#333" : "#E5E5E5" },
                    ]}
                    styleText={{ color: isDark ? "#fff" : "#3A3A3A", fontSize: 14, fontWeight: "600" }}
                    onPress={() => {
                        setTag1(4);
                        router.push("/trouverAsso2");
                    }}
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
