import React from "react";
import { Button, TextInput } from "@codat/orchard-ui";
import "../../node_modules/@codat/orchard-ui/dist/index.css";
import s from "./CompanyNameContent.module.css";
import axios from "axios";

export const CompanyNameContent = () => {
  const [companyNameValue, setCompanyNameValue] = React.useState("");
  const handleCreateCompany = () => {
    if (companyNameValue !== "") {
      axios.post("/api/company", { companyName: companyNameValue });
    } else {
      return null;
    }
  };

  return (
    <div className={s.inputContainer}>
      <TextInput
        id="company-name"
        label="Enter your company name"
        placeholder="e.g. Pete's Pies"
        value={companyNameValue}
        onChange={(event) => setCompanyNameValue(event.target.value)}
      />
      <Button label="Next" className={s.button} onClick={handleCreateCompany} />
    </div>
  );
};
