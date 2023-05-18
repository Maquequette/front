import { createContext, MutableRefObject, useRef, memo } from "react";
import ToastsContainer from "@/components/02 - Molecules/ToastsContainer/ToastsContainer";

export interface IToastContext {
  pushToastRef: MutableRefObject<Function>;
}

export const ToastContext = createContext<IToastContext>(null!);

const ToastProvider = memo(function ToastProvider({ children }: { children: JSX.Element }) {
  const pushToastRef = useRef(() => {});

  return (
    <ToastContext.Provider value={{ pushToastRef }}>
      {children}
      <ToastsContainer />
    </ToastContext.Provider>
  );
});

export { ToastProvider };
