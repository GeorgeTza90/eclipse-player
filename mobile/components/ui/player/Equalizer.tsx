import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import { useAudio } from "@/contexts/AudioContext";
import { EQ_BANDS } from "@/utils/defaultEQ";

const { width, height } = Dimensions.get('window');

export default function MobileEqualizer({ color = "#fff" }) {
  const { EQGain, setEQGain, resetEQ } = useAudio();
  const frequencies = useMemo(() => EQ_BANDS.filter(b => [250, 630, 1000, 2000, 4000, 6000, 10000].includes(b.value)), []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Graphic EQ</Text>

      {/* Sliders */}
      <ScrollView horizontal contentContainerStyle={styles.eqContainer}>
        <View style={styles.linesDiv}>
          {Array.from({ length: 13 }).map((_, i) => (
            <View key={i} style={styles.line} />
          ))}
        </View>
        {frequencies.map(band => (
          <View key={band.label} style={styles.sliderWrapper}>
            <Slider
              style={styles.slider}
              minimumValue={-7}
              maximumValue={7}
              step={1}
              value={EQGain[band.label] ?? 0}
              minimumTrackTintColor={color}
              maximumTrackTintColor="#cdcdcd"
              thumbTintColor={color}
              onValueChange={val => setEQGain(band.label, val)}              
            />
            <Text style={styles.label}>{band.label}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Buttons */}
      <View style={styles.buttons}>
        <Text onPress={resetEQ} style={styles.resetButton}>Reset</Text>
        <Text style={styles.inActiveButton}>Save</Text>
        <Text style={styles.inActiveButton}>Load</Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.infoText}>Equalizer is in Test Mode</Text>
        <Text style={styles.infoText}>Preset Save and Load will be soon available</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: "absolute", marginTop: 500, width: width, height: height * 0.365 },
  heading: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  eqContainer: { flexDirection: "row", alignItems: "flex-end" },
  sliderWrapper: { alignItems: "center", justifyContent: "flex-end", height: 160, width: 60 },
  slider: { width: 155, height: 27, transform: [{ rotate: '-90deg' }], marginBottom: 55 },
  label: { color: "#fff", fontSize: 12 },
  buttons: { flexDirection: "row", justifyContent: "center", marginTop: 25, gap: 25 },
  resetButton: { backgroundColor: "#a4a4a4", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12 },
  inActiveButton: { backgroundColor: "#3333335b", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  inActiveText: { color: "#ffffff5f", fontWeight: "bold" },
  info: { marginTop: 20, alignItems: "center" },
  infoText: { color: "#aaaaaa8f", fontSize: 12, textAlign: "center"},  
  linesDiv: {  position: "absolute", top: 10, left: 0, width: "100%", height: "80%", flexDirection: "column", justifyContent: "space-between", zIndex: 0, opacity: 0.16 },
  line: { height: 2, backgroundColor: "#fff", margin: 0 },
});