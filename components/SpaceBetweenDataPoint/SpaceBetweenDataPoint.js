import { Typography } from "@codat/orchard-ui";
import React from "react";
import s from "./SpaceBetweenDataPoint.module.css";

export const SpaceBetweenDataPoint = ({ label, value }) => {
  return (
    <div className={s.container}>
      <Typography
        style={{
          color: "#6F749A",
          margin: "0 2px 0 0",
        }}
        variant="p"
      >
        {label}
      </Typography>
      <Typography
        style={{
          color: "#29262B",
          margin: "0 0 0 2px",
        }}
        variant="p"
      >
        {value}
      </Typography>
    </div>
  );
};
