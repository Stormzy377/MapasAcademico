import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar"; // <-- Garante que vem do 'expo-status-bar'
import { MapScreen } from "./src/screens/MapScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        {/* Mudamos para "auto" ou mantemos "dark", mas garantindo a importação do expo-status-bar */}
        <StatusBar style="auto" />
        <MapScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});