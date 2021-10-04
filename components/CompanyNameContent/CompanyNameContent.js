import React from "react";
import { Button, TextInput } from "@codat/orchard-ui";
import "../../node_modules/@codat/orchard-ui/dist/index.css";
import s from "./CompanyNameContent.module.css";

export const CompanyNameContent = () => {
  return (
    <div className={s.inputContainer}>
      <TextInput
        id="company-name"
        label="Enter your company name"
        placeholder="e.g. Pete's Pies"
        value=""
      />
      <Button label="Next" className={s.button} onClick={() => null} />
    </div>
  );
};
