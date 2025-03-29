// Adaptation du fichier assoDetail.tsx avec support du mode sombre et AppText

import React, { useEffect, useState } from "react";
import {
    Image,
    View,
    StyleSheet,
    ScrollView,
    Alert,
    Text
} from "react-native";
import { router } from "expo-router";
import AppBackground from "@/components/AppBackground";
import { useSelectedAsso } from "@/components/SelectedAssoContext";
import RegularButton from "@/components/RegularButton";
import * as SecureStore from "expo-secure-store";
import AppText from "@/components/AppText";
import { useTheme } from "@/components/ThemeContext";

interface AssociationDetail {
    IdAsso: number;
    NomAsso: string;
    LogoName: string;
    Description: string;
}

export default function AssoDetail() {
    const [asso, setAsso] = useState<AssociationDetail | null>(null);
    const [totalDon, setTotalDon] = useState<number>(0);
    const { id } = useSelectedAsso();
    const objectif = 30000;
    const { theme } = useTheme();
    const isDark = theme === "dark";

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

    useEffect(() => {
        if (id) {
            fetch(`https://backenddevmobile-production.up.railway.app/api/associations/getAssoById?id=${id}`)
                .then(res => res.json())
                .then(data => setAsso(data))
                .catch(err => console.error("❌ Erreur fetch asso :", err));

            fetch(`https://backenddevmobile-production.up.railway.app/api/dons/somme?id=${id}`)
                .then(res => res.json())
                .then(data => setTotalDon(data.total))
                .catch(err => console.error("❌ Erreur fetch dons :", err));
        }
    }, [id]);

    const getImageSource = (logoName: string) => {
        return images[logoName] || images["default"];
    };

    const unsetType = async () => {
        await SecureStore.deleteItemAsync("type");
    };

    if (!asso) return <AppText>Chargement...</AppText>;

    return (
        <AppBackground title={asso.NomAsso}>
            <ScrollView>
                <View style={styles.card}>
                    <Image source={getImageSource(asso.LogoName)} style={styles.image} />
                </View>

                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${(totalDon / objectif) * 100}%` }]} />
                </View>
                <AppText style={[styles.totalText, { color: isDark ? "#fff" : "#000" }]}>€{totalDon}</AppText>
                <AppText style={[styles.description, { color: isDark ? "#fff" : "#000" }]}>{asso.Description}</AppText>

                <RegularButton
                    styleButton={styles.loginButton}
                    styleText={styles.loginText}
                    text="Faire un Don"
                    onPress={() => {
                        unsetType();
                        router.push(`/payment?id=${asso.IdAsso}`);
                    }}
                />

                <RegularButton
                    styleButton={styles.loginButton}
                    styleText={styles.loginText}
                    text="Planifier un Don Récurrent"
                    onPress={async () => {
                        const userId = await SecureStore.getItemAsync("userId");
                        await SecureStore.setItemAsync("type", "recurrent");
                        if (!userId) {
                            Alert.alert("Connexion requise", "Veuillez vous connecter pour planifier un don récurrent.");
                            router.push("/connexion");
                        } else {
                            router.push(`/payment?id=${asso.IdAsso}`);
                        }
                    }}
                />
            </ScrollView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
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
    description: {
        marginTop: 50,
        fontSize: 20,
        lineHeight: 22,
        textAlign: "left",
    },
    loginButton: {
        backgroundColor: "#4968df",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 15,
    },
    loginText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    progressContainer: {
        height: 10,
        backgroundColor: "#ddd",
        borderRadius: 10,
        overflow: "hidden",
        marginVertical: 15,
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#4968df",
    },
    totalText: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: -30,
    },
});