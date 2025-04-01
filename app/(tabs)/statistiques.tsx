import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import AppBackground from "@/components/AppBackground";
import AppText from "@/components/AppText";
import { useTheme } from "@/components/ThemeContext"; // 👈 à ajouter

interface DonStats {
    NomAsso: string;
    totalDons: number;
}

export default function StatistiquesDons() {
    const [data, setData] = useState<DonStats[]>([]);
    const { theme } = useTheme(); // 👈 pour détecter le mode clair/sombre
    const isDark = theme === "dark";

    useEffect(() => {
        fetch("https://backenddevmobile-production.up.railway.app/api/dons/top-associations")
            .then((res) => res.json())
            .then((resData) => setData(resData))
            .catch((err) => console.error("Erreur chargement stats : ", err));
    }, []);

    const chartData = {
        labels: data.map((item) => item.NomAsso),
        datasets: [
            {
                data: data.map((item) => item.totalDons),
                colors: data.map(() => (opacity = 1) => `rgba(73, 104, 223, ${opacity})`),
            },
        ],


    };

    return (
        <AppBackground title="Statistiques de Dons">
            <View style={styles.container}>
                <AppText style={styles.title}>Top 5 associations (par montant de dons)</AppText>

                {data.length > 0 ? (
                    <BarChart
                        data={chartData}
                        width={Dimensions.get("window").width - 40}
                        height={280}
                        yAxisSuffix="€"
                        fromZero
                        withCustomBarColorFromData={true}
                        showValuesOnTopOfBars
                        chartConfig={{
                            backgroundGradientFrom: isDark ? "#1E1E1E" : "#fff",
                            backgroundGradientTo: isDark ? "#1E1E1E" : "#fff",
                            decimalPlaces: 0,

                            color: () => "rgba(73, 104, 223, 1)",
                            labelColor: () => (isDark ? "#fff" : "#000"),
                            barPercentage: 0.6,


                            propsForLabels: {
                                fontSize: 16,
                                fontWeight: "bold",
                            },
                            propsForBackgroundLines: {
                                stroke: isDark ? "#444" : "#ccc",
                            },
                            propsForVerticalLabels: {
                                fontSize: 15,
                            },
                            propsForHorizontalLabels: {
                                fontSize: 14,
                            },
                        }}

                        style={styles.chart}
                    />
                ) : (
                    <AppText style={{ textAlign: "center" }}>Chargement des données...</AppText>
                )}
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 30,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    title: {
        fontSize: 27,
        fontWeight: "bold",
        marginBottom: 40,
        textAlign: "center",
    },
    chart: {
        borderRadius: 16,

    },
});
