import React from "react";
import "../../../../node_modules/@codat/orchard-ui/dist/index.css";
import s from "./ButtonColumnItem.module.css";
import { PayButton } from "./component/PayButton/PayButton";
import { ViewButton } from "./component/ViewButton/ViewButton";

export const ButtonColumnItem = ({ text }) => {
  return (
    <table className={s.table}>
      <tbody className={s.buttonsLayout}>
        <ViewButton />
        <PayButton />
      </tbody>
    </table>
  );
};
