import { memo } from "react";
import { motion } from "framer-motion";
import { type Theme } from "@/types/Theme";
import "./Toast.scss";

export interface IToast {
  id?: string;
  title: string;
  desc: string;
  theme: Theme;
  duration?: number;
  timer?: ReturnType<typeof setTimeout>;
}

export default memo(function Toast({ title, desc, theme, duration }: IToast) {
  return (
    <div className={`toast toast--${theme}`}>
      <p className="toast__heading">{title}</p>
      <div className="toast__desc">{desc}</div>
      <motion.div
        className={`toast__timer toast__timer--${theme}`}
        initial={{ scaleX: 1 }}
        transition={{ duration: duration ?? 5 }}
        animate={{ scaleX: 0 }}
      />
    </div>
  );
});
