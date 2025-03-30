import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

interface RegularButtonProps {
    text: string;
    onPress: () => void;
    styleButton?: any;
    styleText?: any;
    accessibilityLabel?: string;     // ✅ ajoute ceci
    accessibilityRole?: string;      // ✅ et ceci
}
// @ts-ignore
export default function RegularButton({ text, onPress, styleButton, styleText, accessibilityLabel, accessibilityRole }) {  // ✅ Ajout de `onPress`
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styleButton}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole={accessibilityRole}
        >
            <Text style={styleText}>{text}</Text>
        </TouchableOpacity>

    );
}

