import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import AppBackground from "@/components/AppBackground";

const API_URL = "http://192.168.1.38:3000/api/associations"; // Remplace par ton IP locale

interface Association {
    IdAsso: number;
    NomAsso: string;
    LogoName: string;
}

export default function AssociationDisplayScreen() {
    const [associations, setAssociations] = useState<Association[]>([]);

    // Dictionnaire des images locales
    const images = {
         "AAAVAM.png": require("@/assets/images/asso/AAAVAM.png"),
         "ActionTraitement.png": require("@/assets/images/asso/ActionTraitement.png"),
         "AddictAlcool.png": require("@/assets/images/asso/AddictAlcool.png"),
         // Ajoute ici les 93 associations avec leur image correspondante
     };

    const getImageSource = (logoName: string) => {
        return images[logoName] || require("@/assets/images/default.png");
    };

    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => setAssociations(data))
            .catch((error) => console.error("Erreur lors du chargement :", error));
    }, []);

    const AssociationCard = ({ association }: { association: Association }) => {
        return (
            <View style={styles.card}>
                <Image source={getImageSource(association.LogoName)} style={styles.image} />
                <Text style={styles.name}>{association.NomAsso}</Text>
            </View>
        );
    };

    return (
        <AppBackground>

            <FlatList
                data={associations}
                keyExtractor={(item) => item.IdAsso.toString()}
                numColumns={2}
                renderItem={({ item }) => <AssociationCard association={item} />}
            />

        </AppBackground>
    );
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10
    },
    card: {
        flex: 1,
        margin: 10,
        backgroundColor: "#fff",
        borderColor: '#4968df', // ✅ Bordure violette
        borderWidth: 2, // ✅ Nécessaire pour que la couleur de la bordure s'affiche
        borderRadius: 30,
        alignItems: "center",
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: "100%", // L'image prend toute la largeur du conteneur
        height: 100, // Ajuste la hauteur selon ton design
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: "contain", // ✅ Ajuste l'image sans la couper
    },

    name: { fontSize: 13, fontWeight: "bold", textAlign: "center" },
});


