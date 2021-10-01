import React from "react";
import { Button, TextLink } from "@codat/orchard-ui";
import "../../../../node_modules/@codat/orchard-ui/dist/index.css";
import s from "./ButtonColumnItem.module.css";

export const ButtonColumnItem = ({ text }) => {
  return (
    <td className={s.buttonsLayout}>
      <TextLink href="#" className={s.linkText}>
        View
      </TextLink>
      <Button label="Pay" className={s.buttonText} />
    </td>
  );
};
