import { Text, StyleSheet, Animated, Dimensions } from "react-native";
import { Toast, ToastContainerProps } from "@/types/toast";

export const ToastContainer = ({ toast, opacity }: ToastContainerProps) => {
    if (!toast) return null;

    return (
        <Animated.View
            style={[
                styles.toast,
                {
                    backgroundColor: getBackgroundColor(toast.type),
                    opacity,
                },
            ]}
        >
            <Text style={styles.text}>
                {toast.message}
            </Text>
        </Animated.View>
    );
};

const getBackgroundColor = (type: Toast["type"]) => {
    switch (type) {
        case "success":
            return "#2ecc71";
        case "error":
            return "#e74c3c";
        default:
            return "#3498db";
    }
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    toast: { 
        position: "absolute", bottom: 150, alignSelf: "center", paddingHorizontal: 20,
        paddingVertical: 12, borderRadius: 8, maxWidth: width - 40, shadowColor: "#000",
        shadowOpacity: 0.3, shadowRadius: 4, elevation: 5, shadowOffset: { width: 0, height: 2 },        
    },
    text: { color: "white", fontWeight: "bold", textAlign: "center" },
});