import React from "react";
import s from "./ConnectionSuccessfulBox.module.css";
import { CircleCheckIcon, Typography, Button } from "@codat/orchard-ui";
import "../../node_modules/@codat/orchard-ui/dist/index.css";

export const ConnectionSuccessfulBox = () => {
  return (
    <div className={s.box}>
      <div className={s.container}>
        <CircleCheckIcon fillColor="green" className={s.circleIcon} />
        <Typography
          variant="h2"
          style={{
            margin: "24px 0 0 0",
          }}
          className={s.h2}
        >
          Connection Successful
        </Typography>
        <Typography
          variant="p"
          style={{
            margin: "8px 0 48px 0",
            fontSize: "12px",
          }}
        >
          {"We've connected QuickBooks Online"}
        </Typography>
        <Button label="Launch Bills Portal" href="/bills" />
      </div>
    </div>
  );
};
