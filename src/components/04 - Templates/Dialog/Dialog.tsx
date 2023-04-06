import React, { MouseEventHandler, CSSProperties, ReactNode } from "react";
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
      <div
        className="dialog__content"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>
  );
}
