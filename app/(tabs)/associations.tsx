import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {useSQLiteContext} from "expo-sqlite";
import {Text} from "react-native";
import {StyleSheet} from 'react-native';

export default function associationDisplayScreen(){
const [userId, setUserId] = useState(null);
const [userEmail, setUserEmail] = useState("");
const db = useSQLiteContext();
useEffect(() => {
    async function fetchUser() {
        const storedId = await AsyncStorage.getItem("userId");
        const storedEmail = await AsyncStorage.getItem("userEmail");

        if (storedId && storedEmail) {
            // @ts-ignore
            setUserId(storedId);
            setUserEmail(storedEmail);
            console.log("🔹 Utilisateur connecté :", storedId, storedEmail);
        }
    }
    fetchUser();
}, [db]);

return (
    <Text style={styles.text}>L'utilisateur connecté {String(userId)} {String(userEmail)}</Text>
);
}
const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: "black",
        marginTop: 55
    }
})