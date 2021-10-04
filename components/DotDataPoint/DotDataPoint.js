import { Typography } from "@codat/orchard-ui";
import React from "react";
import s from "./DotDataPoint.module.css";

export const DotDataPoint = ({ leftText, rightText }) => {
  return (
    <div className={s.container}>
      <Typography variant="small">{leftText}</Typography>
      <div className={s.dotSeparator}>·</div>
      <Typography variant="small">{rightText}</Typography>
    </div>
  );
};
