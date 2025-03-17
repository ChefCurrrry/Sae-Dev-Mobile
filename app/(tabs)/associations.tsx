import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import AppBackground from "@/components/AppBackground";

//const API_URL = "http://192.168.1.38:3000/api/associations"; // IP Chez Kiran
const API_URL = "http://172.20.175.204:3000/api/associations"; // IP Ilumens

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
         "ADEPA.png": require("@/assets/images/asso/ADEPA.png"),
         "ADMD.png": require("@/assets/images/asso/ADMD.png"),
         "Advocacy.png": require("@/assets/images/asso/Advocacy.png"),
         "AFA.png": require("@/assets/images/asso/AFA.png"),
        "AFDE.png": require("@/assets/images/asso/AFDE.png"),
        "AFDOC.png": require("@/assets/images/asso/AFDOC.png"),
        "AFGS.png": require("@/assets/images/asso/AFGS.png"),
        "AFH.png": require("@/assets/images/asso/AFH.png"),
        "AFM_Telethon.png": require("@/assets/images/asso/AFM_Telethon.png"),
        "AFPRIC.png": require("@/assets/images/asso/AFPRIC.png"),
        "AFRH.png": require("@/assets/images/asso/AFRH.png"),
        "AFS.png": require("@/assets/images/asso/AFS.png"),
        "AFSA.png": require("@/assets/images/asso/AFSA.png"),
        "AFSEP.png": require("@/assets/images/asso/AFSEP.png"),
        "AFVD.png": require("@/assets/images/asso/AFVD.png"),
        "AFVS.png": require("@/assets/images/asso/AFVS.png"),
        "AIDES.png": require("@/assets/images/asso/AIDES.png"),
        "AINP.png": require("@/assets/images/asso/AINP.png"),
        "Alcool_Ecoute.png": require("@/assets/images/asso/Alcool_Ecoute.png"),



         // Ajoute ici les 93 associations avec leur image correspondante
     };

    const getImageSource = (logoName: string) => {
        // @ts-ignore
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
        <AppBackground title="Choisissez une association">

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
        backgroundColor: "#eceaea",
        borderColor: '#4968df', // ✅ Bordure violette
        borderWidth: 3, // ✅ Nécessaire pour que la couleur de la bordure s'affiche
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
        height: 90, // Ajuste la hauteur selon ton design
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: "contain", // ✅ Ajuste l'image sans la couper
    },

    name: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
});


