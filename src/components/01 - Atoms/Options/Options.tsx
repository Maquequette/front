import { MouseEventHandler, ReactNode, useState, memo } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import Checkbox from "../Checkbox/Checkbox";
import Svg from "../Svg/Svg";
import { Theme } from "@/types/Theme";
import "./Options.scss";

export interface IOptions {
  handleClick: MouseEventHandler;
  value: string | number;
  label: string;
  theme: Theme;
  hasCheckbox: boolean;
  classes?: string;
  isChecked?: boolean;
  children?: ReactNode;
}

export default memo(function Options({
  handleClick,
  value,
  label,
  theme,
  hasCheckbox,
  classes = "",
  isChecked,
  children
}: IOptions) {
  const [isClosed, setIsClosed] = useState<boolean>(false);

  return (
    <motion.div
      onClick={value ? handleClick : undefined}
      className={clsx("options", !value && "options__title", classes, isClosed && "close")}
      variants={{
        hidden: { opacity: 0, x: -100 },
        show: { opacity: 1, x: 0 }
      }}
      key={value}>
      <div className={clsx("options__content", !value && "options--title")}>
        {hasCheckbox && value && (
          <Checkbox name={label} value={value} theme={theme} isChecked={isChecked ?? false} />
        )}
        {label}
        {!value && (
          <button
            type="button"
            className="options__title__dropdown"
            onClick={() => setIsClosed(!isClosed)}>
            <Svg id="dropdown" />
          </button>
        )}
      </div>

      {children && (
        <motion.div
          className="options__title__children"
          animate={!isClosed ? "open" : "closed"}
          initial={false}
          exit="closed"
          variants={{
            open: { height: "auto" },
            closed: { height: "0" }
          }}
          transition={{
            type: "tween",
            duration: 0.3
          }}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
});
