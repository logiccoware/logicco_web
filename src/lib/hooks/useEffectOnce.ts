import { useEffect, useRef } from "react";

export const useEffectOnce = (callback: Function, when: any) => {
    const hasRunOnce = useRef(false);
    useEffect(() => {
      if (when && !hasRunOnce.current) {
        callback();
        hasRunOnce.current = true;
      }
    }, [when]);
  };