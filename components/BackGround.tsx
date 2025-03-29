import {Image, StyleSheet, View} from "react-native";
import React from "react";
import { useTheme } from "@/components/ThemeContext";



// @ts-ignore
export default function BackGround({ children }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <>
            <View style={styles.header}>
                <Image source={require("../assets/images/franceAssosSante.png")} style={styles.logo} />
            </View>
            <View style={[styles.container, { backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5" }]} />
            <View style={[styles.formContainer, { backgroundColor: isDark ? "#1E1E1E" : "#fff" }]}>
                {children}
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5F5",
        height: '70%'
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
        tintColor: "white",
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
})