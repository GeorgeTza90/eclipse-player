import { useEffect } from "react";
import { useStylesToast } from "@/hooks/useStylesToast";
import type { ToastProps } from "@/types/ui.types";

const Toast = ({ message, type = "info", onClose, duration = 3000 }: ToastProps) => {
    const { toastStyle } = useStylesToast();

    useEffect(() => {
        const timer = setTimeout(() => onClose(), duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <>
            <div style={toastStyle(type)}>{message}</div>
            <style>
                {`@keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 0.95; }
                }`}
            </style>
        </>
    );
};

export default Toast;