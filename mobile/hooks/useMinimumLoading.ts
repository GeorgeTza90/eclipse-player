import { useEffect, useState } from "react";

export function useMinimumLoading(loading: boolean, minTime: number = 3000): boolean {
    const [showLoading, setShowLoading] = useState(loading);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (loading) {
            setShowLoading(true);
        } else {
            timer = setTimeout(() => {
                setShowLoading(false);
            }, minTime);
        }

        return () => clearTimeout(timer);
    }, [loading, minTime]);

    return showLoading;
}