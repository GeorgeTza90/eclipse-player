import { useRouter } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import { TeaserParamProps } from "@/types/teaser";

export default function Teaser({link, source}: TeaserParamProps) {
    const router = useRouter();    

    const player = useVideoPlayer(source, (player) => {
        player.loop = true;
        player.play();
        player.muted = true;
    });

    const handlePress = () => router.push(link);

    return (
        <View style={styles.container}>
            <VideoView
                style={styles.video}
                player={player}
                nativeControls={false}
                pointerEvents="none"
            />

            <Pressable style={StyleSheet.absoluteFill} onPress={handlePress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { justifyContent: "center", alignItems: "center",  },
    video: { width: Dimensions.get("window").width, height: 200, opacity: 0.1 },
    pressable: { width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' },
});