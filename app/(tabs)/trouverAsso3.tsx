import React from "react";
import { View, StyleSheet, Text } from "react-native";
import RegularButton from "@/components/RegularButton";
import { useTagSelection } from "@/components/TagSelectionContext";
import { router } from "expo-router";
import { useTheme } from "@/components/ThemeContext";

export default function AssociationPage3() {
    const { setTag3 } = useTagSelection();
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
                accessibilityLabel="Préférez-vous une association déjà bien établie ou une plus petite structure ?"
            >
                Préférez-vous une association déjà bien établie ou une plus petite structure ?
            </Text>

            {/* Boutons */}
            <View style={styles.buttonsContainer}>
                <RegularButton
                    text="Grande association"
                    styleButton={[
                        styles.button,
                        { backgroundColor: isDark ? "#333" : "#E5E5E5" },
                    ]}
                    styleText={{
                        color: isDark ? "#fff" : "#3A3A3A",
                        fontSize: 14,
                        fontWeight: "600",
                    }}
                    onPress={() => {
                        setTag3(1);
                        router.push("/associations");
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Choisir grande association"
                />
                <RegularButton
                    text="Petite association"
                    styleButton={[
                        styles.button,
                        { backgroundColor: isDark ? "#333" : "#E5E5E5" },
                    ]}
                    styleText={{
                        color: isDark ? "#fff" : "#3A3A3A",
                        fontSize: 14,
                        fontWeight: "600",
                    }}
                    onPress={() => {
                        setTag3(2);
                        router.push("/associations");
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Choisir petite association"
                />
                <RegularButton
                    text="Peu importe"
                    styleButton={[
                        styles.button,
                        { backgroundColor: isDark ? "#333" : "#E5E5E5" },
                    ]}
                    styleText={{
                        color: isDark ? "#fff" : "#3A3A3A",
                        fontSize: 14,
                        fontWeight: "600",
                    }}
                    onPress={() => {
                        setTag3(null); // valeur null si l'utilisateur ne choisit pas
                        router.push("/associations");
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Choisir peu importe"
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
