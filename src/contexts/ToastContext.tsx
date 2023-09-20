import { createContext, type MutableRefObject, useRef, memo } from "react";
import ToastsContainer from "@/components/02 - Molecules/ToastsContainer/ToastsContainer";

export interface IToastContext {
  pushToastRef: MutableRefObject<any>;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
