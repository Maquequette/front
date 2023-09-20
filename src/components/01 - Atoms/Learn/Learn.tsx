import { type ReactNode, memo } from "react";
import { motion } from "framer-motion";
import Sprites from "../../../assets/images/sprites.svg";
import "./Learn.scss";

export interface ILearn {
  children: ReactNode;
  hasGlass?: boolean;
}
export default memo(function Learn({ children, hasGlass }: ILearn) {
  return (
    <span className="learn">
      {children}
      {hasGlass && (
        <motion.div
          className="learn__icon"
          initial={{ zIndex: 1 }}
          drag={true}
          dragSnapToOrigin={true}
          dragElastic={0.2}
          whileDrag={{
            zIndex: 9999
          }}>
          <svg className="sprites">
            <use xlinkHref={`${Sprites}#glass`}></use>
          </svg>
        </motion.div>
      )}
    </span>
  );
});
