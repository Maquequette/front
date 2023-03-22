import Burger from "@/components/02 -  Molecules/Burger/Burger";
import Navlink from "@/components/01 - Atoms/Navlink/Navlink";
import Logo from "@/components/01 - Atoms/Logo/Logo";
import ThemeSwapper from "@/components/01 - Atoms/ThemeSwapper/ThemeSwapper";
import { useState } from "react";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import "./Navigation.scss";

export default function Navigation({ classes }: { classes?: String }) {
  return (
    <nav className="nav">
      <ul className="nav__container">
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
      </ul>
    </nav>
  );
}
