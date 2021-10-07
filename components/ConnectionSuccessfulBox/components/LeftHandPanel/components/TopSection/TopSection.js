import React from "react";
import s from "./TopSection.module.css";
import { BankIcon, Typography, CircleQuestionIcon } from "@codat/orchard-ui";
import "../../../../../../node_modules/@codat/orchard-ui/dist/index.css";

export const TopSection = () => {
  return (
    <div className={s.container}>
      <div className={s.subSection}>
        <BankIcon fillColor="#482DEB" className={s.icon} />
        <Typography
          style={{
            color: "#482DEB",
            margin: "0",
          }}
          variant="h3"
        >
          CoBank
        </Typography>
      </div>
      <div className={s.subSection}>
        <CircleQuestionIcon fillColor="grey" className={s.icon} />
        <Typography
          style={{
            color: "#6F749A",
            margin: "0",
          }}
          variant="p"
        >
          Help
        </Typography>
      </div>
    </div>
  );
};
