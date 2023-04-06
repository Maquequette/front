import { CSSProperties, ReactNode } from "react";
import { motion, transform } from "framer-motion";
import "./Dialog.scss";

export interface IDialog {
  id: string;
  children: ReactNode;
  visible: boolean;
  Dismiss: Function;
  styles?: CSSProperties;
}

export default function Dialog({ id, children, visible = false, Dismiss, styles }: IDialog) {
  const backdropCloseModal = (e: React.MouseEvent<HTMLDialogElement>) => {
    Dismiss();
  };

  return (
    <dialog className="dialog" id={id} open={visible} onClick={backdropCloseModal}>
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
    </dialog>
  );
}
