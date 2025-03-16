import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

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
        <View style={styles.container}>
            <FlatList
                data={associations}
                keyExtractor={(item) => item.IdAsso.toString()}
                numColumns={2}
                renderItem={({ item }) => <AssociationCard association={item} />}
            />
        </View>
    );
}





const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f8f8", padding: 10 },
    card: {
        flex: 1,
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: { width: 80, height: 80, borderRadius: 10, marginBottom: 5 },
    name: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
});


