import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Modal,
    FlatList,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import AppBackground from "@/components/AppBackground";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import RegularButton from "@/components/RegularButton";
import { useTheme } from "@/components/ThemeContext";
import AppText from "@/components/AppText";
import button from "react-native-paper/src/components/Button/Button";
import {Picker} from "@react-native-picker/picker";

interface Don {
    IdUser: number;
    IDAsso: number;
    NomAsso: string;
    MontantDon: number;
}

interface User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    role: "admin" | "user";
}

export default function AdminProfilScreen() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [showDonModal, setShowDonModal] = useState(false);
    const [showUsersModal, setShowUsersModal] = useState(false);
    const [donList, setDonList] = useState<Don[]>([]);
    const [total, setTotal] = useState(0);
    const [users, setUsers] = useState<User[]>([]);
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
            setDonList(data.dons || []);
            setTotal(data.total || 0);
        } catch (error) {
            console.error("❌ Erreur dons planifiés :", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch("https://backenddevmobile-production.up.railway.app/api/users/getUser");
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error("❌ Erreur récupération utilisateurs :", error);
        }
    };

    const handleUpdateRole = async (userId: number, newRole: string) => {
        try {
            await fetch(`https://backenddevmobile-production.up.railway.app/api/users/updateRole`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: userId, role: newRole }),
            });
            fetchUsers();
        } catch (error) {
            console.error("❌ Erreur maj rôle :", error);
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
                            Alert.alert("✅ Succès", "Le don a été supprimé !");
                        } catch (error) {
                            console.error("❌ Erreur suppression du don :", error);
                        }
                    },
                },
            ]
        );
    };

    const handleDeleteUser = async (id: number) => {
        Alert.alert(
            "Confirmer suppression",
            "Supprimer cet utilisateur ?",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await fetch(`https://backenddevmobile-production.up.railway.app/api/users/delete`, {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ id }),
                            });
                            fetchUsers();
                        } catch (error) {
                            console.error("❌ Erreur suppression utilisateur :", error);
                        }
                    },
                },
            ]
        );
    };

    return (
        <AppBackground title="Profil Admin">
            <View style={styles.container}>
                <AppText style={styles.text}>Bienvenue {prenom} {nom} 👑</AppText>

                <RegularButton text="Voir les Associations"
                               onPress={() => router.push("/associations")}
                               styleButton={styles.loginButton}
                               styleText={styles.loginText}
                               accessibilityLabel={"Bouton d'accès à la page d'affichage des associations"}
                               accessibilityRole={"button"}
                />

                <RegularButton text="Mes Dons Planifiés"
                               onPress={() => {
                                   setShowDonModal(true);
                                   fetchDonsPlanifiés();
                               }}
                               styleButton={styles.loginButton}
                               styleText={styles.loginText}
                               accessibilityLabel={"Bouton d'accès au récapitulatifs de mes dons"}
                               accessibilityRole={"button"}
                />

                <RegularButton text="Gérer les Utilisateurs"
                               onPress={() => {
                                   setShowUsersModal(true);
                                   fetchUsers();
                               }}
                               styleButton={styles.loginButton}
                               styleText={styles.loginText}
                               accessibilityLabel={"Bouton d'accès au gestionnaire des utilisateurs"}
                               accessibilityRole={"button"}
                />

                <RegularButton text="Graphiques de Dons"
                               onPress={() => router.push("/profileAdmin")}
                               styleButton={styles.loginButton}
                               styleText={styles.loginText}
                               accessibilityLabel={"Bouton d'accès aux statistiques de l'application"}
                               accessibilityRole={"button"}
                />

                <RegularButton text="Déconnexion"
                               onPress={handleDisconnect}
                               styleButton={styles.loginButton}
                               styleText={styles.loginText}
                               accessibilityLabel={"Bouton de déconnexion"}
                               accessibilityRole={"button"}
                />
            </View>

            {/* 🔽 Modal Dons Planifiés */}
            <Modal visible={showDonModal} animationType="fade" transparent={true}>
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
                            onPress={() => setShowDonModal(false)}
                            accessibilityRole={"Button"}
                            accessibilityLabel={"Boutton de fermeture des récapitulatifs de dons"}
                        />
                    </View>
                </View>
            </Modal>

            {/* 🔽 Modal Utilisateurs */}
            <Modal visible={showUsersModal} transparent={true} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: modalBackground }]}>
                        <AppText style={styles.title}>👥 Tous les utilisateurs</AppText>
                        <FlatList
                            data={users}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.item}>
                                    <AppText style={styles.name}>{item.prenom} {item.nom}</AppText>
                                    <AppText style={styles.email}>{item.email}</AppText>

                                    <Picker
                                        selectedValue={item.role}
                                        style={{ color: isDark ? "#fff" : "#000" }}
                                        onValueChange={(value) => handleUpdateRole(item.id, value)}
                                    >
                                        <Picker.Item label="user" value="user" />
                                        <Picker.Item label="admin" value="admin" />
                                    </Picker>

                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => handleDeleteUser(item.id)}
                                    >
                                        <AppText style={{ color: "#fff" }}>Supprimer</AppText>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                        <RegularButton text="Fermer" onPress={() => setShowUsersModal(false)} styleButton={styles.loginButton} styleText={styles.loginText} accessibilityRole={"button"} accessibilityLabel={"Fermer la page de recapitulatif des utilisateur"}/>
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
        maxHeight: "85%",
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
        borderRadius: 6,
        padding: 8,
        marginVertical: 5,
    },
    updateButton: {
        backgroundColor: "#4968df",
        padding: 8,
        flex: 1,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 5,
    },

    deleteButton: {
        backgroundColor: "#e74c3c",
        padding: 8,
        flex: 1,
        borderRadius: 6,
        alignItems: "center",
        marginTop: -70,
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    total: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 20,
        textAlign: "center",
    },
    email: {
        fontSize: 14,
        marginBottom: -72, // 👈 réduit l’espace
    },


});
