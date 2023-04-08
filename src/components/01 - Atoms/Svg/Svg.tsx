import { CSSProperties } from "react";
import { motion } from "framer-motion";
import "./Svg.scss";

export interface ISvg {
  id: string;
  styles?: CSSProperties;
  isDragable?: boolean;
}

export default function Svg({ id, styles, isDragable }: ISvg) {
  return (
    <motion.svg drag={isDragable} className="sprites" style={styles} whileDrag={{ zIndex: 999 }}>
      <use xlinkHref={`./sprites.svg#${id}`}></use>
    </motion.svg>
  );
}
