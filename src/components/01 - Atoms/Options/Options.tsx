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
}

export default function Options({ handleClick, value, label, theme, hasCheckbox }: IOptions) {
  return (
    <motion.div
      onClick={handleClick}
      className="options"
      variants={{
        hidden: { opacity: 0, x: -100 },
        show: { opacity: 1, x: 0 }
      }}
      key={value}>
      {hasCheckbox && <Checkbox value={value} theme={theme} isChecked={true} />}
      {label}
    </motion.div>
  );
}
