import React from 'react'
import { MouseEventHandler, CSSProperties, ReactNode } from "react";
import "./Dialog.scss";

// export interface IDialog {
//     id: String;
//     children: ReactNode;
//     handleClick?: MouseEventHandler;
//     styles?: CSSProperties;
// }

export default function Dialog() {
  return (
    <dialog 
        className="dialog"
        id="favDialog"
        open>

        <h1>my fav dialog</h1>
    </dialog>
  )
}
