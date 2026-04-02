import { useEffect } from "react";

export function useAutoClear(value, setter, delay = 4000) {
  useEffect(() => {
    if (!value) return;

    const timer = setTimeout(() => setter(""), delay);

    return () => clearTimeout(timer); // cleanup if value changes
  }, [value, setter, delay]);
}