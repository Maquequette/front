import { type CSSProperties, type ReactNode, memo, useEffect } from "react";
import { motion } from "framer-motion";
import useDisableScroll from "@/hooks/useDisableScroll";
import "./Dialog.scss";

export interface IDialog {
  id: string;
  children: ReactNode;
  visible: boolean;
  Dismiss: () => void;
  styles?: CSSProperties;
}

export default memo(function Dialog({ id, children, visible = false, Dismiss, styles }: IDialog) {
  const { disable, enable } = useDisableScroll();
  const backdropCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    Dismiss();
  };

  useEffect(() => {
    visible ? disable() : enable();
  }, [visible]);

  return (
    <div
      className={`dialog ${visible ? "dialog--visible" : ""}`}
      id={id}
      onClick={backdropCloseModal}>
      <motion.div
        animate={visible ? "visible" : "hidden"}
        className="dialog__content"
        transition={{
          type: "spring",
          damping: 12
        }}
        variants={{
          visible: {
            scale: 1
          },
          hidden: {
            scale: 0
          }
        }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        {children}
      </motion.div>
    </div>
  );
});
