import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from "react-native";
import AppBackground from "@/components/AppBackground";
import Modal from "react-native-modal";
import { useTagSelection } from "@/components/TagSelectionContext";
import { useSelectedAsso } from "@/components/SelectedAssoContext";
import { router } from "expo-router";
import AppText from "@/components/AppText";
import { useTheme } from "@/components/ThemeContext";

interface Association {
    IdAsso: number;
    NomAsso: string;
    LogoName: string;
}

interface Tag {
    id: number;
    name: string;
}

const API_URL = "https://backenddevmobile-production.up.railway.app/api/associations/getAsso";

export default function AssociationDisplayScreen() {
    const [associations, setAssociations] = useState<Association[]>([]);
    const [filteredAssociations, setFilteredAssociations] = useState<Association[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [tags1, setTags1] = useState<Tag[]>([]);
    const [tags2, setTags2] = useState<Tag[]>([]);
    const [tags3, setTags3] = useState<Tag[]>([]);
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [isFilterVisible2, setFilterVisible2] = useState(false);
    const { tag1, tag2, tag3 } = useTagSelection();
    const { setId } = useSelectedAsso();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const modalBg = isDark ? "#1E1E1E" : "#fff";
    const tagBg = isDark ? "#333" : "#ddd";
    const tagColor = isDark ? "#fff" : "#000";

    const [selectedTags, setSelectedTags] = useState<(number | null)[]>([tag1, tag2, tag3]);

    const images: Record<string, any> = {
        "AAAVAM.png": require("@/assets/images/asso/AAAVAM.png"),
        "ActionTraitement.png": require("@/assets/images/asso/ActionTraitement.png"),
        "AddictAlcool.png": require("@/assets/images/asso/AddictAlcool.png"),
        "ADEPA.png": require("@/assets/images/asso/ADEPA.png"),
        "ADMD.png": require("@/assets/images/asso/ADMD.png"),
        "Advocacy.png": require("@/assets/images/asso/Advocacy.png"),
        "AFA.png": require("@/assets/images/asso/AFA.png"),
        "AFC.png": require("@/assets/images/asso/AFC.png"),
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
        "AMR.png": require("@/assets/images/asso/AMR.png"),
        "AMADYS.png": require("@/assets/images/asso/AMADYS.png"),
        "AMALYSTE.png": require("@/assets/images/asso/AMALYSTE.png"),
        "AMI.png": require("@/assets/images/asso/AMI.png"),
        "CB.png": require("@/assets/images/asso/CB.png"),
        "CLCV.png": require("@/assets/images/asso/CLCV.png"),
        "CNAFAL.png": require("@/assets/images/asso/CNAFAL.png"),
        "CNAO.png": require("@/assets/images/asso/CNAO.png"),
        "CSF.png": require("@/assets/images/asso/CSF.png"),
        "DES.png": require("@/assets/images/asso/DES.png"),
        "E3M.png": require("@/assets/images/asso/E3M.png"),
        "EFAPPEEpilepsies.png": require("@/assets/images/asso/EFAPPEEpilepsies.png"),
        "EndoFrance.png": require("@/assets/images/asso/EndoFrance.png"),
        "ENDOmind.png": require("@/assets/images/asso/ENDOmind.png"),
        "Entraid.png": require("@/assets/images/asso/Entraid.png"),
        "Epilepsie.png": require("@/assets/images/asso/Epilepsie.png"),
        "FamilleR.png": require("@/assets/images/asso/FamilleR.png"),
        "FamillesFrance.png": require("@/assets/images/asso/FamillesFrance.png"),
        "FFCM.png": require("@/assets/images/asso/FFCM.png"),
        "FFD.png": require("@/assets/images/asso/FFD.png"),
        "FFDSB.png": require("@/assets/images/asso/FFDSB.png"),
        "FFSA.png": require("@/assets/images/asso/FFSA.png"),
        "FGCP.png": require("@/assets/images/asso/FGCP.png"),
        "FNAR.png": require("@/assets/images/asso/FNAR.png"),
        "FNAS.png": require("@/assets/images/asso/FNAS.png"),
        "FNAPSY.png": require("@/assets/images/asso/FNAPSY.png"),
        "FNATH.png": require("@/assets/images/asso/FNATH.png"),
        "FranceA.png": require("@/assets/images/asso/FranceA.png"),
        "FranceD.png": require("@/assets/images/asso/FranceD.png"),
        "FranceL.png": require("@/assets/images/asso/FranceL.png"),
        "FranceP.png": require("@/assets/images/asso/FranceP.png"),
        "FranceR.png": require("@/assets/images/asso/FranceR.png"),
        "FSOS.png": require("@/assets/images/asso/FSOS.png"),
        "HTDAH.png": require("@/assets/images/asso/HTDAH.png"),
        "JALMALV.png": require("@/assets/images/asso/JALMALV.png"),
        "LCC.png": require("@/assets/images/asso/LCC.png"),
        "LIEN.png": require("@/assets/images/asso/LIEN.png"),
        "Marfans.png": require("@/assets/images/asso/Marfans.png"),
        "PF.png": require("@/assets/images/asso/PF.png"),
        "PP.png": require("@/assets/images/asso/PP.png"),
        "PRIARTEM.png": require("@/assets/images/asso/PRIARTEM.png"),
        "Renaloo.png": require("@/assets/images/asso/Renaloo.png"),
        "RES.png": require("@/assets/images/asso/RES.png"),
        "Schizo.png": require("@/assets/images/asso/Schizo.png"),
        "SOSHepatite.png": require("@/assets/images/asso/SOSHepatite.png"),
        "Transhepate.png": require("@/assets/images/asso/Transhepate.png"),
        "UAFLMV.png": require("@/assets/images/asso/UAFLMV.png"),
        "UFAL.png": require("@/assets/images/asso/UFAL.png"),
        "UFC.png": require("@/assets/images/asso/UFC.png"),
        "UNAF.png": require("@/assets/images/asso/UNAF.png"),
        "UNAFAM.png": require("@/assets/images/asso/UNAFAM.png"),
        "UNAFTC.png": require("@/assets/images/asso/UNAFTC.png"),
        "UNAPECLE.png": require("@/assets/images/asso/UNAPECLE.png"),
        "UNAPEI.png": require("@/assets/images/asso/UNAPEI.png"),
        "VCA.png": require("@/assets/images/asso/VCA.png"),
        "VM.png": require("@/assets/images/asso/VM.png"),
        "VMEH.png": require("@/assets/images/asso/VMEH.png"),
        "default": require("@/assets/images/default.png"),
    };

    const getImageSource = (logoName: string) => {
        return images[logoName] || require("@/assets/images/default.png");
    };

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
                tag1: selectedTags[0],
                tag2: selectedTags[1],
                tag3: selectedTags[2],
            }),
        })
            .then(res => res.json())
            .then(data => setFilteredAssociations(data))
            .catch(err => console.error("Erreur filtrage tags", err));
    };

    const fetchTags = async () => {
        try {
            const res1 = await fetch("https://backenddevmobile-production.up.railway.app/api/tags/tags1");
            const res2 = await fetch("https://backenddevmobile-production.up.railway.app/api/tags/tags2");
            const res3 = await fetch("https://backenddevmobile-production.up.railway.app/api/tags/tags3");

            const data1 = await res1.json();
            const data2 = await res2.json();
            const data3 = await res3.json();

            setTags1(data1.map((t: any) => ({ id: t.IdTag1, name: t.NomTag1 })));
            setTags2(data2.map((t: any) => ({ id: t.IdTag2, name: t.NomTag2 })));
            setTags3(data3.map((t: any) => ({ id: t.IdTag3, name: t.NomTag3 })));
        } catch (e) {
            console.error("❌ Erreur fetch tags :", e);
        }
    };

    const fetchAllAssociations = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setAssociations(data);
            setFilteredAssociations(data);
        } catch (err) {
            console.error("❌ Erreur fetch associations :", err);
        }
    };

    useEffect(() => {
        fetchTags();

        // 🔄 Applique directement les tags sélectionnés depuis le contexte
        const shouldFilter = tag1 !== null || tag2 !== null || tag3 !== null;
        if (shouldFilter) {
            setSelectedTags([tag1, tag2, tag3]);
            handleTagFilter();
        } else {
            fetchAllAssociations();
        }
    }, []);

    const resetTags = () => {
        fetchAllAssociations();
        setSelectedTags([null, null, null]);
    };

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

    const AssociationCard = ({ association }: { association: Association }) => (
        <TouchableOpacity
            style={styles.wrapCard}
            onPress={() => {
                setId(association.IdAsso);
                router.push(`/assoDetail?id=${association.IdAsso}`);
            }}
            accessibilityRole="button"
            accessibilityLabel={`Voir les détails de l'association ${association.NomAsso}`}
        >
            <View style={styles.card}>
                <Image
                    source={getImageSource(association.LogoName)}
                    style={styles.image}
                    accessible={true}
                    accessibilityLabel={`Logo de ${association.NomAsso}`}
                />
            </View>
            <AppText
                style={styles.name}
                accessible={true}
                accessibilityLabel={`Nom de l'association : ${association.NomAsso}`}
            >
                {association.NomAsso}
            </AppText>
        </TouchableOpacity>
    );

    return (
        <AppBackground title="Choisissez une association">
            <TextInput
                style={[
                    styles.searchInput,
                    {
                        backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
                        color: isDark ? "#fff" : "#000",
                    },
                ]}
                placeholder="Rechercher une association..."
                placeholderTextColor="#aaa"
                value={searchQuery}
                onChangeText={handleSearch}
                accessibilityLabel="Champ de recherche pour les associations"
                accessible={true}
            />

            <AppText
                style={styles.filterButton}
                onPress={() => setFilterVisible(true)}
                accessibilityRole="button"
                accessibilityLabel="Filtrer les associations par tags"
            >
                🎯 Filtrer par tags
            </AppText>

            <AppText
                style={styles.filterButton}
                onPress={() => setFilterVisible2(true)}
                accessibilityRole="button"
                accessibilityLabel="Vous êtes perdu ? Cliquez ici pour obtenir de l'aide"
            >
                Vous êtes perdu ? Cliquez ici !
            </AppText>

            <FlatList
                data={filteredAssociations}
                keyExtractor={(item) => item.IdAsso.toString()}
                numColumns={2}
                renderItem={({ item }) => <AssociationCard association={item} />}
                accessible={true}
                accessibilityLabel="Liste des associations filtrées"
            />

            {/* Modal 1 - Filtres */}
            <Modal
                isVisible={isFilterVisible}
                onBackdropPress={() => setFilterVisible(false)}
                style={styles.bottomModal}
            >
                <View style={[styles.modalContent, { backgroundColor: modalBg }]}>
                    <AppText style={styles.modalTitle}>Filtrer les associations</AppText>

                    {[tags1, tags2, tags3].map((tagGroup, index) => (
                        <View key={index}>
                            <AppText style={styles.tagTitle}>Catégorie {index + 1}</AppText>
                            <View style={styles.tagContainer}>
                                {tagGroup.map((tag) => (
                                    <TouchableOpacity
                                        key={tag.id}
                                        onPress={() => toggleTag(index, tag.id)}
                                        accessibilityRole="button"
                                        accessibilityLabel={`Tag ${tag.name}`}
                                    >
                                        <AppText
                                            style={[
                                                styles.tag,
                                                {
                                                    backgroundColor:
                                                        selectedTags[index] === tag.id ? "#4968df" : tagBg,
                                                    color:
                                                        selectedTags[index] === tag.id ? "#fff" : tagColor,
                                                },
                                            ]}
                                        >
                                            {tag.name}
                                        </AppText>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}

                    <AppText
                        style={styles.applyButton}
                        onPress={() => {
                            handleTagFilter();
                            setFilterVisible(false);
                        }}
                        accessibilityRole="button"
                        accessibilityLabel="Appliquer les filtres"
                    >
                        ✅ Appliquer les filtres
                    </AppText>

                    <AppText
                        style={styles.applyButton}
                        onPress={() => {
                            resetTags();
                            setFilterVisible(false);
                        }}
                        accessibilityRole="button"
                        accessibilityLabel="Réinitialiser les filtres"
                    >
                        🔄 Voir toutes les associations
                    </AppText>
                </View>
            </Modal>

            {/* Modal 2 - Aide */}
            <Modal
                isVisible={isFilterVisible2}
                onBackdropPress={() => setFilterVisible2(false)}
                style={styles.bottomModal}
            >
                <View style={[styles.modalContent, { backgroundColor: modalBg }]}>
                    <AppText style={styles.modalTitle}>Vous êtes perdu ?</AppText>
                    <AppText style={styles.modalTitle}>Décrivez ce qui vous touche :</AppText>
                    <AppText
                        style={styles.applyButton}
                        onPress={() => {
                            setFilterVisible2(false);
                            router.push("/trouverAsso");
                        }}
                        accessibilityRole="button"
                        accessibilityLabel="Démarrer le parcours guidé"
                    >
                        🔍 Trouver une association
                    </AppText>
                </View>
            </Modal>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    searchInput: {
        padding: 10,
        borderRadius: 20,
        fontSize: 16,
        marginBottom: 5,
        marginTop: -5,
        borderWidth: 3,
        borderColor: "#4968df",
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
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        fontSize: 14,
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
