import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { useTheme } from "@/components/ThemeContext";

export default function AppText({ style, ...props }: TextProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <Text
            {...props}
            style={[{ color: isDark ? "#fff" : "#000" }, style]}
        />
    );
}
