import { createContext, useContext, useState, ReactNode } from "react";
import { ToastType, ToastContextType, Toast } from "@/types/toast";
import { ToastContainer } from "@/components/ui/toasts/ToastContainer";
import { Animated } from "react-native";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<Toast | null>(null);
    const [opacity] = useState(new Animated.Value(0));

    const showToast = (
        message: string,
        type: ToastType = "info"
    ) => {
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
            <ToastContainer toast={toast} opacity={opacity}/>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context)  throw new Error("useToast must be used within a ToastProvider");
    return context;
};