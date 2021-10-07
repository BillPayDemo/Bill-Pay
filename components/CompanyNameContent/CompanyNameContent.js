import React from "react";
import { Button, TextInput, Typography } from "@codat/orchard-ui";
import "../../node_modules/@codat/orchard-ui/dist/index.css";
import s from "./CompanyNameContent.module.css";

export const CompanyNameContent = () => {
  const [companyNameValue, setCompanyNameValue] = React.useState("");

  return (
    <div>
      <Typography variant="h2">Enter your company name</Typography>
      <div className={s.inputContainer}>
        <div className={s.textInputContainer}>
          <TextInput
            id="company-name"
            placeholder="e.g. Pete's Pies"
            value={companyNameValue}
            onChange={(event) => setCompanyNameValue(event.target.value)}
          />
        </div>
        <div>
          <Button label="Next" className={s.button} onClick={() => null} />
        </div>
      </div>
    </div>
  );
};
