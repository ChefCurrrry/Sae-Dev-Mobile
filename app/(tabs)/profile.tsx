import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    FlatList,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";
import AppBackground from "@/components/AppBackground";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import RegularButton from "@/components/RegularButton";

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
                <Text style={styles.text}>Bienvenue {prenom} {nom} 👋</Text>

                <RegularButton text="Voir les Associations" styleButton={styles.loginButton} styleText={styles.loginText} onPress={() => router.push("/associations")} />

                <RegularButton
                    text="Mes Dons Planifiés"
                    styleButton={styles.loginButton}
                    styleText={styles.loginText}
                    onPress={() => {
                        console.log(donList);
                        setShowModal(true);
                        fetchDonsPlanifiés();
                    }}
                />

                <RegularButton text="DECONNEXION" styleButton={styles.loginButton} styleText={styles.loginText} onPress={handleDisconnect} />
            </View>

            {/* 🔽 Modal affichant les dons planifiés */}
            <Modal visible={showModal} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>📋 Mes Dons</Text>

                        <FlatList
                            data={donList}
                            keyExtractor={(item) => `${item.IdUser}-${item.IDAsso}`}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            renderItem={({ item }) => (
                                <View style={styles.item}>
                                    <Text style={styles.name}>{item.NomAsso}</Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"
                                        value={String(item.MontantDon)}
                                        onChangeText={(val) =>
                                            setDonList((prev) =>
                                                prev.map((don) =>
                                                    don.IdUser === item.IdUser && don.IDAsso === item.IDAsso
                                                        ? { ...don, MontantDon: Number(val) }
                                                        : don
                                                )
                                            )
                                        }
                                    />
                                    <TouchableOpacity
                                        style={styles.updateButton}
                                        onPress={() => handleUpdateDon(item.IdUser, item.IDAsso, item.MontantDon)}
                                    >
                                        <Text style={{ color: "white" }}>Mettre à jour</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => handleDeleteDon(item.IdUser, item.IDAsso)}
                                    >
                                        <Text style={{ color: "white" }}>Supprimer</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />

                        <Text style={styles.total}>Total donné : {total} €</Text>

                        <RegularButton
                            text="Fermer"
                            styleButton={styles.loginButton}
                            styleText={styles.loginText}
                            onPress={() => setShowModal(false)}
                        />
                    </View>
                </View>
            </Modal>
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
        color: "#333",
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
        borderRadius: 6,
        alignItems: "center",
        marginTop: 5,
    },
    deleteButton: {
        backgroundColor: "#e74c3c",
        padding: 8,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 5,
    },
    total: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 20,
        textAlign: "center",
    },
});
