import React from "react";
import { Button } from "@codat/orchard-ui";
import s from "./PayButton.module.css";

export const PayButton = () => {
  return <Button label="Pay" className={s.buttonText} />;
};
