import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import ToastContainer from "../components/ui/toasts/ToastContainer";

const ToastContext = createContext(undefined);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const timeoutsRef = useRef(new Map());

    const showToast = useCallback((message, type = "info", duration = 5000) => {
        const id = `${Date.now()}-${Math.random()}`;
        setToasts(prev => {
            if (prev.length >= 5) return prev;
            return [...prev, { id, message, type }];
        });

        const timeout = setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
            timeoutsRef.current.delete(id);
        }, duration);

        timeoutsRef.current.set(id, timeout);
    }, []);

    const closeToast = useCallback((id) => {
        const timeout = timeoutsRef.current.get(id);

        if (timeout) {
            clearTimeout(timeout);
            timeoutsRef.current.delete(id);
        }

        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);
    

    useEffect(() => {
        return () => timeoutsRef.current.forEach(clearTimeout);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer toasts={toasts} closeToast={closeToast}/>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error( "useToast must be used within ToastProvider");
    return context;
};