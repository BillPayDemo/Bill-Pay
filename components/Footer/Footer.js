import React from "react";
import { TheodoLogo } from "../TheodoLogo/TheodoLogo";
import s from "./Footer.module.css";

export const Footer = () => {
  return (
    <div className={s.footerContainer}>
      <div>Engineered by Theodo</div>
      <TheodoLogo />
    </div>
  );
};
