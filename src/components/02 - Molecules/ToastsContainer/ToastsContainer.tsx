import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Toast from "@/components/01 - Atoms/Toast/Toast";
import { ToastContext } from "@/contexts/ToastContext";
import { IToast } from "@/components/01 - Atoms/Toast/Toast";
import "./ToastsContainer.scss";

export default function ToastsContainer() {
  const [toasts, setToasts] = useState<Array<IToast>>([]);
  const { pushToastRef } = useContext(ToastContext);
  pushToastRef.current = ({ duration, title, desc, theme }: IToast) => {
    const id = crypto.randomUUID();

    const timer = setTimeout(() => {
      setToasts((v) => v.filter((t) => t.id !== id));
    }, (duration ?? 5) * 1000);

    const toast = { title, id, timer, desc, theme, duration };
    setToasts((v) => [...v, toast]);
  };

  const onRemove = (toast: IToast) => {
    clearTimeout(toast.timer);
    setToasts((v) => v.filter((t) => t !== toast));
  };

  return (
    <div className="toasts">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            onClick={() => onRemove(toast)}
            key={toast.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}>
            <Toast {...toast} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
