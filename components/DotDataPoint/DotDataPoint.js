import { Typography } from "@codat/orchard-ui";
import React from "react";

export const DotDataPoint = ({ leftText, rightText }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Typography variant="small">{leftText}</Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "2px",
        }}
      >
        ·
      </div>
      <Typography variant="small">{rightText}</Typography>
    </div>
  );
};
