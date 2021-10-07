import React from "react";
import s from "./RightHandPanel.module.css";
import { CircleCheckIcon, Typography, Button } from "@codat/orchard-ui";

export const RightHandPanel = () => {
  return (
    <div className={s.container}>
      <CircleCheckIcon fillColor="green" className={s.circleIcon} />
      <Typography
        style={{
          color: "#29262B",
          margin: "24px 0 0 0",
        }}
        variant="h2"
      >
        Connection Successful
      </Typography>
      <Typography
        style={{
          margin: "8px 0 48px 0",
          fontSize: "12px",
        }}
        variant="p"
      >
        {"We've connected QuickBooks Online"}
      </Typography>
      <Button label="Launch Bills Portal" />
    </div>
  );
};
