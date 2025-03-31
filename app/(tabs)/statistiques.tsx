import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import AppBackground from "@/components/AppBackground";
import AppText from "@/components/AppText";

interface DonStats {
    NomAsso: string;
    totalDons: number;
}

export default function StatistiquesDons() {
    const [data, setData] = useState<DonStats[]>([]);

    useEffect(() => {
        fetch("https://backenddevmobile-production.up.railway.app/api/dons/top-associations")
            .then((res) => res.json())
            .then((resData) => {
                console.log("👉 Données reçues :", resData);
                setData(resData);
            })
            .catch((err) => console.error("Erreur chargement stats : ", err));
    }, []);

    const chartData = {
        labels: data.map((item) => item.NomAsso),
        datasets: [
            {
                data: data.map((item) => item.totalDons),
            },
        ],
    };

    return (
        <AppBackground title="Statistiques de Dons">
            <View style={styles.container}>
                <AppText style={styles.title}>Top 5 associations avec le plus de dons </AppText>

                {data.length > 0 ? (
                    <BarChart
                        data={chartData}
                        width={Dimensions.get("window").width - 40}
                        height={280}
                        yAxisSuffix="€"
                        fromZero
                        showValuesOnTopOfBars
                        chartConfig={{
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(73, 104, 223, ${opacity})`,
                            labelColor: () => "#000",
                            barPercentage: 0.5,
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
        marginRight: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    chart: {
        borderRadius: 16,
    },
});
