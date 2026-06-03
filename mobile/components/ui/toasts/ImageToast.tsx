import { useState } from "react";
import { Modal, View, Image, Pressable, StyleSheet } from "react-native";
import Loader from "../loaders/Loader";

export const useImageToast = () => {
  const [toastImage, setToastImage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showImageToast = (imageUrl: string) => {
    setToastImage(imageUrl);
    setVisible(true);
    setLoading(true);
  };

  const hide = () => {
    setVisible(false);
    setToastImage(null);
    setLoading(false);
  };

  const ImageToastUI = (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={hide}>
        <View style={styles.imageWrapper}>
          
          {/* LOADER */}
          {loading && (
            <Loader text="Loading Image"/>
          )}

          {/* IMAGE */}
          {toastImage && (
            <Image
              source={{ uri: toastImage }}
              style={styles.image}
              resizeMode="contain"
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          )}

        </View>
      </Pressable>
    </Modal>
  );

  return { showImageToast, ImageToastUI };
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.75)", justifyContent: "center", alignItems: "center" },
  imageWrapper: { width: "85%", height: "70%", borderRadius: 6, overflow: "hidden", justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: "100%" },
  loader: { position: "absolute", zIndex: 10 },
});