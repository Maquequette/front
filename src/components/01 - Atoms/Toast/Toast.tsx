import { Theme } from "@/types/Theme";
import { motion } from "framer-motion";
import "./Toast.scss";

export interface IToast {
  id: string;
  title: string;
  desc: string;
  theme: Theme;
  duration?: number;
  timer?: ReturnType<typeof setTimeout>;
}

export default function Toast({ title, desc, theme, duration }: IToast) {
  return (
    <div className={`toast toast--${theme}`}>
      <p className="toast__heading">{title}</p>
      <div className="toast__desc">{desc}</div>
      <motion.div
        className={`toast__timer toast__timer--${theme}`}
        initial={{ width: "100%" }}
        transition={{ duration: duration ?? 5 }}
        animate={{ width: 0 }}></motion.div>
    </div>
  );
}
