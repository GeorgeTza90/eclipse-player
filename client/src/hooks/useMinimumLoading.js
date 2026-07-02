import { useEffect, useState } from "react";

export function useMinimumLoading(loading, minTime = 3000) {
  const [showLoading, setShowLoading] = useState(loading);

  useEffect(() => {
    let timer;

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