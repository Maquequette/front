import ToastsContainer from "@/components/02 -  Molecules/ToastsContainer/ToastsContainer";
import { createContext, MutableRefObject, useRef } from "react";

export interface IToastContext {
  pushToastRef: MutableRefObject<Function>;
}

export const ToastContext = createContext<IToastContext>(null!);

export function ToastProvider({ children }: { children: JSX.Element }) {
  const pushToastRef = useRef(() => {});

  return (
    <ToastContext.Provider value={{ pushToastRef }}>
      {children}
      <ToastsContainer />
    </ToastContext.Provider>
  );
}
