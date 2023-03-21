import { MouseEventHandler, ReactNode } from "react";
import { motion } from "framer-motion";
import Checkbox from "../Checkbox/Checkbox";
import { Theme } from "@/types/Theme";
import "./Options.scss";

export interface IOptions {
  handleClick: MouseEventHandler;
  value: any;
  label: String;
  theme: Theme;
  hasCheckbox: boolean;
  isChecked?: boolean;
}

export default function Options({
  handleClick,
  value,
  label,
  theme,
  hasCheckbox,
  isChecked
}: IOptions) {
  return (
    <motion.div
      onClick={value ? handleClick : undefined}
      className={`options ${!value ? "options__title" : ""}`}
      variants={{
        hidden: { opacity: 0, x: -100 },
        show: { opacity: 1, x: 0 }
      }}
      key={value}>
      {hasCheckbox ||
        (!value && <Checkbox value={value} theme={theme} isChecked={isChecked ?? false} />)}
      {label}
    </motion.div>
  );
}
