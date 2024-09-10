import { useEffect, useState } from "react";

export function useDelay(time: number) {
  const [delay, setDelay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setDelay(false), time);
    return () => clearTimeout(timer);
  }, []);
  return delay;
}
