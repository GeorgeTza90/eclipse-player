import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";
import { AuthButtonProps } from "@/types/buttons";

export default function SettingsButton({ loading, onPress }: AuthButtonProps) {
    return (
        <Pressable onPress={onPress} disabled={loading} style={styles.button}>
            <Image source={require("@/assets/icons/settings.png")} style={styles.icon} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: { backgroundColor: "#2f2d2dff", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, alignItems: "center", justifyContent: "center", height: 40, marginRight: 15 },
    icon: { width: 20, height: 20 },
});