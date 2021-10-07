import React from "react";
import s from "./RightHandPanel.module.css";
import { CircleCheckIcon, Typography, Button } from "@codat/orchard-ui";

export const RightHandPanel = () => {
  return (
    <div className={s.container}>
      <CircleCheckIcon fillColor="green" className={s.circleIcon} />
      <Typography variant="h2" className={s.h2}>
        Connection Successful
      </Typography>
      <Typography variant="p" className={s.paragraph}>
        {"We've connected QuickBooks Online"}
      </Typography>
      <Button label="Launch Bills Portal" href="/bills" />
    </div>
  );
};
