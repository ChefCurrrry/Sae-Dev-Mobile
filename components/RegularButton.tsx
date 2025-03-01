import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

// @ts-ignore
export default function RegularButton({ text, onPress, styleButton, styleText }) {  // ✅ Ajout de `onPress`
    return (
        <TouchableOpacity style={styleButton} onPress={onPress}>  {/* ✅ Utilisation */}
            <Text style={styleText}>{text}</Text>
        </TouchableOpacity>
    );
}

