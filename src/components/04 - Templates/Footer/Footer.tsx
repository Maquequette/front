import Container from "@/components/01 - Atoms/Container/Container";
import Logo from "@/components/01 - Atoms/Logo/Logo";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Paragraph from "@/components/01 - Atoms/Paragraph/Paragraph";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <Container center={true} isLarge={true} classes="footer__header">
        <div className="footer__logo">
          <Logo name="aquequette" />
        </div>
        <div className="footer__reseau">
          <Svg id="twitter" />
          <Svg id="facebook" />
          <Svg id="linkedin" />
        </div>
      </Container>
      <div className="footer__body">
        <Container center={true} isLarge={true}>
          <div className="footer__copyright">
            <Paragraph color="secondary">© MAQUEQUETTE - 2023</Paragraph>
          </div>
          <ul className="footer__sitemap">
            <li className="footer__link">TERMS</li>
            <li className="footer__link">COOKIE POLICY</li>
            <li className="footer__link">PRIVACY POLICY</li>
            <li className="footer__link">LICENSE</li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
