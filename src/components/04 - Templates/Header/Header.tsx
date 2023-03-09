import Container from "@/components/01 - Atoms/Container/Container";
import Navigation from "@/components/03 - Organisms/Navigation/Navigation";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <Container center={true} classes="header__container">
        <Navigation classes="header__navigation" />
      </Container>
    </header>
  );
}
