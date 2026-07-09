import { useEffect } from "react";
import { useStylesToast } from "../../../hooks/useStylesToast";

const Toast = ({ message, type = "info", onClose, duration = 3000 }) => {
    const { toastStyle } = useStylesToast(type);

    useEffect(() => {
        const timer = setTimeout(() => onClose(), duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);    

    return (
        <>
            <div style={toastStyle}>{message}</div>
            <style>
                {`@keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 0.95; }
                }`}
            </style>
        </>
    );
}

export default Toast;