import React from "react";
import { TextInput } from "@codat/orchard-ui";
import s from "./PayModalFields.module.css";
import { CardIcon } from "../../../../../../../CardIcon/CardIcon";

export const PayModalFields = () => {
  const [cardNumberValue, setCardNumberValue] = React.useState("");
  const [expiryDateValue, setExpiryDateValue] = React.useState("");
  const [cvcValue, setCvcValue] = React.useState("");
  const [postcodeValue, setPostcodeValue] = React.useState("");

  return (
    <div className={s.topContainer}>
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
    </div>
  );
};