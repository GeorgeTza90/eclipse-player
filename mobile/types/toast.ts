export type ToastType = "info" | "success" | "error";

export interface Toast {
    message: string;
    type: ToastType;
}

export interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}