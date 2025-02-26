import { StyleSheet, Text, View } from 'react-native';
import {Link} from "expo-router";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Link href={"/"} asChild>
        <Text style={styles.title}>Tab Two</Text>
      </Link>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
