import { MouseEventHandler, ReactNode } from "react";
import { motion } from "framer-motion";
import Checkbox from "../Checkbox/Checkbox";
import { Theme } from "@/types/Theme";
import "./Options.scss";
import clsx from "clsx";

export interface IOptions {
  handleClick: MouseEventHandler;
  value: string | number;
  label: string;
  theme: Theme;
  hasCheckbox: boolean;
  classes?: string;
  isChecked?: boolean;
}

export default function Options({
  handleClick,
  value,
  label,
  theme,
  hasCheckbox,
  classes = '',
  isChecked
}: IOptions) {
  return (
    <motion.div
      onClick={value ? handleClick : undefined}
      className={clsx('options', !value && 'options__title', classes)}
      variants={{
        hidden: { opacity: 0, x: -100 },
        show: { opacity: 1, x: 0 }
      }}
      key={value}>
      {hasCheckbox && value && (
        <Checkbox name={label} value={value} theme={theme} isChecked={isChecked ?? false} />
      )}
      {label}
    </motion.div>
  );
}
