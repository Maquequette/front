import { ReactNode } from "react";
import { motion } from "framer-motion";
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
        onDrag={(event, info) => console.log(document.elementFromPoint(info.point.x, info.point.y))}
        whileDrag={{
          zIndex: 999
        }}>
        <use xlinkHref="./sprites.svg#glass"></use>
      </motion.svg>
    </span>
  );
}
