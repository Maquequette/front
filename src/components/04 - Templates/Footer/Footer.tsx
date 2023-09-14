import { memo } from "react";
import { useTranslation } from "react-i18next";
import Container from "@/components/01 - Atoms/Container/Container";
import Logo from "@/components/01 - Atoms/Logo/Logo";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Paragraph from "@/components/01 - Atoms/Paragraph/Paragraph";
import "./Footer.scss";

export default memo(function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <Container center={true} isLarge={true} classes="footer__header">
        <div className="footer__logo">
          <Logo />
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
            <Paragraph color="secondary">© Mac & Kate - {new Date().getFullYear()}</Paragraph>
          </div>
          <ul className="footer__sitemap">
            <li className="footer__link">{t("TERMS")}</li>
            <li className="footer__link">{t("COOKIE POLICY")}</li>
            <li className="footer__link">{t("PRIVACY POLICY")}</li>
            <li className="footer__link">{t("LICENSE")}</li>
          </ul>
        </Container>
      </div>
    </footer>
  );
});
