import { motion } from "framer-motion";
import Navlink from "@/components/01 - Atoms/Navlink/Navlink";
import Tools from "@/components/03 - Organisms/Tools/Tools";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Dropdown from "@/components/01 - Atoms/Dropdown/Dropdown";
import Badge from "@/components/01 - Atoms/Badge/Badge";
import useMediaQuery from "@/hooks/useMediaQuery";
import "./Navigation.scss";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function Navigation({ isOpen, callback = () => { } }: { isOpen?: boolean, callback?: Function }) {
  const isDesktop = useMediaQuery("(min-width: 64em)");

  const navItem = {
    closed: { opacity: 0, x: "-100rem", transition: { duration: isDesktop ? 0 : 0.2 } },
    open: { opacity: 1, x: 0, transition: { duration: isDesktop ? 0 : 1 } }
  };

  const isLoggedIn = false
  const location = useLocation()

  const { setModalAuth } = useContext(AuthContext)

  return (
    <motion.nav
      className="nav"
      animate={isOpen || isDesktop ? "open" : "closed"}
      initial={false}
      variants={{
        open: {
          opacity: 1
        },
        closed: {
          opacity: 0
        }
      }}>
      <motion.ul
        className="nav__container"
        animate={isOpen || isDesktop ? "open" : "closed"}
        initial={false}
        transition={{ staggerChildren: isDesktop ? 0 : 0.1 }}>
        <motion.li className="nav__item" variants={navItem}>
          <Navlink to="/" theme="primary" icon={<Svg id="home" />} clickCallback={() => { callback() }}>
            Home
          </Navlink>
        </motion.li>
        <motion.li className="nav__item" variants={navItem}>
          <Navlink to="/challenges" theme="primary" clickCallback={() => { callback() }}>
            Challenges
          </Navlink>
        </motion.li>
        <motion.li className="nav__item" variants={navItem}>
          <Navlink to="/lessons" theme="primary" clickCallback={() => { callback() }}>
            Lessons
          </Navlink>
        </motion.li>
        {!isLoggedIn
          ?
          <motion.li className="nav__item" variants={navItem}>
            <Navlink
              to={location.pathname}
              theme="primary"
              clickCallback={() => {
                callback()
                setModalAuth(true)
              }}>
              Log in /Sign in
            </Navlink>
          </motion.li>
          :
          <>
            <motion.li className="nav__item" variants={navItem}>
              <Navlink to="/classroom" theme="primary" clickCallback={() => { callback() }}>
                Classroom
              </Navlink>
            </motion.li>

            <motion.li className="nav__item" variants={navItem}>
              <Navlink
                to="/notification"
                theme="primary"
                icon={<Svg id="bell" />}
                badge={<Badge theme="primary">1</Badge>}
                clickCallback={() => { callback() }}
              >
                Notifications
              </Navlink>
            </motion.li>
            <motion.li className="nav__item" variants={navItem}>
              <Dropdown
                styles={{ border: "1px solid var(--primary)", borderRadius: "inherit" }}
                component={<Svg id="profile" />}
                options={[
                  {
                    component: (
                      <Navlink to="/profil" theme="primary" clickCallback={() => { callback() }}>
                        Profile
                      </Navlink>
                    )
                  },
                  {
                    component: (
                      <Navlink to="/profil/settings" theme="primary" clickCallback={() => { callback() }}>
                        Settings
                      </Navlink>
                    )
                  }
                ]}
              />
            </motion.li>
          </>
        }
      </motion.ul>
      <Tools />
    </motion.nav>
  );
}
