import { Pressable, Text, StyleSheet } from "react-native";
import { AuthButtonProps } from "@/types/buttons";

export default function GoogleAuthButton({ loading, title, width, onPress }: AuthButtonProps) {
    const buttonText = title;

    return (
        <Pressable
            onPress={onPress}
            disabled={loading}
            style={({ pressed }) => [
                styles.button,
                { width, height: 40, marginRight: 15, marginBottom: 10 },
                pressed && { opacity: 0.7 },
                loading && { opacity: 0.5 },
            ]}
        >
            <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: { backgroundColor: "#4285F4", paddingVertical: 10, paddingHorizontal: 10, borderRadius: 8, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});