import React from 'react'
import { MouseEventHandler, CSSProperties, ReactNode } from "react";
import "./Dialog.scss";

export interface IDialog {
  id: string;
  children: ReactNode;
  handleClick?: MouseEventHandler;
  styles?: CSSProperties;
}

export default function Dialog({
  id,
  children,
  handleClick,
  styles
}: IDialog) {
  return (
    <dialog
      className="dialog"
      id={id}
      open
    >
      {children}
      <h1>my fav dialog</h1>
    </dialog>
  )
}
