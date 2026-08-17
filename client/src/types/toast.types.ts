import type { ReactNode } from "react";

export type ToastType = "info" | "success" | "warning" | "error";

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

export interface ToastProps {
    message: string;
    type?: ToastType;
    onClose: () => void;
    duration?: number;
}

export interface ToastItemProps {    
    toast: Toast;    
    onClose: (id: string) => void;
}

export interface ToastContainerProps {
    toasts: Toast[];    
    closeToast: (id: string) => void;    
}

export interface ToastProviderProps {
    children: ReactNode;
}

export interface ToastContextValue {
    showToast: (message: string, type?: ToastType, duration?: number) => void;
}