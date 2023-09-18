import { useTranslation } from "react-i18next";
import Heading from "../Heading/Heading";
import Paragraph from "../Paragraph/Paragraph";
import Svg from "../Svg/Svg";
import "./Pricing.scss";

export default function Pricing() {
  const { t } = useTranslation();

  return (
    <div className="pricing">
      <Heading tag="h2" level="primary" color="dark">
        {t("Select a membership level the right price for you.")}
      </Heading>
      <div className="pricing__content">
        <Heading tag="h3" level="primary">
          {t("Free")}
        </Heading>
        <Heading tag="h3" level="primary" data-position="2">
          {t("Premium")}
        </Heading>
        <div className="pricing__label">
          <Paragraph>Paragraph</Paragraph>
        </div>
        <div className="pricing__check">
          <Svg id="check"></Svg>
        </div>
        <div className="pricing__check">
          <Svg id="check"></Svg>
        </div>
        <div className="pricing__label">
          <Paragraph>Paragraph</Paragraph>
        </div>
        <div className="pricing__check">
          <Svg id="check"></Svg>
        </div>
        <div className="pricing__check">
          <Svg id="notCheck"></Svg>
        </div>
        <div className="pricing__label">
          <Paragraph>Paragraph</Paragraph>
        </div>
        <div className="pricing__check">
          <Svg id="check"></Svg>
        </div>
        <div className="pricing__check">
          <Svg id="notCheck"></Svg>
        </div>
        <div className="pricing__label">
          <Paragraph>Paragraph</Paragraph>
        </div>
        <div className="pricing__check">
          <Svg id="check"></Svg>
        </div>
        <div className="pricing__check">
          <Svg id="notCheck"></Svg>
        </div>
        <div className="pricing__label">
          <Paragraph>Paragraph</Paragraph>
        </div>
        <div className="pricing__check">
          <Svg id="check"></Svg>
        </div>
        <div className="pricing__check">
          <Svg id="notCheck"></Svg>
        </div>
      </div>
    </div>
  );
}
