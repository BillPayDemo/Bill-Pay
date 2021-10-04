import { Typography } from "@codat/orchard-ui";
import React from "react";
import s from "./DotDataPoint.module.css";

export const DotDataPoint = ({ leftText, rightText }) => {
  const hasRightText = rightText || rightText !== "";
  return (
    <div className={s.container}>
      <Typography variant="small" style={{ margin: 0 }}>
        {leftText}
      </Typography>
      {hasRightText && (
        <>
          <div className={s.dotSeparator}>·</div>
          <Typography variant="small" style={{ margin: 0 }}>
            {rightText}
          </Typography>
        </>
      )}
    </div>
  );
};
