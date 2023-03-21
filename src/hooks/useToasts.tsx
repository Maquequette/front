import { useCallback, useContext } from "react";
import { ToastContext } from "@/contexts/ToastContext";
import { IToast } from "@/components/01 - Atoms/Toast/Toast";

export default function useToasts() {
  const { pushToastRef } = useContext(ToastContext);
  return {
    pushToast: useCallback(
      (toast: IToast) => {
        pushToastRef.current(toast);
      },
      [pushToastRef]
    )
  };
}
