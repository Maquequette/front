import Burger from "@/components/02 -  Molecules/Burger/Burger";
import Navlink from "@/components/01 - Atoms/Navlink/Navlink";
import Logo from "@/components/01 - Atoms/Logo/Logo";
import ThemeSwapper from "@/components/01 - Atoms/ThemeSwapper/ThemeSwapper";
import { useState } from "react";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import "./Navigation.scss";

export default function Navigation({ classes }: { classes?: String }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    console.log("rer");
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className={`nav ${classes} ${isOpen ? "nav--open" : ""}`}>
      <div className="nav__logo">
        <Logo />
      </div>
      <ul id="menu" className="nav__container">
        <li className="nav__item">
          <Navlink to="" theme="primary" icon={true}>
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
          <Navlink to="" theme="primary" icon={true}>
            <Svg id="bell" />
          </Navlink>
        </li>
        <li className="nav__item">
          <Navlink to="" theme="primary" icon={true}>
            <Svg id="profile" />
          </Navlink>
        </li>
      </ul>
      <div className="nav__container">
        <ul id="tools">
          <li className="nav__item">
            <ThemeSwapper />
          </li>
          <li className="nav__item">
            <Navlink to="" theme="primary" icon={true}>
              <Svg id="worldwide" />
            </Navlink>
          </li>
        </ul>
      </div>
      <Burger handleClick={toggleOpen} />
    </nav>
  );
}
