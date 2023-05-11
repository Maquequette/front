import { Dispatch, SetStateAction, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "@/contexts/AuthContext";
import useMediaQuery from "@/hooks/useMediaQuery";
import useAuth from "@/hooks/useAuth";
import Navlink from "@/components/01 - Atoms/Navlink/Navlink";
import Tools from "@/components/03 - Organisms/Tools/Tools";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Dropdown from "@/components/01 - Atoms/Dropdown/Dropdown";
import Badge from "@/components/01 - Atoms/Badge/Badge";
import "./Navigation.scss";

export interface INavigation {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Navigation({ isOpen }: INavigation) {
  const isDesktop = useMediaQuery("(min-width: 64em)");

  const navItem = {
    closed: { opacity: 0, x: "-100rem", transition: { duration: isDesktop ? 0 : 0.2 } },
    open: { opacity: 1, x: 0, transition: { duration: isDesktop ? 0 : 1 } }
  };

  const { onLogout } = useAuth();
  const { modalAuth, setModalAuth, isConnected } = useContext(AuthContext);

  return (
    <motion.nav
      className="nav"
      animate={isOpen || isDesktop ? "open" : "closed"}
      initial={false}
      transition={{
        height: {
          duration: 0
        }
      }}
      variants={{
        open: {
          opacity: 1,
          visibility: "visible"
        },
        closed: {
          opacity: 0,
          visibility: "hidden"
        }
      }}>
      <motion.ul
        className="nav__container"
        animate={isOpen || isDesktop ? "open" : "closed"}
        initial={false}
        transition={{ staggerChildren: isDesktop ? 0 : 0.1 }}>
        <motion.li className="nav__item" variants={navItem}>
          <Navlink to="/" theme="primary" icon={<Svg id="home" />}>
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
        {!isConnected() ? (
          <motion.li className="nav__item" variants={navItem}>
            <Navlink
              to="#login"
              theme="primary"
              classes={modalAuth ? "modalActive" : ""}
              id="connection">
              Log in /Sign in
            </Navlink>
          </motion.li>
        ) : (
          <>
            <motion.li className="nav__item" variants={navItem}>
              <Navlink to="/classroom" theme="primary">
                Classroom
              </Navlink>
            </motion.li>

            <motion.li className="nav__item" variants={navItem}>
              <Navlink
                to="/notification"
                theme="primary"
                icon={<Svg id="bell" />}
                badge={<Badge theme="primary">1</Badge>}>
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
                      <Navlink to="/profil" theme="primary">
                        Profile
                      </Navlink>
                    )
                  },
                  {
                    component: (
                      <Navlink to="/profil/settings" theme="primary">
                        Settings
                      </Navlink>
                    )
                  },
                  {
                    component: (
                      <Navlink to="/logout" theme="primary">
                        Log Out
                      </Navlink>
                    )
                  }
                ]}
              />
            </motion.li>
          </>
        )}
      </motion.ul>
      <Tools />
    </motion.nav>
  );
}
