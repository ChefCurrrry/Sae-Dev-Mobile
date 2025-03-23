
import {Image, Text, View} from "react-native";
import {StyleSheet} from 'react-native';
import React from "react";
import BackGround from "@/components/BackGround";
import {router} from "expo-router";
import RegularButton from "@/components/RegularButton";
import FloatingMenuButton from "@/components/FloatingMenuButton";

export default function bienvenueDisplayScreen(){

    const handlePress = () => {
        router.push("/associations");
    }
    return (
        <>
            <View style={styles.header}>
                <Image source={require("../assets/images/qr-code.png")} style={styles.logo}/>
            </View>
            <View style={styles.container}/>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Bienvenue sur notre Application</Text>

                <Text style={styles.title2}>Faites un geste pour la France, chaque don compte !</Text>
                <Text style={styles.title2}>Choisissez une cause qui vous tiens à cœur et contribuez-y dès maintenant</Text>
                <Text style={styles.title2}>Découvrez et aidez les associations partenaires en quelques clics !</Text>

                <RegularButton styleButton={styles.loginButton} styleText={styles.loginText} text="Continuer" onPress={handlePress}></RegularButton>
            </View>


        </>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5F5",
        height: '70%',
    },
    header: {
        height: "45%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4968df",
    },
    logo: {
        width: 80,
        height: 80,
        tintColor: "white",
        marginTop: -120,
    },
    formContainer: {
        marginTop: -750,
        backgroundColor: "white",
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 20,
        elevation: 5,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    title2: {
        fontSize: 23,
        textAlign: "center",
        marginBottom: 15,
    },
    loginButton: {
        backgroundColor: "#4968df",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 15,
    },
    loginText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },

});