import React from "react";
import { Checkbox, TextInput, Typography } from "@codat/orchard-ui";
import s from "./PayModalFields.module.css";
import { CardIcon } from "../../../../../../../CardIcon/CardIcon";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";

export const PayModalFields = ({ accountData }) => {
  const [cardNumberValue, setCardNumberValue] = React.useState("");
  const [expiryDateValue, setExpiryDateValue] = React.useState("");
  const [cvcValue, setCvcValue] = React.useState("");
  const [postcodeValue, setPostcodeValue] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const handleCheckboxClick = (event) => setChecked(event.target.checked);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: "white",
      border: "1px solid rgba(221,221,221,1)",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      "&:active": {
        borderRadius: 4,
        borderColor: "rgba(72,45,235,1)",
        boxShadow: "0 0 0 0.05rem rgba(72,45,235,1)",
      },
    },
  }));
  const accountsFilteringConditions = (account) => {
    return account.isBankAccount === true;
  };

  const accountsFiltered = accountData.filter(accountsFilteringConditions);
  console.log("all", accountData);
  console.log("filtered", accountsFiltered);

  return (
    <div className={s.topContainer}>
      <Typography variant="small" style={{ fontSize: "14px" }}>
        Account name
      </Typography>
      <FormControl sx={{ width: "100%" }} variant="outlined">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
          displayEmpty
          sx={{ width: "100%" }}
          input={<BootstrapInput />}
          renderValue={(value) => {
            if (value.length === 0) {
              return (
                <div style={{ color: "rgba(111, 116, 155, 1)" }}>Account</div>
              );
            }
            return value;
          }}
        >
          <MenuItem
            disabled
            value=""
            style={{ color: "rgba(111, 116, 155, 1)" }}
            selected
          >
            Account
          </MenuItem>
          {accountsFiltered.map((account) => (
            <MenuItem key={account}>{account.accountName}</MenuItem>
          ))}
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Typography
        variant="small"
        style={{ fontSize: "10px", marginBottom: "16px" }}
      >
        Choose your account to make your payment from
      </Typography>
      <TextInput
        id="card-number"
        label="Card number"
        placeholder="4242 4242 4242 4242"
        value={cardNumberValue}
        onChange={(event) => setCardNumberValue(event.target.value)}
        iconLeft={<CardIcon />}
      />
      <div className={s.inlineFields}>
        <TextInput
          id="expiry-date"
          label="Expiry date"
          placeholder="03 / 24"
          value={expiryDateValue}
          onChange={(event) => setExpiryDateValue(event.target.value)}
        />
        <TextInput
          id="cvc"
          label="CVC"
          placeholder="123"
          value={cvcValue}
          onChange={(event) => setCvcValue(event.target.value)}
        />
        <TextInput
          id="postcode"
          label="Postcode"
          placeholder="W1F 8WE"
          value={postcodeValue}
          onChange={(event) => setPostcodeValue(event.target.value)}
        />
      </div>
      <div className={s.checkboxRow}>
        <Checkbox
          id="checkbox"
          onChange={handleCheckboxClick}
          checked={checked}
        />
        <Typography variant="p" className={s.checkboxTypography}>
          Save card for future payments
        </Typography>
      </div>
    </div>
  );
};
