import {Image, StyleSheet, View} from "react-native";
import React from "react";


// @ts-ignore
export default function BackGround({children}){
    return (
        <>
            <View style={styles.header}>
                <Image source={require("../assets/images/qr-code.png")} style={styles.logo}/>
            </View>
            <View style={styles.container}/>
            <View style={styles.formContainer}>
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
})