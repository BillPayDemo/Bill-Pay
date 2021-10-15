import React from "react";
import Divider from "@mui/material/Divider";
import { StyledEngineProvider } from "@mui/material/styles";
import s from "./InformationPanel.module.css";
import { SpaceBetweenDataPoint } from "../../../../../../../SpaceBetweenDataPoint/SpaceBetweenDataPoint";
import { getFormattedDate } from "../../../../../../BillTable.helpers";

export const InformationPanel = ({ billData }) => {
  return (
    <div className={s.container}>
      <div className={s.subSection}>
        <SpaceBetweenDataPoint label="Supplier" value={billData.supplierName} />
        <SpaceBetweenDataPoint label="Currency" value={billData.currency} />
      </div>
      <StyledEngineProvider injectFirst>
        <Divider orientation="vertical" className={s.divider} />
      </StyledEngineProvider>
      <div className={s.subSection}>
        <SpaceBetweenDataPoint
          label="Date issued"
          value={getFormattedDate(billData.issueDate)}
        />
        <SpaceBetweenDataPoint
          label="Due date"
          value={getFormattedDate(billData.dueDate)}
        />
      </div>
    </div>
  );
};
