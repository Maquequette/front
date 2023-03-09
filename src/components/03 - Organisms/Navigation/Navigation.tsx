import Burger from "@/components/02 -  Molecules/Burger/Burger";
import Navlink from "@/components/01 - Atoms/Navlink/Navlink";
import Logo from "@/components/01 - Atoms/Logo/Logo";
import { useState } from "react";
import "./Navigation.scss";

export default function Navigation({ classes }: { classes?: String }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className={`nav ${classes}`}>
      <div className="nav__logo">
        <Logo />
      </div>
      <div className="nav__menu">
        <Navlink to="" theme="primary">
          Home
        </Navlink>
        <Navlink to="" theme="primary">
          Challenges
        </Navlink>
        <Navlink to="" theme="primary">
          Lessons
        </Navlink>
        <Navlink to="" theme="primary">
          Classroom
        </Navlink>
        <Navlink to="" theme="primary">
          notification
        </Navlink>
        <Navlink to="" theme="primary">
          Profil
        </Navlink>
      </div>
      <div className="nav__tools">
        <Navlink to="" theme="primary">
          Theme
        </Navlink>
        <Navlink to="" theme="primary">
          Langue
        </Navlink>
      </div>
    </nav>
  );
}
