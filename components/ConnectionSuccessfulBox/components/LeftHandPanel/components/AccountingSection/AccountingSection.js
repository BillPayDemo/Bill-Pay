import React from "react";
import s from "./AccountingSection.module.css";
import { Typography, InvoiceIcon } from "@codat/orchard-ui";
import "../../../../../../node_modules/@codat/orchard-ui/dist/index.css";
import Box from "@mui/material/Box";
import { boxStyling } from "../../Styles.styling.js";

export const AccountingSection = () => {
  return (
    <div className={s.container}>
      <Box sx={boxStyling}>
        <InvoiceIcon fillColor="black" className={s.icon} />
      </Box>
      <div className={s.text}>
        <Typography
          style={{
            margin: "0",
            fontSize: "12px",
            color: "#29262B",
            lineHeight: "19px",
          }}
          variant="p"
        >
          Accounting
        </Typography>
        <Typography
          style={{
            margin: "0",
            fontSize: "10px",
            color: "#29262B",
            opacity: "60%",
            lineHeight: "15px",
          }}
          variant="p"
        >
          1 connected
        </Typography>
      </div>
    </div>
  );
};
