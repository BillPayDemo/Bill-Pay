import React, { useContext } from "react";
import "../../../../node_modules/@codat/orchard-ui/dist/index.css";
import s from "./ButtonColumnItem.module.css";
import { PayButton } from "./component/PayButton/PayButton";
import { ViewButton } from "./component/ViewButton/ViewButton";
import { Indicator } from "../../../Indicator/Indicator";
import { BillModalContext } from "../../../ModalStore/ModalStore";

export const ButtonColumnItem = ({ billData, billStatus }) => {
  const { state, onPayBill } = useContext(BillModalContext);
  console.log(state.billSelected, state.billLatestPaid, state);
  // const bill = billData.find((bill) => bill.id === state.billSelected);
  const indicatorStatus =
    billData.id === state.billLatestPaid
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
