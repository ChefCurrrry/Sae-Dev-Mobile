import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Modal,
    FlatList,
    TextInput,
    TouchableOpacity,
    Alert, Button
} from "react-native";
import AppBackground from "@/components/AppBackground";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import RegularButton from "@/components/RegularButton";
import { useTheme } from "@/components/ThemeContext";
import AppText from "@/components/AppText"; // ✅ import du composant AppText

interface Don {
    IdUser: number;
    IDAsso: number;
    NomAsso: string;
    MontantDon: number;
}

export default function ProfilScreen() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [donList, setDonList] = useState<Don[]>([]);
    const [total, setTotal] = useState(0);
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const modalBackground = isDark ? "#1E1E1E" : "#fff";


    useEffect(() => {
        const fetchUserData = async () => {
            const storedNom = await SecureStore.getItemAsync("nom");
            const storedPrenom = await SecureStore.getItemAsync("prenom");

            if (storedNom) setNom(storedNom);
            if (storedPrenom) setPrenom(storedPrenom);
        };

        fetchUserData();
    }, []);

    const handleDisconnect = async () => {
        await SecureStore.deleteItemAsync("userId");
        await SecureStore.deleteItemAsync("nom");
        await SecureStore.deleteItemAsync("prenom");
        router.replace("/associations");
    };

    const fetchDonsPlanifiés = async () => {
        const userId = await SecureStore.getItemAsync("userId");
        if (!userId) return;

        try {
            const res = await fetch(`https://backenddevmobile-production.up.railway.app/api/dons/donsRecurrents?idUser=${userId}`);
            const data = await res.json();

            console.log("📦 Dons reçus :", data);
            setDonList(data.dons || []);
            setTotal(data.total || 0);
        } catch (error) {
            console.error("❌ Erreur récupération dons planifiés :", error);
        }
    };

    const handleUpdateDon = async (idUtilisateur: number, idAssociation: number, montant: number) => {
        try {
            await fetch("https://backenddevmobile-production.up.railway.app/api/dons/updateRecurrentDon", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idUtilisateur, idAssociation, montant }),
            });
            fetchDonsPlanifiés();
        } catch (error) {
            console.error("❌ Erreur mise à jour du don :", error);
        }
    };

    const handleDeleteDon = async (idUtilisateur: number, idAssociation: number) => {
        Alert.alert(
            "Confirmer la suppression",
            "Voulez-vous vraiment supprimer ce don récurrent ?",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await fetch("https://backenddevmobile-production.up.railway.app/api/dons/deleteRecurrentDon", {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ idUtilisateur, idAssociation }),
                            });
                            fetchDonsPlanifiés();
                        } catch (error) {
                            console.error("❌ Erreur suppression du don :", error);
                        }
                    },
                },
            ]
        );
    };

    return (
        <AppBackground title="Mon Profil">
            <View style={styles.container}>
                <AppText style={styles.text}>Bienvenue {prenom} {nom} 👋</AppText>

                <RegularButton text="Voir les Associations"
                               styleButton={styles.loginButton}
                               styleText={styles.loginText}
                               onPress={() => router.push("/associations")}
                               accessibilityLabel={"Boutton d'accès à la page des associations"}
                               accessibilityRole={"Button"}/>

                <RegularButton
                    text="Mes Dons Planifiés"
                    styleButton={styles.loginButton}
                    styleText={styles.loginText}
                    onPress={() => {
                        console.log(donList);
                        setShowModal(true);
                        fetchDonsPlanifiés();
                    }}
                    accessibilityLabel={"Boutton d'accès aux récapitulatifs de dons"}
                    accessibilityRole={"Button"}
                />


                <RegularButton text="DECONNEXION" styleButton={styles.loginButton} styleText={styles.loginText} onPress={handleDisconnect} accessibilityLabel={"Boutton de Déconnexion"} accessibilityRole={"Button"} />
            </View>

            {/* 🔽 Modal Dons Planifiés */}
            <Modal visible={showModal} animationType="fade" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: modalBackground }]}>

                    <AppText style={styles.title}>📋 Mes Dons</AppText>

                        <FlatList
                            data={donList}
                            keyExtractor={(item) => `${item.IdUser}-${item.IDAsso}`}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            renderItem={({ item }) => (
                                <View style={styles.item}>
                                    <AppText style={styles.name}>{item.NomAsso}</AppText>
                                    <TextInput
                                        style={[
                                            styles.input,
                                            {
                                                backgroundColor: isDark ? "#2A2A2A" : "#fff",
                                                color: isDark ? "#fff" : "#000",
                                                borderColor: isDark ? "#555" : "#ccc",
                                            },
                                        ]}
                                        keyboardType="numeric"
                                        value={String(item.MontantDon)}
                                        onChangeText={(val) => {
                                            const updatedList = donList.map((don) => {
                                                if (don.IdUser === item.IdUser && don.IDAsso === item.IDAsso) {
                                                    return { ...don, MontantDon: parseFloat(val) || 0 };
                                                }
                                                return don;
                                            });
                                            setDonList(updatedList);
                                        }}
                                    />

                                    <View style={styles.buttonRow}>
                                        <TouchableOpacity
                                            style={[styles.updateButton, { marginRight: 10 }]}
                                            onPress={() => {
                                                handleUpdateDon(item.IdUser, item.IDAsso, item.MontantDon);
                                                Alert.alert("✅ Succès", "Le don a été mis à jour !");
                                            }}
                                        >
                                            <AppText style={{ color: "white" }}>Mettre à jour</AppText>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={styles.deleteButton}
                                            onPress={() => {
                                                handleDeleteDon(item.IdUser, item.IDAsso);
                                                Alert.alert("✅ Succès", "Le don a été supprimé !");
                                            }}
                                        >
                                            <AppText style={{ color: "white" }}>Supprimer</AppText>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />

                        <AppText style={styles.total}>Total donné : {total} €</AppText>

                        <RegularButton
                            text="Fermer"
                            styleButton={styles.loginButton}
                            styleText={styles.loginText}
                            onPress={() => setShowModal(false)}
                            accessibilityRole={"Button"}
                            accessibilityLabel={"Boutton de fermeture des récapitulatifs de dons"}
                        />
                    </View>
                </View>
            </Modal>

            {/* 🔧 Modal Paramètres */}

        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    loginButton: {
        width: "100%",
        backgroundColor: "#4968df",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
    },
    loginText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    modalContent: {
        width: "90%",
        maxHeight: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    item: {
        marginBottom: 20,
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 6,
        marginVertical: 5,
    },
    updateButton: {
        backgroundColor: "#4968df",
        padding: 8,
        width: "49%",
        borderRadius: 6,
        alignItems: "center",
        marginTop: 5,
    },
    deleteButton: {
        backgroundColor: "#e74c3c",
        padding: 8,
        width: "49%",
        borderRadius: 6,
        alignItems: "center",
        marginTop: 5,
        marginLeft: -5,
    },
    total: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 20,
        textAlign: "center",
    },
    buttonRow: {
        flexDirection: "row",
        marginTop: 5,
    },

});
