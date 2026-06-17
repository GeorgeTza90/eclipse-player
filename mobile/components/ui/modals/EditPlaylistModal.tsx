import { useEffect, useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { usePostManager } from "@/hooks/useCallManager";
import { useToast } from "@/contexts/ToastContext";
import { EditPlaylistModalProps } from "@/types/playlists";

export default function EditPlaylistModal({ visible, onClose, onUpdated, currentTitle, currentDescription, currentId }: EditPlaylistModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { showToast } = useToast();
    const { call: postCall } = usePostManager();

    /* ---------------- SYNC WHEN OPEN ---------------- */
    useEffect(() => {
        if (visible) {
            setTitle(currentTitle || "");
            setDescription(currentDescription || "");
        }
    }, [visible, currentTitle, currentDescription]);

    /* ---------------- UPDATE ---------------- */
    const handleUpdate = async () => {
        if (!title.trim()) {
            showToast("Playlist title is required", "error");
            return;
        }

        try {
            await postCall(
                "updatePlaylist",
                currentId,
                title,
                description
            );

            showToast("Playlist updated successfully", "success");

            onUpdated?.(title, description);
            onClose?.();
        } catch (err: any) {
            console.error(err);
            showToast(err?.message || "Could not update playlist", "error");
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modal}>

                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Playlist Title"
                        placeholderTextColor="#aaa"
                        style={styles.input}
                    />

                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Description"
                        placeholderTextColor="#aaa"
                        style={styles.input}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleUpdate}
                    >
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.cancel]}
                        onPress={onClose}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modal: {
        width: "80%",
        backgroundColor: "#333",
        padding: 20,
        borderRadius: 8
    },
    input: {
        backgroundColor: "#222",
        color: "#fff",
        padding: 10,
        marginBottom: 10,
        borderRadius: 4
    },
    button: {
        padding: 12,
        backgroundColor: "#555",
        borderRadius: 6,
        alignItems: "center",
        marginBottom: 10
    },
    cancel: {
        backgroundColor: "#777"
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    }
});