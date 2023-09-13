import { FormEvent, ReactNode, useState, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/01 - Atoms/Button/Button";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import "./MultiStepsForm.scss";

export interface IMultiStepsForm {
  steps: Array<IOneStepForm>;
  handleSubmit?: Function;
  onStepChange?: Function;
  id?: String;
}

export interface IOneStepForm {
  formContent: ReactNode;
  btnText: String;
  stepSubmit: Function;
}

export default memo(function MultiStepsForm({
  steps,
  handleSubmit = () => { },
  onStepChange = () => { },
  id
}: IMultiStepsForm) {
  const [lastStep, setLastStep] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (steps[currentStep]?.stepSubmit()) {
      currentStep < steps.length - 1 ? changeStep(1) : handleSubmit()
    }
  };

  const changeStep = (i: number) => {
    setLastStep(currentStep);
    setCurrentStep(currentStep + i);
    onStepChange(currentStep + i);
  };

  return (
    <form className="multiForm" onSubmit={submitForm}>
      <div className="multiForm__steps">
        {steps.map((step, i) => (
          <svg
            key={`stepLine-${i}-${id}`}
            width={`calc( (100% - 4rem)/${steps.length} - 1rem * ${steps.length - 1})`}
            height="10px"
            xmlns="http://www.w3.org/2000/svg"
            className={`fill--darkGrey ${currentStep >= i ? "active" : currentStep < lastStep ? "reverse" : ""
              }`}>
            <g id={`${i}`}>
              <rect
                x="0"
                y="calc(50% - 2px)"
                width="calc(100% - 5px)"
                height="4"
                className="stroke--light"
                strokeWidth="2px"
              />
              <circle cx="calc(100% - 5px)" cy="50%" r="5" className="stroke--light" />
              <rect x="calc(100% - 11px)" y="calc(50% - 1px)" width="2" height="2" />
            </g>

            <clipPath className="clipPath" id={`clipPath-${i}`}>
              <rect x="0" y="0" height="10" />
            </clipPath>

            <use clipPath={`url(#clipPath-${i})`} href={`#${i}`} className="fill--primary" />
          </svg>
        ))}

        <div className="multiForm__steps__endline"></div>
      </div>

      <div className="multiForm__content">
        <AnimatePresence mode="wait">
          <motion.div
            className="full"
            key={`stepContent-${currentStep}-${id}`}
            initial={{ y: 10, opacity: 0, height: "30rem" }}
            animate={{ y: 0, opacity: 1, height: "auto" }}
            exit={{ y: -5, opacity: 0, height: "30rem" }}
            transition={{ duration: 0.2 }}>
            {steps[currentStep].formContent}
          </motion.div>
        </AnimatePresence>

        <div className="multiForm__content__buttons">
          {currentStep > 0 && (
            <button
              type="button"
              className="multiForm__content__buttons__back"
              onClick={() => changeStep(-1)}>
              <Svg id="back" styles={{ width: "2rem", height: "2rem" }} />
            </button>
          )}

          <Button type="submit" theme={"primary"}>
            <Svg
              id="arrow"
              styles={{ width: "4.5rem", height: "3.3rem", strokeWidth: "initial" }}
            />
            {steps[currentStep].btnText}
          </Button>
        </div>
      </div>
    </form>
  );
});
