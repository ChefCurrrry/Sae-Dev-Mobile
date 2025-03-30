import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { useTheme } from "@/components/ThemeContext";

interface AppTextProps extends TextProps {
    children: React.ReactNode;
    style?: any;
}

export default function AppText({ children, style, ...props }: AppTextProps) {
    const { theme, isLargeText } = useTheme();
    const isDark = theme === "dark";

    const defaultColor = isDark ? "#fff" : "#000";
    const defaultSize = isLargeText ? 24 : 20;

    return (
        <Text
            {...props}
            style={[
                { color: defaultColor, fontSize: defaultSize }, // base style
                style,
            ]}
        >
            {children}
        </Text>
    );
}
