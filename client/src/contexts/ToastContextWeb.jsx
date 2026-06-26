import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const timeoutsRef = useRef([]);

    const showToast = useCallback((message, type = "info", duration = 5000) => {
        const id = Date.now();        
        setToasts((prev) => {
            if (prev.length >= 5) return prev;
            return [...prev, { id, message, type }];
        });
        const timeout = setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
            timeoutsRef.current = timeoutsRef.current.filter(t => t !== timeout);
        }, duration);

        timeoutsRef.current.push(timeout);
    }, []);

    useEffect(() => {
        return () => timeoutsRef.current.forEach(clearTimeout);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div style={{
                position: "fixed",
                bottom: 100,
                right: 20,
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                gap: "10px",                
            }}>
                {toasts.map((t) => (
                    <div key={t.id} style={{
                        padding: "12px 20px",
                        borderRadius: 6,
                        color: "#fff",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                        backgroundColor:
                            t.type === "success" ? "#2ecc71" :
                            t.type === "error" ? "#e74c3c" :
                            "#5a5c5d",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                        opacity: 0.95,
                        animation: "slideIn 0.3s ease-out"
                    }}>
                        <span>{t.message}</span>
                        <button
                            onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#fff",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "16px",
                                lineHeight: 1,
                                padding: 0,
                            }}
                        >
                            ✕
                        </button>
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
