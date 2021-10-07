import React from "react";
import s from "./Description.module.css";
import { Typography } from "@codat/orchard-ui";
import "../../../../../../node_modules/@codat/orchard-ui/dist/index.css";

export const Description = () => {
  return (
    <div className={s.description}>
      <Typography
        style={{
          margin: "0",
        }}
        variant="h2"
      >
        Link your accounts
      </Typography>
      <Typography
        style={{
          margin: "8px 0 0 0",
          fontSize: "12px",
        }}
        variant="p"
      >
        You will be asked to log in to your accounts in order to authorise the
        link.
      </Typography>
    </div>
  );
};
