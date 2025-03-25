// app/(tabs)/assoDetail.tsx
import React, { useEffect, useState } from "react";
import { Text, Image, View, StyleSheet, Button, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import AppBackground from "@/components/AppBackground";

interface AssociationDetail {
    IdAsso: number;
    NomAsso: string;
    LogoName: string;
    Description: string;
}

export default function AssoDetail() {
    const { id } = useLocalSearchParams();
    const [asso, setAsso] = useState<AssociationDetail | null>(null);

    useEffect(() => {
        const assoId = Array.isArray(id) ? id[0] : id;
        if (assoId) {
            fetch(`https://backenddevmobile-production.up.railway.app/api/associations/getAsso/${assoId}`)
                .then((res) => res.json())
                .then((data) => setAsso(data))
                .catch((err) => console.error("❌ Erreur chargement détail asso", err));
        }
    }, [id]);



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
        return images[logoName] || images["default"];
    };


    if (!asso) return <Text>Chargement...</Text>;

    return (
        <AppBackground title={asso.NomAsso}>
            <ScrollView>
                <Image source={getImageSource(asso.LogoName)} style={styles.image} />
                <Text style={styles.description}>{asso.Description}</Text>
                <View style={{ marginTop: 20 }}>
                    <Button title="Faire un don" onPress={() => {
                        router.push(`/payment?id=${asso.IdAsso}`);
                    }} />
                </View>
            </ScrollView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 150,
        resizeMode: "contain",
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
    },
});
