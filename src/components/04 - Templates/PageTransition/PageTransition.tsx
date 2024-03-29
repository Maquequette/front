import { type ReactNode, memo } from "react";
import { easeIn, motion } from "framer-motion";
import "./PageTransition.scss";

export default memo(function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        className="transition"
        animate="animate"
        initial={true}
        transition={easeIn}
        variants={{
          animate: {
            clipPath: [
              "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
              "polygon(0 0, 100% 0%, 100% 100%, 0 100%)",
              "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
            ],
            transition: {
              duration: 0.9,
              ease: "easeOut"
            }
          }
        }}></motion.div>
      {children}
    </>
  );
});
