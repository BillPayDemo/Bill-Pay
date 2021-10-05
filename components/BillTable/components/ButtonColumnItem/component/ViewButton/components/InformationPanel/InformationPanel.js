import React from "react";
import s from "./InformationPanel.module.css";
import { SpaceBetweenDataPoint } from "../../../../../../../SpaceBetweenDataPoint/SpaceBetweenDataPoint";
import moment from "moment";
import Divider from "@mui/material/Divider";

export const InformationPanel = ({ billData }) => {
  return (
    <div className={s.container}>
      <div className={s.subSection}>
        <SpaceBetweenDataPoint label="Supplier" value={billData.supplierName} />
        <SpaceBetweenDataPoint label="Currency" value={billData.currency} />
      </div>
      <Divider orientation="vertical" className={s.divider} />
      <div className={s.subSection}>
        <SpaceBetweenDataPoint
          label="Date issued"
          value={moment(billData.issueDate).format("MMM DD, YYYY")}
        />
        <SpaceBetweenDataPoint
          label="Due date"
          value={moment(billData.dueDate).format("MMM DD, YYYY")}
        />
      </div>
    </div>
  );
};
