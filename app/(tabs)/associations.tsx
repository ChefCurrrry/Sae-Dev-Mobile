
import {Text} from "react-native";
import {StyleSheet} from 'react-native';

export default function associationDisplayScreen(){



return (
    <Text style={styles.text}>L'utilisateur connecté</Text>
);
}
const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: "black",
        marginTop: 55
    }
})