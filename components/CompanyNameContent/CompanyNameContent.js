import React from "react";
import { Button, TextInput, Typography } from "@codat/orchard-ui";
import "../../node_modules/@codat/orchard-ui/dist/index.css";
import s from "./CompanyNameContent.module.css";
import axios from "axios";

export const CompanyNameContent = () => {
  const [companyNameValue, setCompanyNameValue] = React.useState("");
  const handleCreateCompany = () => {
    if (companyNameValue !== "") {
      const results = axios.post("/api/company", {
        companyName: companyNameValue,
      });
      results.then(function (result) {
        sessionStorage.setItem("companyId", result.data.id);
        window.location.href = result.data.redirect;
      });
    } else {
      return null;
    }
  };

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
          <Button
            label="Next"
            className={s.button}
            onClick={handleCreateCompany}
          />
        </div>
      </div>
    </div>
  );
};
