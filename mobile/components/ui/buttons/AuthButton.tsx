import { Pressable, Text, StyleSheet } from "react-native";
import { AuthButtonProps } from "@/types/buttons";

export default function AuthButton({ loading, isLogin, title, width, onPress }: AuthButtonProps) {
    const buttonText = title || (loading ? "Loading..." : isLogin ? "Login" : "Register");

    return (
        <Pressable
            onPress={onPress}
            disabled={loading}
            style={({ pressed }) => [
                styles.button,
                { width, height: 40, marginRight: 15 },
                pressed && { opacity: 0.7 },
                loading && { opacity: 0.5 },
            ]}
        >
            <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: { backgroundColor: "#2f2d2dff", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});