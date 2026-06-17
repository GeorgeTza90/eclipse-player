import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { Href, useRouter } from "expo-router";

type TeaserProps = {
    link: Href;
    source: any;
}

export default function Teaser({link, source}: TeaserProps) {
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