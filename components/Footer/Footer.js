import React from "react";
import { TheodoLogo } from "../TheodoLogo/TheodoLogo";
import s from "./Footer.module.css";
import { Typography } from "@codat/orchard-ui";

export const Footer = () => {
  return (
    <div className={s.footerContainer}>
      <Typography
        style={{
          margin: 0,
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: "400",
        }}
        variant="small"
      >
        Engineered by Theodo
      </Typography>
      <TheodoLogo />
    </div>
  );
};
