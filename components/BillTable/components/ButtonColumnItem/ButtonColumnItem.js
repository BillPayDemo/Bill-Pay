import React from "react";
import "../../../../node_modules/@codat/orchard-ui/dist/index.css";
import s from "./ButtonColumnItem.module.css";
import { PayButton } from "./component/PayButton/PayButton";
import { ViewButton } from "./component/ViewButton/ViewButton";
import { Indicator } from "../../../Indicator/Indicator";

export const ButtonColumnItem = ({ billData, billStatus }) => {
  const indicatorStatus =
    billData.id === "135"
      ? billStatus !== "Complete"
        ? "pending"
        : "paid"
      : "paid";
  return (
    <table className={s.table}>
      <tbody className={s.buttonsLayout}>
        {billData.status !== "Paid" ? (
          <>
            <ViewButton billData={billData} />
            <PayButton billData={billData} />
          </>
        ) : (
          <Indicator status={indicatorStatus} />
        )}
      </tbody>
    </table>
  );
};
