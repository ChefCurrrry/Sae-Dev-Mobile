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
            .then(data => setFilteredAssociations(data))
            .catch(err => console.error("Erreur filtrage tags", err));
    };

    const getImageSource = (logoName: string) => {
        return images[logoName] || require("@/assets/images/default.png");
    };

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res1 = await fetch("https://backenddevmobile-production.up.railway.app/api/tags/tags1");
                const res2 = await fetch("https://backenddevmobile-production.up.railway.app/api/tags/tags2");
                const res3 = await fetch("https://backenddevmobile-production.up.railway.app/api/tags/tags3");

                const data1Raw = await res1.json();
                const data2Raw = await res2.json();
                const data3Raw = await res3.json();

                const data1: Tag[] = data1Raw.map((tag: any) => ({ id: tag.IdTag1, name: tag.NomTag1 }));
                const data2: Tag[] = data2Raw.map((tag: any) => ({ id: tag.IdTag2, name: tag.NomTag2 }));
                const data3: Tag[] = data3Raw.map((tag: any) => ({ id: tag.IdTag3, name: tag.NomTag3 }));

                setTags1(data1);
                setTags2(data2);
                setTags3(data3);
            } catch (error) {
                console.error("❌ Erreur chargement des tags :", error);
            }
        };

        fetchTags();

        if (tag1 === null && tag2 === null && tag3 === null) {
            fetch(API_URL)
                .then((res) => res.json())
                .then((data) => {
                    setAssociations(data);
                    setFilteredAssociations(data);
                })
                .catch((error) => console.error("❌ Erreur chargement associations :", error));
        } else {
            handleTagFilter();
        }
    }, [tag1, tag2, tag3]);

    const resetTags = () => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                setAssociations(data);
                setFilteredAssociations(data);
            })
            .catch((error) => console.error("❌ Erreur chargement :", error));
    };

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

    const AssociationCard = ({ association }: { association: Association }) => (
        <TouchableOpacity style={styles.wrapCard} onPress={() => {
            setId(association.IdAsso);
            router.push(`/assoDetail?id=${association.IdAsso}`);
        }}>
            <View style={styles.card}>
                <Image source={getImageSource(association.LogoName)} style={styles.image} />
            </View>
            <AppText style={styles.name}>{association.NomAsso}</AppText>
        </TouchableOpacity>
    );

    return (
        <AppBackground title="Choisissez une association">
            <TextInput
                style={[
                    styles.searchInput,
                    {
                        backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
                        color: isDark ? "#fff" : "#000"
                    }
                ]}
                placeholder="Rechercher une association..."
                placeholderTextColor="#aaa"
                value={searchQuery}
                onChangeText={handleSearch}
            />

            <AppText style={styles.filterButton} onPress={() => setFilterVisible(true)}>
                🎯 Filtrer par tags
            </AppText>

            <AppText style={styles.filterButton} onPress={() => setFilterVisible2(true)}>
                Vous êtes perdu ? Cliquez ici !
            </AppText>

            <FlatList
                data={filteredAssociations}
                keyExtractor={(item) => item.IdAsso.toString()}
                numColumns={2}
                renderItem={({ item }) => <AssociationCard association={item} />}
            />

            {/* Modal filtre */}
            <Modal isVisible={isFilterVisible} onBackdropPress={() => setFilterVisible(false)} style={styles.bottomModal}>
                <View style={[styles.modalContent, { backgroundColor: modalBg }]}>
                    <AppText style={styles.modalTitle}>Filtrer les associations</AppText>

                    {[tags1, tags2, tags3].map((tagGroup, index) => (
                        <View key={`group-${index}`}>
                            <AppText style={styles.tagTitle}>Catégorie {index + 1}</AppText>
                            <View style={styles.tagContainer}>
                                {tagGroup.map(tag => (
                                    <AppText
                                        key={`tag-${index}-${tag.id}`}
                                        onPress={() => toggleTag(index, tag.id)}
                                        style={[
                                            styles.tag,
                                            {
                                                backgroundColor: selectedTags[index] === tag.id ? "#4968df" : tagBg,
                                                color: selectedTags[index] === tag.id ? "#fff" : tagColor
                                            }
                                        ]}
                                    >
                                        {tag.name}
                                    </AppText>
                                ))}
                            </View>
                        </View>
                    ))}

                    <AppText
                        style={styles.applyButton}
                        onPress={() => {
                            const noTagSelected = selectedTags.every(t => t === null);
                            if (noTagSelected) {
                                setFilteredAssociations(associations);
                            } else {
                                handleTagFilter();
                            }
                            setFilterVisible(false);
                        }}
                    >
                        ✅ Appliquer les filtres
                    </AppText>

                    <AppText
                        style={styles.applyButton}
                        onPress={() => {
                            resetTags();
                            setFilterVisible(false);
                        }}
                    >
                        🔄 Voir toutes les associations
                    </AppText>
                </View>
            </Modal>

            {/* Modal \"perdu\" */}
            <Modal isVisible={isFilterVisible2} onBackdropPress={() => setFilterVisible2(false)} style={styles.bottomModal}>
                <View style={[styles.modalContent, { backgroundColor: modalBg }]}>
                    <AppText style={styles.modalTitle}>Vous êtes perdu ?</AppText>
                    <AppText style={styles.modalTitle}>Décrivez ce qui vous touche ou vous motive :</AppText>

                    <AppText
                        style={styles.applyButton}
                        onPress={() => {
                            setFilterVisible2(false);
                            router.push("/trouverAsso");
                        }}
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
