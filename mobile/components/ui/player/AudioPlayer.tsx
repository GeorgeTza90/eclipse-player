import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated } from "react-native";
import { Image } from "expo-image";
import Slider from "@react-native-community/slider";
import { useAudio } from "@/contexts/AudioContext";
import PlayButton from "../buttons/PlayButtons";
import Circle from "./Circle";
import { formatTimeSeconds } from "@/hooks/useFormatTime";
import { useRouter } from "expo-router";
import { AudioPlayerProps } from "@/types/audio";

const { width } = Dimensions.get("window");

export default function AudioPlayer({ onToggleExtention }: AudioPlayerProps) {
    const {
        currentSong, isPlaying, position, duration, volume,
        togglePlay, stop, next, previous, setVolume, seekTo,
    } = useAudio();

    const [intensity, setIntensity] = useState(30);
    const [sliderPosition, setSliderPosition] = useState<number>(0);
    const [activeExtention, setActiveExtention] = useState<"Playlist" | "Lyrics">("Playlist");
    const shadowColor = currentSong?.averageColor ?? "#bebebe";
    const volMin = 0.000001;
    const router = useRouter();
    
    const highlightAnim = useRef(new Animated.Value(0)).current;

    const extentionKeys: ("Playlist" | "Lyrics")[] = ["Playlist","Lyrics"];
    const buttonWidth = (width * 0.5) / extentionKeys.length;

    useEffect(() => { if (position != null) setSliderPosition(position); }, [position]);
    useEffect(() => { setIntensity(volume * 30); }, [volume]);

    const handleToggleExtention = (key: "Playlist" | "Lyrics") => {
        setActiveExtention(key);
        onToggleExtention?.(key);
        
        const index = extentionKeys.indexOf(key);
        Animated.spring(highlightAnim, {
            toValue: index * buttonWidth,
            useNativeDriver: true,
        }).start();
    };

    const handlePressArtist = (artist: string) => router.push(`/library/ArtistInfo?artist=${encodeURIComponent(artist)}`);    

    return (
        <View style={styles.container}>
            {!currentSong ? (
                <View style={styles.emptyPlayer}>
                    <Text style={styles.emptyText}>Player Is Empty</Text>
                    <Text style={styles.emptyAdd} onPress={() => router.push("/library")}>Add Songs Here</Text>
                </View>
            ) : (
                <>
                    {/* Big Circle */}
                    <View style={{ position: "absolute", top: -190, left: -28, zIndex: 0 }}>
                        <Circle size={390} shadowColor={shadowColor} intensity={intensity} />
                    </View>

                    {/* Player Content */}
                    <View style={styles.playerContent}>
                        {/* Info */}
                        <View style={styles.headerRowWrapper}>
                            <View style={styles.headerRow}>
                                {currentSong.image && (
                                    <Image
                                        source={{ uri: currentSong.image }}
                                        style={styles.albumImageHorizontal}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                )}
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>{currentSong.title}</Text>
                                    {currentSong.feature && <Text style={styles.trackFeature}>(feat. {currentSong.feature})</Text>}
                                    <TouchableOpacity onPress={() => handlePressArtist(currentSong.artist)}>
                                        <Text style={styles.artist}>{currentSong.artist}</Text>
                                    </TouchableOpacity>
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
                            <Text style={styles.time}>{formatTimeSeconds(sliderPosition)}</Text>
                            <Slider
                                style={{ flex: 1 }}
                                minimumValue={0}
                                maximumValue={duration || 0}
                                value={sliderPosition}
                                minimumTrackTintColor={shadowColor}
                                maximumTrackTintColor="#555"
                                thumbTintColor={shadowColor}
                                onSlidingComplete={seekTo}
                            />
                            <Text style={styles.time}>{formatTimeSeconds(duration)}</Text>
                        </View>

                        {/* Volume Slider */}
                        <View style={styles.volumeSliderContainer}>
                            <TouchableOpacity onPress={() => setVolume(volMin)}>
                                <Image source={require('@/assets/icons/volMin2.png')} style={styles.volIcon} contentFit="contain" />
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
                                <Image source={require('@/assets/icons/volMax2.png')} style={styles.volIcon} contentFit="contain" />
                            </TouchableOpacity>
                        </View>

                        {/* Extension Buttons */}
                        <View style={styles.extentionButtons}>
                            <Animated.View
                                style={[
                                    styles.highlight,
                                    { width: buttonWidth, transform: [{ translateX: highlightAnim }], zIndex: -4 }
                                ]}
                                pointerEvents="box-none"
                            />
                            {extentionKeys.map((key) => (
                                <TouchableOpacity
                                    key={key}
                                    style={styles.extentionButton}
                                    onPress={() => handleToggleExtention(key)}
                                >
                                    <Text style={styles.extentionText}>{key}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Small Circle */}
                        <View style={{ position: 'absolute', top: 300, left: 65, zIndex: 0 }}>
                            <Circle size={200} color2="#0e0e0eff" color1="#1b1a1aff" shadowColor={shadowColor} intensity={intensity * 0.25} heightOffset={-8}/>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { position:"absolute" ,alignItems: "center", justifyContent: "center", marginTop: 220 },
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
    extentionButtons: { flexDirection: "row", width: width * 0.5, height: 40, borderRadius: 16, backgroundColor: 'rgba(37, 36, 36, 0.82)', overflow: "hidden", marginTop: 10 },
    highlight: { position:"absolute", top: 0, left: 0, height: "100%", backgroundColor: "rgba(150,150,150,0.3)", borderRadius: 16 },
    extentionButton: { flex: 1, justifyContent: "center", alignItems: "center", zIndex: 20 },
    extentionText: { color: "#fff", fontWeight: "bold" },
    emptyPlayer: { flex: 1, alignItems: "center", justifyContent: "center" },
    emptyText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    emptyAdd: { color: "#aaa", textDecorationLine: "underline" },
});