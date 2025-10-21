import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Buttons } from "@/types/buttons";

export default function PlayButton({ text = "▶", onPress }: Buttons) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { width: 70, height: 30, borderRadius: 5, backgroundColor: "#d4d4d45e", justifyContent: "center", alignItems: "center" },
  text: { color: "#1e1e1eff", fontSize: 18 },
});
