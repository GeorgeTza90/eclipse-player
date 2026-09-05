import { useEffect } from "react";

export function useAutoClear<T>(
    value: T,
    setter: React.Dispatch<React.SetStateAction<T>>,
    clearValue: T,
    delay: number = 4000
): void {
    useEffect(() => {
        if (!value) return;

        const timer = setTimeout(() => {
            setter(clearValue);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, setter, clearValue, delay]);
}