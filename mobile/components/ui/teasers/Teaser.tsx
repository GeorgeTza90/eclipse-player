import React from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useRouter } from "expo-router";

export default function Teaser() {
    const router = useRouter();
    const videoSource = require("@/assets/vids/video_teaser_2.mp4");

    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
        player.play();
        player.muted = true;
    });

    const handlePress = () => router.push(`/library/CollectionDetail?album=${encodeURIComponent("No Gods In Heaven")}`);

    return (
        <View style={styles.container}>
            <Pressable style={styles.pressable} onPress={handlePress}>
                <VideoView
                    style={styles.video}
                    player={player}
                    nativeControls={false}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { justifyContent: "center", alignItems: "center",  },
    video: { width: Dimensions.get("window").width, height: 200 },
    pressable: { width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' },
});