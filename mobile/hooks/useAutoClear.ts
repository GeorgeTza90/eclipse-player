// hooks/useAutoClear.ts
import { useEffect, Dispatch, SetStateAction } from "react";

export function useAutoClear<T>(
    value: T,
    setter: Dispatch<SetStateAction<T>>,
    delay = 4000,
    specificValue?: T
) {
    useEffect(() => {
        if (!value) return;
        const timer = setTimeout(() => setter((specificValue !== undefined ? specificValue : "") as T), delay);
        return () => clearTimeout(timer);
    }, [value, setter, delay]);
}