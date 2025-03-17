import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TextInput } from "react-native";
import AppBackground from "@/components/AppBackground";

interface Association {
    IdAsso: number;
    NomAsso: string;
    LogoName: string;
}

export default function AssociationDisplayScreen() {
    const [serverIP, setServerIP] = useState<string | null>(null);
    const [associations, setAssociations] = useState<Association[]>([]);
    const [filteredAssociations, setFilteredAssociations] = useState<Association[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

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
    };

    const getImageSource = (logoName: string) => {
        // @ts-ignore
        return images[logoName] || require("@/assets/images/default.png");
    };

    // 📌 Récupérer dynamiquement l'IP du serveur
    useEffect(() => {
        fetch("http://192.168.1.38:3000/api/ip") // 🔹 Vérifie l'IP récupérée
            .then((res) => res.json())
            .then((data) => {
                console.log("✅ IP récupérée :", data.ip);
                const apiUrl = `http://${data.ip}:3000/api/associations`;

                fetch(apiUrl) // 🔹 Récupère les associations
                    .then((res) => res.json())
                    .then((assos) => {
                        console.log("✅ Associations récupérées :", assos);
                        setAssociations(assos);
                        setFilteredAssociations(assos);
                    })
                    .catch((err) => console.error("❌ Erreur récupération associations", err));
            })
            .catch((err) => console.error("❌ Erreur récupération IP", err));
    }, []);


    // 📌 Fonction pour filtrer les associations
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === "") {
            setFilteredAssociations(associations);
        } else {
            const filtered = associations.filter((asso) =>
                asso.NomAsso.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredAssociations(filtered);
        }
    };

    const AssociationCard = ({ association }: { association: Association }) => {
        return (
            <View style={styles.wrapCard}>
                <View style={styles.card}>
                    <Image source={getImageSource(association.LogoName)} style={styles.image} />
                </View>
                <Text style={styles.name}>{association.NomAsso}</Text>
            </View>
        );
    };

    return (
        <AppBackground title="Choisissez une association">
            {/* Barre de recherche */}
            <TextInput
                style={styles.searchInput}
                placeholder="Rechercher une association..."
                placeholderTextColor="#aaa"
                value={searchQuery}
                onChangeText={handleSearch}
            />

            {/* Liste filtrée des associations */}
            <FlatList
                data={filteredAssociations}
                keyExtractor={(item) => item.IdAsso.toString()}
                numColumns={2}
                renderItem={({ item }) => <AssociationCard association={item} />}
            />
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    searchInput: {
        backgroundColor: "#F5F5F5",
        padding: 10,
        borderRadius: 20,
        fontSize: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        width: "100%",
        alignSelf: "center",
    },
    wrapCard: {
        flex: 1,
    },
    card: {
        flex: 1,
        margin: 10,
        backgroundColor: "#eceaea",
        borderColor: "#4968df",
        borderWidth: 3,
        borderRadius: 30,
        alignItems: "center",
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: "100%",
        height: 90,
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: "contain",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});
