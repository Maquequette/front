import { memo } from "react";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import "./ResetPassword.scss";

export default memo(function ResetPassword() {
  return (
    <div className="pswdForgotten">
      <div>
        <Heading tag="h1" level="secondary">
          Forgot your password ? No worries !
        </Heading>

        <p className="login__subtitle">
          remember everything ?
          <button type="button" style={{ padding: "0 0.5rem" }} onClick={() => {}}>
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
});
