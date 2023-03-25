import { motion } from "framer-motion";
import Navlink from "@/components/01 - Atoms/Navlink/Navlink";
import Tools from "@/components/03 - Organisms/Tools/Tools";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import "./Navigation.scss";

export default function Navigation({ isOpen }: { isOpen?: boolean }) {
  return (
    <nav className="nav">
      <motion.ul
        className="nav__container"
        initial={true}
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: { opacity: 0, y: -10 },
          open: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}>
        <li className="nav__item">
          <Navlink to="/" theme="primary" icon={true}>
            <Svg id="home" />
          </Navlink>
        </li>
        <li className="nav__item">
          <Navlink to="/challenges" theme="primary">
            Challenges
          </Navlink>
        </li>
        <li className="nav__item">
          <Navlink to="/lessons" theme="primary">
            Lessons
          </Navlink>
        </li>
        <li className="nav__item">
          <Navlink to="/classroom" theme="primary">
            Classroom
          </Navlink>
        </li>
        <li className="nav__item">
          <Navlink to="" theme="primary" icon={true}>
            <Svg id="bell" />
          </Navlink>
        </li>
        <li className="nav__item">
          <Navlink to="" theme="primary" icon={true}>
            <Svg id="profile" />
          </Navlink>
        </li>
      </motion.ul>
      <Tools />
    </nav>
  );
}
