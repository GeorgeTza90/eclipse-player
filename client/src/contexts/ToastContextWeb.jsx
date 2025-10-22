// contexts/ToastContext.js
import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = "info", duration = 3000) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div style={{
                position: "fixed",
                bottom: 20,
                right: 20,
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>
                {toasts.map((t) => (
                    <div key={t.id} style={{
                        padding: "12px 20px",
                        borderRadius: 6,
                        color: "#fff",
                        fontWeight: "bold",
                        backgroundColor:
                            t.type === "success" ? "#2ecc71" :
                                t.type === "error" ? "#e74c3c" :
                                    "#3498db",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                        opacity: 0.95,
                        animation: "slideIn 0.3s ease-out"
                    }}>
                        {t.message}
                    </div>
                ))}
            </div>
            <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 0.95; }
        }
      `}</style>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within ToastProvider");
    return context;
};
