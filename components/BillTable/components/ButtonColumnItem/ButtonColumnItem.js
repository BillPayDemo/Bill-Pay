import React from "react";
import { Button, TextLink } from "@codat/orchard-ui";
import "../../../../node_modules/@codat/orchard-ui/dist/index.css";
import s from "./ButtonColumnItem.module.css";
import { ViewButton } from "./component/ViewButton/ViewButton";

export const ButtonColumnItem = ({ text }) => {
  return (
    <td className={s.buttonsLayout}>
      <ViewButton />
      <Button label="Pay" className={s.buttonText} />
    </td>
  );
};
