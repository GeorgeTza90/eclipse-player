import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { AuthButtonProps } from "@/types/buttons";

export default function AuthButton({ loading, isLogin, title, onPress }: AuthButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
    >
      <Text style={styles.buttonText}>
        {title || (loading ? "Loading..." : isLogin ? "Login" : "Register")}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: "#2f2d2dff", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});
