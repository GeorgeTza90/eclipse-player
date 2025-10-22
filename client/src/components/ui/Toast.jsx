import { useEffect } from "react";

export default function Toast({ message, type = "info", onClose, duration = 3000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const toastStyle = {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "12px 20px",
        borderRadius: "6px",
        color: "white",
        fontWeight: "bold",
        zIndex: 99999,
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        opacity: 0.95,
        animation: "slideIn 0.3s ease-out",
        backgroundColor:
            type === "success" ? "#2ecc71" :
                type === "error" ? "#e74c3c" :
                    "#3498db", // info default
    };

    return (
        <>
            <div style={toastStyle}>{message}</div>

            <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 0.95; }
        }
      `}</style>
        </>
    );
}
