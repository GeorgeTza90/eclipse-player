import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import Slider from "@react-native-community/slider";
import { useAudio } from "@/contexts/AudioContext";
import PlayButton from "../buttons/PlayButtons";
import Circle from "./Circle";
import { formatTime } from "@/hooks/useFormatTime";

type AudioPlayerProps = {
  onToggleLyrics?: (active: boolean) => void;
};
const { width } = Dimensions.get("window");

export default function AudioPlayer({ onToggleLyrics }: AudioPlayerProps) {
  const {
    currentSong, isPlaying, position, duration, volume,
    togglePlay, stop, next, previous, setVolume, seekTo,
  } = useAudio();

  const [intensity, setIntensity] = useState(30);
  const [lyricsActive, setLyricsActive] = useState(false);
  const shadowColor = currentSong?.averageColor ?? "#bebebe";
  const volMin = 0.000001;

  useEffect(() => {
    setIntensity(volume * 30);
  }, [volume]);

  const handleLyrics = () => {
    const newState = !lyricsActive;
    setLyricsActive(newState);
    if (onToggleLyrics) onToggleLyrics(newState);
  };

  return (
    <View style={styles.container}>
      {/* Big Circle */}
      <View style={{ position: "absolute", top: -190, left: -28, right: 0, zIndex: 0 }}>
        <Circle size={390} shadowColor={shadowColor} intensity={intensity} />
      </View>

      {/* Player Content */}
      <View style={styles.playerContent}>
        {/* Info */}
        <View style={styles.headerRowWrapper}>
          <View style={styles.headerRow}>
            {currentSong?.image && (
              <Image
                source={{ uri: currentSong.image }}
                style={styles.albumImageHorizontal}
                contentFit="cover"
                transition={1000}
              />
            )}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{currentSong?.title || "Song Title"}</Text>
              {currentSong?.feature && (
                <Text style={styles.trackFeature}>(feat. {currentSong.feature})</Text>
              )}
              <Text style={styles.artist}>{currentSong?.artist || "Artist Name"}</Text>
            </View>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.buttonDiv}>
          <PlayButton type="previous" onPress={previous} />
          <PlayButton type="stop" onPress={stop} />
          <PlayButton type={isPlaying ? "pause" : "play"} onPress={togglePlay} />
          <PlayButton type="next" onPress={next} />
        </View>

        {/* Time Slider */}
        <View style={styles.timeSliderContainer}>
          <Text style={styles.time}>{formatTime(position)}</Text>
          <Slider
            style={{ flex: 1 }}
            minimumValue={0}
            maximumValue={duration || 0}
            value={position}
            minimumTrackTintColor={shadowColor}
            maximumTrackTintColor="#555"
            thumbTintColor={shadowColor}
            onSlidingComplete={seekTo}
          />
          <Text style={styles.time}>{formatTime(duration)}</Text>
        </View>

        {/* Volume Slider */}
        <View style={styles.volumeSliderContainer}>
          <TouchableOpacity onPress={() => setVolume(volMin)}>
            <Image
              source={require('@/assets/icons/volMin2.png')}
              style={styles.volIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
          <Slider
            style={{ flex: 1, marginHorizontal: 10 }}
            minimumValue={volMin}
            maximumValue={1}
            value={volume}
            minimumTrackTintColor={shadowColor}
            maximumTrackTintColor="#555"
            thumbTintColor={shadowColor}
            onValueChange={setVolume}
          />
          <TouchableOpacity onPress={() => setVolume(1)}>
            <Image
              source={require('@/assets/icons/volMax2.png')}
              style={styles.volIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Lyrics Toggle */}
        <TouchableOpacity style={styles.lyricsButton} onPress={handleLyrics}>
          <Text style={styles.lyricsButtonText}>{lyricsActive ? "Playlist" : "Lyrics"}</Text>
        </TouchableOpacity>


        {/* Circle 2*/}
        <View style={{ position: 'absolute', top: 300, left: 65, right: 0, bottom: 0, zIndex: 0 }}>
          <Circle size={200} color2 = "#0e0e0eff" color1 = "#1b1a1aff" shadowColor={shadowColor} intensity={intensity * 0.25} heightOffset={-8}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 120 },
  playerContent: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: -80 },
  headerRowWrapper: { width: "100%", justifyContent: "center", alignItems: "center", marginBottom: 20 },
  headerRow: { flexDirection: "row", alignItems: "center", maxWidth: 400 },
  albumImageHorizontal: { width: 100, height: 100, borderRadius: 15, marginRight: 15 },
  textContainer: { maxWidth: 200 },
  title: { fontSize: 16, fontWeight: "bold", color: "#ebebeb", marginBottom: 5 },
  trackFeature: { fontSize: 12, color: "#ccc", marginBottom: 5 },
  artist: { fontSize: 14, color: "rgba(240,248,255,0.6)", marginBottom: 10 },
  buttonDiv: { flexDirection: "row", justifyContent: "space-around", width: width * 0.8, marginBottom: 20 },
  timeSliderContainer: { flexDirection: "row", alignItems: "center", width: width * 0.8, marginBottom: 20 },
  volumeSliderContainer: { flexDirection: "row", alignItems: "center", width: width * 0.8, marginBottom: 20 },
  time: { width: 40, textAlign: "center", color: "#fff" },
  volIcon: { width: 40, height: 40 },
  lyricsButton: { padding: 5, paddingHorizontal: 20, backgroundColor: "#333", borderRadius: 12, alignItems: "center", justifyContent: "center", marginTop: 0, zIndex: 10 },
  lyricsButtonText: {  color: "#fff", fontWeight: "bold", fontSize: 16 },
});
