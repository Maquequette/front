import { useState } from "react";
import Container from "@/components/01 - Atoms/Container/Container";
import Navigation from "@/components/03 - Organisms/Navigation/Navigation";
import Logo from "@/components/01 - Atoms/Logo/Logo";
import Burger from "@/components/02 -  Molecules/Burger/Burger";
import ThemeSwapper from "@/components/01 - Atoms/ThemeSwapper/ThemeSwapper";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import "./Header.scss";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <header className="header">
      <Logo />
      <Container center={true} classes="header__container">
        <Navigation classes="header__navigation" />
      </Container>
      <ul id="tools">
        <li className="tools__item">
          <ThemeSwapper />
        </li>
        <li className="tools__item">
          <Svg id="worldwide" />
        </li>
      </ul>
      <Burger handleClick={toggleOpen} />
    </header>
  );
}
