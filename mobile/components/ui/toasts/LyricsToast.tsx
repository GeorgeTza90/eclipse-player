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
            <Pressable style={styles.overlay} onPress={hide}>
                <View style={styles.lyricsWrapper}>                  
                    
                    {toastLyrics && (
                        <ScrollView
                            style={{ width: "100%" }}
                            contentContainerStyle={{ padding: 16 }}
                        >
                            <Text style={styles.lyrics}>
                                {toastLyrics}
                            </Text>
                        </ScrollView>
                    )}
                </View>
            </Pressable>
        </Modal>
    );

    return { showLyricsToast, LyricsToastUI };
};

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.82)", justifyContent: "center", alignItems: "center" },
    lyricsWrapper: { width: "100%", height: "70%", borderRadius: 6 },
    lyrics: { color: "#fff", textAlign: "center", fontSize: 16, lineHeight: 22 },
    loader: { position: "absolute", zIndex: 10 },
});