import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);    
    const timeoutsRef = useRef([]);
    const isMobile = useIsMobile();

    const showToast = useCallback((message, type = "info", duration = 5000) => {
        const id = `${Date.now()}-${Math.random()}`;
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

    const closeToast = (id) => {
        const timeout = timeoutsRef.current.get(id);

        if (timeout) {
            clearTimeout(timeout);
            timeoutsRef.current.delete(id);
        }

        setToasts(prev => prev.filter(t => t.id !== id));
    };

    useEffect(() => {
        return () => timeoutsRef.current.forEach(clearTimeout);
    }, []);

    const wrapper = {
        position: "fixed",
        bottom: 100,
        right: 20,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        fontSize: isMobile ? "0.8rem" : "0.9rem",
    };

    const getToastStyle = (type) => ({
        padding: isMobile ? "8px 10px" : "8px 14px",
        borderRadius: 6,
        color: "#fff",        
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        backgroundColor:
            type === "success" ? "#239050" :
            type === "error" ? "#ac392c" :
            "#536a76",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        opacity: 0.95,
        animation: "slideIn 0.3s ease-out"
    });

    const button = {
        background: "none",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: 1,
        padding: 0,
    };

    const keyframes = `@keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 0.95; }
        }`;

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div style={wrapper}>
                {toasts.map((t) => (                    
                    <div key={t.id} style={getToastStyle(t.type)}>
                        <span>{t.message}</span>
                        <button onClick={() => closeToast(t)} style={button}>✕</button>
                    </div>
                ))}
            </div>
            <style>{keyframes}</style>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within ToastProvider");
    return context;
};
