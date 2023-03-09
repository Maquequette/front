import Burger from "@/components/02 -  Molecules/Burger/Burger";
import Navlink from "@/components/01 - Atoms/Navlink/Navlink";
import Logo from "@/components/01 - Atoms/Logo/Logo";
import { useState } from "react";
import Svg from "@/components/01 - Atoms/Svg/Svg";
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
      <ul id="menu" className="nav__container">
        <li className="nav__item">
          <Navlink to="" theme="primary">
            <Svg id="home" />
          </Navlink>
        </li>
        <li className="nav__item">
          <Navlink to="" theme="primary">
            Challenges
          </Navlink>
        </li>
        <li className="nav__item">
          <Navlink to="" theme="primary">
            Lessons
          </Navlink>
        </li>
        <li className="nav__item">
          <Navlink to="" theme="primary">
            Classroom
          </Navlink>
        </li>
        <li className="nav__item">
          <Navlink to="" theme="primary">
            <Svg id="bell" />
          </Navlink>
        </li>
        <li className="nav__item">
          <Navlink to="" theme="primary">
            <Svg id="profile" />
          </Navlink>
        </li>
      </ul>
      <div className="nav__container">
        <ul id="tools">
          <li className="nav__item">
            <Navlink to="" theme="primary">
              Theme
            </Navlink>
          </li>
          <li className="nav__item">
            <Navlink to="" theme="primary">
              Langue
            </Navlink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
