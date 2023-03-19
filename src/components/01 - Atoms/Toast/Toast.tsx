import { Theme } from "@/types/Theme";
import { useEffect } from "react";
import "./Toast.scss";

export interface IToast {
  id: number;
  title: string;
  desc: string;
  theme: Theme;
  duration?: number;
  timer?: ReturnType<typeof setTimeout>;
}

export default function Toast({ title, desc, theme, timer }: IToast) {
  return (
    <div className={`toast toast--${theme}`}>
      <p className="toast__heading">{title}</p>
      <div className="toast__desc">{desc}</div>
    </div>
  );
}
