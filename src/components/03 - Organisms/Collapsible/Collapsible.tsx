import { ReactNode, useCallback, useState, memo } from "react";
import { motion } from "framer-motion";
import { Theme } from "@/types/Theme";
import "./Collapsible.scss";

export interface ICollapsible {
  theme: Theme;
  children: ReactNode;
}

export default memo(function Collapsible({ theme, children }: ICollapsible) {
  const [isOpen, setIsOpen] = useState(true);

  const handleCollapse = useCallback(
    (open: boolean) => {
      setIsOpen(open);
    },
    [isOpen]
  );

  return (
    <motion.div
      className={`collapsible collapsible--${theme}`}
      animate={isOpen ? "open" : "closed"}
      initial={false}
      exit="closed"
      variants={{
        open: { height: "auto" },
        closed: { height: "10rem" }
      }}>
      <div className="collapsible__header">
        <button className="collapsible__open" onClick={() => handleCollapse(true)} />
        <button className="collapsible__close" onClick={() => handleCollapse(false)} />
      </div>
      <motion.div
        className="collapsible__body"
        variants={{
          open: { opacity: 1 },
          closed: { opacity: 0 }
        }}>
        {children}
      </motion.div>
    </motion.div>
  );
});
