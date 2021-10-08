import React from "react";
import "../../../../node_modules/@codat/orchard-ui/dist/index.css";
import s from "./ButtonColumnItem.module.css";
import { PayButton } from "./component/PayButton/PayButton";
import { ViewButton } from "./component/ViewButton/ViewButton";
import { PaidIndicator } from "../../../PaidIndicator/PaidIndicator";

export const ButtonColumnItem = ({ billData }) => {
  return (
    <table className={s.table}>
      <tbody className={s.buttonsLayout}>
        {billData.status !== "Paid" && billData.amountDue !== 0 ? (
          <>
            <ViewButton billData={billData} />
            <PayButton billData={billData} />
          </>
        ) : (
          <PaidIndicator />
        )}
      </tbody>
    </table>
  );
};
