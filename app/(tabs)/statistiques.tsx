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
            <View style={styles.container}>

                {data.length > 0 ? (
                    <BarChart
                        data={chartData}
                        width={Dimensions.get("window").width - 40}
                        height={280}
                        yAxisSuffix="€"
                        fromZero
                        showValuesOnTopOfBars
                        chartConfig={{
                            decimalPlaces: 0,
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
