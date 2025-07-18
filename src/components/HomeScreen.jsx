import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Учет автомобиля</Text>
      <Button
        title="Добавить работу"
        onPress={() => navigation.navigate("AddMaintenance")}
      />
      <View style={styles.spacer} />
      <Button
        title="Добавить поломку"
        onPress={() => navigation.navigate("AddBreakdown")}
      />
      <View style={styles.spacer} />
      <Button
        title="Страховка"
        onPress={() => navigation.navigate("Insurance")}
      />
      <View style={styles.spacer} />
      <Button
        title="Ближайшие работы"
        onPress={() => navigation.navigate("UpcomingWorks")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  spacer: { height: 16 },
});
