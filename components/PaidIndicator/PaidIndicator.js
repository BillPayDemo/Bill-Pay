import { CheckIcon, IndicatorPill } from "@codat/orchard-ui";
import React from "react";
import s from "./PaidIndicator.module.css";

export const PaidIndicator = () => {
  return (
    <div className={s.container}>
      <IndicatorPill color="#2AA24F" label="Paid" leftIcon={<CheckIcon />} />
    </div>
  );
};
