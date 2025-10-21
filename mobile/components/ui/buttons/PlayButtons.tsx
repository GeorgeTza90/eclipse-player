import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { Buttons } from "@/types/buttons";

const icons = {
  play: require("@/assets/icons/playButton.png"),
  pause: require("@/assets/icons/pauseButton.png"),
  stop: require("@/assets/icons/stopButton.png"),
  previous: require("@/assets/icons/prevButton.png"),
  next: require("@/assets/icons/nextButton.png"),
};

export default function PlayButton({ type = "play", onPress }: Buttons) {
  const iconSource = icons[type] ?? icons.play;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={iconSource} style={styles.icon} resizeMode="contain" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {  width: 40, height: 40, borderRadius: 30, backgroundColor: "#d4d4d4e2", justifyContent: "center", alignItems: "center" },
  icon: { width: 28, height: 28, tintColor: "#1e1e1eff" },
});
