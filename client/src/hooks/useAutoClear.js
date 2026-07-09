import { useEffect } from "react";

export function useAutoClear(value, setter, delay = 4000, specificValue) {
    useEffect(() => {
        if (!value) return;

        const timer = setTimeout(() => setter(specificValue ? specificValue : ""), delay);

        return () => clearTimeout(timer);
    }, [value, setter, delay]);
}