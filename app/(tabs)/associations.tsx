import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TextInput } from "react-native";
import AppBackground from "@/components/AppBackground";
import Modal from "react-native-modal";

// 📌 API_URL dynamique (Railway en prod, Localhost en dev)
const API_URL = "https://backenddevmobile-production.up.railway.app/api/associations/getAsso";

interface Association {
    IdAsso: number;
    NomAsso: string;
    LogoName: string;
}

interface Tag {
    id: number;
    name: string;
}

export default function AssociationDisplayScreen() {
    const [associations, setAssociations] = useState<Association[]>([]);
    const [filteredAssociations, setFilteredAssociations] = useState<Association[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [tags1, setTags1] = useState<Tag[]>([]);
    const [tags2, setTags2] = useState<Tag[]>([]);
    const [tags3, setTags3] = useState<Tag[]>([]);
    const [isFilterVisible, setFilterVisible] = useState(false);

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
        "Alliance_Maladies_Rares.png": require("@/assets/images/asso/Alliance_Maladies_Rares.png"),
        "AMADYS.png": require("@/assets/images/asso/AMADYS.png"),
        "AMALYSTE.png": require("@/assets/images/asso/AMALYSTE.png"),
    };

    const [selectedTags, setSelectedTags] = useState<(number | null)[]>([null, null, null]);

    const toggleTag = (groupIndex: number, tagId: number) => {
        setSelectedTags(prev => {
            const updated = [...prev];
            updated[groupIndex] = updated[groupIndex] === tagId ? null : tagId;
            return updated;
        });
    };

    const handleTagFilter = () => {
        fetch("https://backenddevmobile-production.up.railway.app/api/associations/filtrage-associations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                tag1: selectedTags[0] || null,
                tag2: selectedTags[1] || null,
                tag3: selectedTags[2] || null,
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log("✅ Données filtrées :", data);
                setFilteredAssociations(data);
            })
            .catch(err => console.error("Erreur filtrage tags", err));
    };


    const getImageSource = (logoName: string) => {
        // @ts-ignore
        return images[logoName] || require("@/assets/images/default.png");
    };

    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                setAssociations(data);
                setFilteredAssociations(data);
            })
            .catch((error) => console.error("❌ Erreur lors du chargement :", error));

        const fetchTags = async () => {
            try {
                const res1 = await fetch("https://backenddevmobile-production.up.railway.app/api/tags/tags1");
                const res2 = await fetch("https://backenddevmobile-production.up.railway.app/api/tags/tags2");
                const res3 = await fetch("https://backenddevmobile-production.up.railway.app/api/tags/tags3");

                const data1Raw = await res1.json();
                const data1 = data1Raw.map((tag: any) => ({
                    id: tag.IdTag1,
                    name: tag.NomTag1,
                }));

                const data2Raw = await res2.json();
                const data2 = data2Raw.map((tag: any) => ({
                    id: tag.IdTag2,
                    name: tag.NomTag2,
                }));

                const data3Raw = await res3.json();
                const data3 = data3Raw.map((tag: any) => ({
                    id: tag.IdTag3,
                    name: tag.NomTag3,
                }));
                setTags1(data1);
                setTags2(data2);
                setTags3(data3);

                console.log(data1);
                console.log(data2);
                console.log(data3);
            } catch (error) {
                console.error("❌ Erreur chargement des tags :", error);
            }
        };

        fetchTags();
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (!Array.isArray(associations)) return;

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
            <TextInput
                style={styles.searchInput}
                placeholder="Rechercher une association..."
                placeholderTextColor="#aaa"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <Text style={styles.filterButton} onPress={() => setFilterVisible(true)}>
                🎯 Filtrer par tags
            </Text>

            <FlatList
                data={filteredAssociations}
                keyExtractor={(item) => item.IdAsso.toString()}
                numColumns={2}
                renderItem={({ item }) => <AssociationCard association={item} />}
            />

            <Modal
                isVisible={isFilterVisible}
                onBackdropPress={() => setFilterVisible(false)}
                style={styles.bottomModal}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Filtrer les associations</Text>

                    <Text style={styles.tagTitle}>Catégorie principale</Text>
                    <View style={styles.tagContainer}>
                        {tags1.map(tag => (
                            <Text
                                key={`tag1-${tag.id}`}
                                onPress={() => toggleTag(0, tag.id)}
                                style={[
                                    styles.tag,
                                    selectedTags[0] === tag.id && styles.selectedTag
                                ]}
                            >
                                {tag.name}
                            </Text>
                        ))}
                    </View>

                    <Text style={styles.tagTitle}>Objectif</Text>
                    <View style={styles.tagContainer}>
                        {tags2.map(tag => (
                            <Text
                                key={`tag2-${tag.id}`}
                                onPress={() => toggleTag(1, tag.id)}
                                style={[
                                    styles.tag,
                                    selectedTags[1] === tag.id && styles.selectedTag
                                ]}
                            >
                                {tag.name}
                            </Text>
                        ))}
                    </View>

                    <Text style={styles.tagTitle}>Taille</Text>
                    <View style={styles.tagContainer}>
                        {tags3.map(tag => (
                            <Text
                                key={`tag3-${tag.id}`}
                                onPress={() => toggleTag(2, tag.id)}
                                style={[
                                    styles.tag,
                                    selectedTags[2] === tag.id && styles.selectedTag
                                ]}
                            >
                                {tag.name}
                            </Text>
                        ))}
                    </View>

                    <Text
                        style={styles.applyButton}
                        onPress={() => {
                            const noTagSelected = selectedTags.every(t => t === null);
                            if (noTagSelected) {
                                setFilteredAssociations(associations); // ✅ remets tout
                            } else {
                                handleTagFilter(); // 🔍 sinon, applique le filtre
                            }
                            setFilterVisible(false);
                        }}
                    >
                        ✅ Appliquer les filtres
                    </Text>
                </View>
            </Modal>
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
    tagContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10,
        gap: 8,
    },
    tag: {
        backgroundColor: "#ddd",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        fontSize: 14,
    },
    selectedTag: {
        backgroundColor: "#4968df",
        color: "#fff",
    },
    tagTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
        marginTop: 10,
    },
    filterButton: {
        backgroundColor: "#4968df",
        color: "#fff",
        padding: 10,
        borderRadius: 20,
        textAlign: "center",
        marginVertical: 10,
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: "85%",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    applyButton: {
        backgroundColor: "#4968df",
        color: "#fff",
        padding: 12,
        borderRadius: 20,
        textAlign: "center",
        marginTop: 10,
        fontWeight: "bold",
    },
});
