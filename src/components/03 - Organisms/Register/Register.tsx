import { useCallback, useState, memo } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import MultiStepsForm from "@/components/02 - Molecules/MultiStepsForm/MultiStepsForm";
import Label from "@/components/01 - Atoms/Label/Label";
import Input from "@/components/01 - Atoms/Input/Input";
import Multiselect from "@/components/02 - Molecules/Multiselect/Multiselect";

import Tooltip from "@/components/01 - Atoms/Tooltip/Tooltip";
import useAuth from "@/hooks/useAuth";
import "./Register.scss";

export default memo(function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const { t } = useTranslation();

  const { onRegister } = useAuth();

  const submitRegister = useCallback(() => {
    onRegister({
      firstName,
      lastName,
      email,
      password,
      confirm_password: confirmPassword
    });
  }, [firstName, lastName, email, password, confirmPassword]);

  return (
    <div className="register">
      <div>
        <Heading tag="h1" level="secondary">
          {t("Create an account")}
        </Heading>

        <p className="register__subtitle">
          {t("Already have account ?")}
          <NavLink to={"#login"} style={{ padding: "0 0.5rem" }}>
            {" "}
            { }{" "}
          </NavLink>
        </p>
      </div>

      <MultiStepsForm
        handleSubmit={submitRegister}
        steps={[
          {
            btnText: t("Continue !"),
            stepSubmit: () => password === confirmPassword,
            formContent: (
              <div className="register__form">
                <div>
                  <Label name="email" required={true}>
                    {t("Email")}
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="example@mail.com..."
                    required={true}
                    value={email}
                    handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <Label
                    name="password"
                    required={true}
                    tooltip={
                      <Tooltip>
                        {t("Your password must contain :")}
                        <br />
                        <span
                          className={clsx(
                            /[A-Z]/.test(password) && "tooltip__popup__span--success"
                          )}>
                          **{t("At least one capital letter")}
                        </span>
                        <br />
                        <span
                          className={clsx(/\d/.test(password) && "tooltip__popup__span--success")}>
                          **{t("At least one number")}
                        </span>
                        <br />
                        <span
                          className={clsx(password.length >= 8 && "tooltip__popup__span--success")}>
                          **{t("At least 8 characters")}
                        </span>
                        <br />
                      </Tooltip>
                    }>
                    {t("Password")}
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="ABC123def456!?#"
                    required={true}
                    value={password}
                    pattern="^(?=.*[A-Z])(?=.*\d).{8,}$"
                    handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <Label name="confirmPassword" required={true}>
                    {t("Confirm password")}
                  </Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Password again"
                    required={true}
                    value={confirmPassword}
                    handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <div style={{ padding: "1rem 1.5rem" }}>
                    <p className="register__form__subtitle">
                      {t("By creating an account, you accept the")}
                    </p>
                    <NavLink to="/cgu" className="register__form__cgu">
                      {t("general condition of use")}
                    </NavLink>
                  </div>
                </div>
              </div>
            )
          },
          {
            btnText: t("Register !"),
            stepSubmit: () => true,
            formContent: (
              <div className="register__form">
                <div className="register__form__inline">
                  <div>
                    <Label name="firstName" required={true}>
                      {t("First Name")}
                    </Label>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      required={true}
                      value={firstName}
                      handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <Label name="lastName" required={true}>
                      {t("Last Name")}
                    </Label>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      required={true}
                      value={lastName}
                      handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Label name="profileType">{t("What type of profile are you ?")}</Label>
                  <Multiselect
                    callback={(value: any) => {

                    }}
                    options={[
                      { label: t("Student"), id: "student" },
                      { label: t("Developer"), id: "developer" },
                      { label: t("Web Designer"), id: "webdesigner" }
                    ]}
                    theme={"primary"}
                  />
                </div>
              </div>
            )
          }
        ]}
      />
    </div>
  );
});
