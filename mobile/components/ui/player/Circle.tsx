import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CircleProps } from "@/types/circle";

export default function Circle({
  size = 200,
  shadowColor = "#bebebe71",
  color1 = "#080808ff",
  color2 = "#1c1b1bff",
  colors = [color1, color2],
  intensity = 30,
  heightOffset = 8,
}: CircleProps) {

  const shadowStyle =
    Platform.OS === "web"
      ? { boxShadow: `0px ${heightOffset}px 2px ${shadowColor}` }
      : { shadowColor, shadowOffset: { width: 0, height: heightOffset }, 
          shadowOpacity: 0.2, shadowRadius: 2, elevation: intensity };

  return (
    <View
      style={[
        styles.wrapper,
        shadowStyle,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { justifyContent: "center", alignItems: "center", overflow: "hidden", top: 100 },
});
