import { easeIn, motion } from "framer-motion";
import { ReactNode } from "react";
import "./PageTransition.scss";

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        className="transition"
        animate="animate"
        initial="initial"
        transition={easeIn}
        variants={{
          initial: {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
          },
          animate: {
            clipPath: [
              "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
              "polygon(0 0, 50% 0%, 50% 100%, 0 100%)",
              "polygon(0 0, 100% 0%, 100% 100%, 0 100%)",
              "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
            ],
            transition: {
              duration: 1,
              ease: "easeInOut"
            }
          }
        }}></motion.div>
      {children}
    </>
  );
}
