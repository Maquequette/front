import { motion } from "framer-motion";
import Navlink from "@/components/01 - Atoms/Navlink/Navlink";
import Tools from "@/components/03 - Organisms/Tools/Tools";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import "./Navigation.scss";

export default function Navigation({ isOpen }: { isOpen?: boolean }) {
  const navItem = {
    closed: { opacity: 0, x: "-100rem", transition: { duration: 0.2 } },
    open: { opacity: 1, x: 0, transition: { duration: 1.3 } }
  };

  return (
    <motion.nav
      className="nav"
      animate={isOpen ? "open" : "closed"}
      variants={{
        open: { opacity: 1 },
        closed: { opacity: 0 }
      }}>
      <motion.ul
        className="nav__container"
        animate={isOpen ? "open" : "closed"}
        initial="closed"
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}>
        <motion.li className="nav__item" variants={navItem}>
          <Navlink to="/" theme="primary" icon={true}>
            <Svg id="home" />
            Home
          </Navlink>
        </motion.li>
        <motion.li className="nav__item" variants={navItem}>
          <Navlink to="/challenges" theme="primary">
            Challenges
          </Navlink>
        </motion.li>
        <motion.li className="nav__item" variants={navItem}>
          <Navlink to="/lessons" theme="primary">
            Lessons
          </Navlink>
        </motion.li>
        <motion.li className="nav__item" variants={navItem}>
          <Navlink to="/classroom" theme="primary">
            Classroom
          </Navlink>
        </motion.li>
        <motion.li className="nav__item" variants={navItem}>
          <Navlink to="" theme="primary" icon={true}>
            <Svg id="bell" />
            Notifications
          </Navlink>
        </motion.li>
        <motion.li className="nav__item" variants={navItem}>
          <Navlink to="" theme="primary" icon={true}>
            <Svg id="profile" />
            Profile
          </Navlink>
        </motion.li>
      </motion.ul>
      <Tools />
    </motion.nav>
  );
}
