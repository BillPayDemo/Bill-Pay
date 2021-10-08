import React from "react";
import "../../../../node_modules/@codat/orchard-ui/dist/index.css";
import s from "./ButtonColumnItem.module.css";
import { PayButton } from "./component/PayButton/PayButton";
import { ViewButton } from "./component/ViewButton/ViewButton";
import { Indicator } from "../../../Indicator/Indicator";

export const ButtonColumnItem = ({ billData }) => {
  return (
    <table className={s.table}>
      <tbody className={s.buttonsLayout}>
        {billData.status !== "Paid" ? (
          <>
            <ViewButton billData={billData} />
            <PayButton billData={billData} />
          </>
        ) : (
          <Indicator />
        )}
      </tbody>
    </table>
  );
};
