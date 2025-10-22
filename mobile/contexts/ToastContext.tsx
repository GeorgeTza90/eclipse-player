import React, { createContext, useContext, useState, ReactNode } from "react";
import { Text, StyleSheet, Animated, Dimensions } from "react-native";
import { ToastType, Toast, ToastContextType } from "@/types/toast"; 

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<Toast | null>(null);
  const [opacity] = useState(new Animated.Value(0));

  const showToast = (message: string, type: ToastType = "info") => {
    setToast({ message, type });
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setToast(null));
      }, 3000);
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Animated.View
          style={[
            styles.toast,
            { backgroundColor: getBackgroundColor(toast.type), opacity },
          ]}
        >
          <Text style={styles.text}>{toast.message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const getBackgroundColor = (type: ToastType) => {
  switch (type) {
    case "success":
      return "#2ecc71";
    case "error":
      return "#e74c3c";
    default:
      return "#3498db";
  }
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 150,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    maxWidth: width - 40,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
