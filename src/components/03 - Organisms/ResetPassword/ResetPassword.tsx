import { memo } from "react";
import { useTranslation } from "react-i18next";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import "./ResetPassword.scss";

export default memo(function ResetPassword() {
  const { t } = useTranslation();
  return (
    <div className="pswdForgotten">
      <div>
        <Heading tag="h1" level="secondary">
          {t("Forgot your password ? No worries !")}
        </Heading>

        <p className="login__subtitle">
          {t("Remember everything ?")}
          <button type="button" style={{ padding: "0 0.5rem" }} onClick={() => {}}>
            {t("Log in here")}
          </button>
        </p>
      </div>
    </div>
  );
});
