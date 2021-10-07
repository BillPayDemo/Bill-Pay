import React from "react";
import s from "./BottomSection.module.css";
import { Typography, ShieldCheckIcon } from "@codat/orchard-ui";
import "../../../../../../node_modules/@codat/orchard-ui/dist/index.css";
import Box from "@mui/material/Box";
import { circleStyling } from "../../Styles.styling.js";

export const BottomSection = () => {
  return (
    <div className={s.container}>
      <Box sx={circleStyling}>
        <ShieldCheckIcon fillColor="white" className={s.icon} />
      </Box>
      <div className={s.text}>
        <Typography
          style={{
            margin: "0",
            fontSize: "12px",
            color: "#29262B",
            fontWeight: "700",
            lineHeight: "16px",
          }}
          variant="p"
        >
          We keep your data secure
        </Typography>
        <Typography
          style={{
            margin: "0",
            fontSize: "12px",
            color: "#482DEB",
            lineHeight: "16px",
          }}
          variant="p"
        >
          Learn more
        </Typography>
      </div>
    </div>
  );
};
