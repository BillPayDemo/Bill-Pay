import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { BootstrapInput } from "./AccountNameField.helpers";
import s from "./AccountNameField.module.css";

export const AccountNameField = ({ billData, accountData }) => {
  const [accountName, setAaccountName] = React.useState("");

  const handleChange = (event) => {
    setAaccountName(event.target.value);
  };

  const accountsFilteringConditions = (account) => {
    return (
      account.isBankAccount === true && billData.currency === account.currency
    );
  };

  const accountsFiltered = accountData.filter(accountsFilteringConditions);

  return (
    <FormControl sx={{ width: "100%" }} variant="outlined">
      <Select
        labelId="account-name-label"
        id="account-name"
        value={accountName}
        onChange={handleChange}
        displayEmpty
        input={<BootstrapInput />}
        renderValue={(value) => {
          if (value.length === 0) {
            return <div className={s.text}>Account</div>;
          }
          return value;
        }}
      >
        {accountsFiltered.map((account) => (
          <MenuItem key={account.accountName} value={account.accountName}>
            {account.accountName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
