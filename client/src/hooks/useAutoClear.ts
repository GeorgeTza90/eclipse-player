import { useEffect } from "react";

export function useAutoClear<T>(
    value: T,
    setter: (val: T | string) => void,
    delay: number = 4000,
    specificValue?: T
): void{
    
    useEffect(() => {
        if (!value) return;
        const timer = setTimeout(() => setter(specificValue ?? ""), delay);
        return () => clearTimeout(timer);
    }, [value, setter, delay]);
}