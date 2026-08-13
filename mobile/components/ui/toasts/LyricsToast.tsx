import { useState } from "react";
import { Modal, View, Pressable, StyleSheet, Text, ScrollView } from "react-native";

export const useLyricsToast = (lyrics: string) => {
    const [toastLyrics, setToastLyrics] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);    

    const showLyricsToast = () => {
        setToastLyrics(lyrics);
        setVisible(true);    
    };

    const hide = () => {
        setVisible(false);
        setToastLyrics(null);    
    };

    const LyricsToastUI = (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                {/* Backdrop is its own layer, sits behind content */}
                <Pressable style={StyleSheet.absoluteFill} onPress={hide} />

                {/* Content sits on top, untouched by backdrop's press handler */}
                <View style={styles.lyricsWrapper} pointerEvents="box-none">
                    {toastLyrics && (
                        <ScrollView style={{ width: "100%" }} contentContainerStyle={{ padding: 16 }}>
                            <Text style={styles.lyrics}>
                                {toastLyrics}
                            </Text>
                        </ScrollView>
                    )}
                </View>
            </View>
        </Modal>
    );

    return { showLyricsToast, LyricsToastUI };
};

const styles = StyleSheet.create({
    overlay: { zIndex: 999, flex: 1, backgroundColor: "rgba(0, 0, 0, 0.83)", justifyContent: "center", alignItems: "center" },
    lyricsWrapper: { width: "100%", height: "70%", borderRadius: 6 },
    lyrics: { color: "#fff", textAlign: "center", fontSize: 16, lineHeight: 22 },
    loader: { position: "absolute", zIndex: 10 },
});