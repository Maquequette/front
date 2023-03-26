import { useState } from "react";
import { delay, motion } from "framer-motion";
import Container from "@/components/01 - Atoms/Container/Container";
import Navigation from "@/components/03 - Organisms/Navigation/Navigation";
import Logo from "@/components/01 - Atoms/Logo/Logo";
import Burger from "@/components/02 -  Molecules/Burger/Burger";
import useDisableScroll from "@/hooks/useDisableScroll";
import "./Header.scss";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { enable, disable } = useDisableScroll();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      disable();
    } else {
      enable();
    }
  };

  return (
    <motion.header
      className={`header ${isOpen ? "header--open" : ""}`}
      initial={true}
      animate={isOpen ? "open" : "closed"}
      variants={{
        open: {
          height: "100vh"
        },
        closed: {
          height: "100%"
        }
      }}>
      <Container center={true} classes="header__container">
        <Logo />
        <Navigation isOpen={isOpen} />
        <Burger isOpen={isOpen} handleClick={toggleOpen} />
      </Container>
    </motion.header>
  );
}
