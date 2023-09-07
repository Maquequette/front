import { Dispatch, SetStateAction, useContext, useEffect, memo } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navlink from "@/components/01 - Atoms/Navlink/Navlink";
import Tools from "@/components/03 - Organisms/Tools/Tools";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Dropdown from "@/components/01 - Atoms/Dropdown/Dropdown";
import { AuthContext } from "@/contexts/AuthContext";
import useMediaQuery from "@/hooks/useMediaQuery";
import useAuth from "@/hooks/useAuth";
import "./Navigation.scss";

export interface INavigation {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default memo(function Navigation({ isOpen }: INavigation) {
  const isDesktop = useMediaQuery("(min-width: 64em)");
  const location = useLocation();
  const { t } = useTranslation();

  const navItem = {
    closed: { opacity: 0, x: "-100rem", transition: { duration: isDesktop ? 0 : 0.2 } },
    open: { opacity: 1, x: 0, transition: { duration: isDesktop ? 0 : 1 } }
  };

  const { onLogout } = useAuth();
  const { modalAuth, setModalAuth, isConnected } = useContext(AuthContext);

  useEffect(() => {
    if (location.hash === "#login" || location.hash === "#register") {
      setModalAuth(true);
    }
  }, [location]);

  return (
    <motion.nav
      className={`nav ${isOpen ? "active" : ""}`}
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
            {t("Home")}
          </Navlink>
        </motion.li>
        <motion.li className="nav__item" variants={navItem}>
          <Navlink to="/challenges" theme="primary">
            {t("Challenges")}
          </Navlink>
        </motion.li>
        <motion.li className="nav__item" variants={navItem}>
          <Navlink to="/lessons" theme="primary">
            {t("Lessons")}
          </Navlink>
        </motion.li>
        {!isConnected ? (
          <motion.li className="nav__item" variants={navItem}>
            <Navlink to="#login" theme="primary" id="connection">
              {t("Log in / Sign in")}
            </Navlink>
          </motion.li>
        ) : (
          <>
            <motion.li className="nav__item" variants={navItem}>
              <Navlink to="/classroom" theme="primary">
                {t("Classroom")}
              </Navlink>
            </motion.li>

            {/* <motion.li className="nav__item" variants={navItem}>
              <Navlink
                to="/notification"
                theme="primary"
                icon={<Svg id="bell" />}
                badge={<Badge theme="primary">1</Badge>}>
                Notifications
              </Navlink>
            </motion.li> */}
            <motion.li className="nav__item" variants={navItem}>
              <Dropdown
                styles={{ border: "1px solid var(--primary)", borderRadius: "inherit" }}
                component={<Svg id="profile" />}
                options={[
                  {
                    component: (
                      <Navlink to="/profil" theme="primary">
                        {t("Profile")}
                      </Navlink>
                    )
                  },
                  {
                    component: (
                      <Navlink to="/profil/settings" theme="primary">
                        {t("Settings")}
                      </Navlink>
                    )
                  },
                  {
                    component: (
                      <Navlink to="/logout" theme="primary" onclick={() => {
                        onLogout({
                          refresh_token: localStorage.getItem("refresh_token")!
                        })
                      }}>
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
});
