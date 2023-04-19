import { ReactNode } from "react";
import { motion } from "framer-motion";
import Sprites from "../../../assets/images/sprites.svg";
import "./Learn.scss";

export interface ILearn {
  children: ReactNode;
}
export default function Learn({ children }: ILearn) {
  return (
    <span className="learn">
      {children}
      <motion.svg
        initial={{ zIndex: 1 }}
        drag={true}
        dragSnapToOrigin={true}
        className="sprites"
        dragElastic={0.2}
        whileDrag={{
          zIndex: 999
        }}>
        <use xlinkHref={`${Sprites}#glass`}></use>
      </motion.svg>
    </span>
  );
}
