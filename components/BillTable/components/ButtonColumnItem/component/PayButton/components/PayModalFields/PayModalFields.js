import React from "react";
import { Checkbox, TextInput, Typography } from "@codat/orchard-ui";
import s from "./PayModalFields.module.css";
import { CardIcon } from "../../../../../../../CardIcon/CardIcon";
import { AccountNameField } from "../AccountNameField/AccountNameField";

export const PayModalFields = ({ billData, accountData, setAccountId }) => {
  const [cardNumberValue, setCardNumberValue] = React.useState("");
  const [expiryDateValue, setExpiryDateValue] = React.useState("");
  const [cvcValue, setCvcValue] = React.useState("");
  const [postcodeValue, setPostcodeValue] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const handleCheckboxClick = (event) => setChecked(event.target.checked);

  return (
    <div className={s.topContainer}>
      <Typography variant="small" className={s.text14px}>
        Account name
      </Typography>
      <AccountNameField
        billData={billData}
        accountData={accountData}
        setAccountId={setAccountId}
      />
      <Typography variant="small" className={s.helperText}>
        Choose an account to make your payment from
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
