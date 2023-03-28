import { useCallback } from "react";
export default function useDisableScroll() {
  return {
    disable: useCallback(() => {
      document.body.style.overflow = "hidden";
    }, []),
    enable: useCallback(() => {
      document.body.style.overflow = "unset";
    }, [])
  };
}
