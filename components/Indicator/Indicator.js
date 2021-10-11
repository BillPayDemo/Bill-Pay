import { CheckIcon, IndicatorPill } from "@codat/orchard-ui";
import React from "react";
import s from "./Indicator.module.css";

export const Indicator = ({ status = "paid" }) => {
  return (
    <tr className={s.container}>
      {status === "paid" ? (
        <IndicatorPill color="#2AA24F" label="Paid" leftIcon={<CheckIcon />} />
      ) : (
        <IndicatorPill color="#3B8EDE" label="Pending" />
      )}
    </tr>
  );
};
