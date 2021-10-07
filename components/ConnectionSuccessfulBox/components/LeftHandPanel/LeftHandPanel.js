import React from "react";
import s from "./LeftHandPanel.module.css";
import "../../../../node_modules/@codat/orchard-ui/dist/index.css";
import Divider from "@mui/material/Divider";
import { TopSection } from "./components/TopSection/TopSection";
import { Description } from "./components/Description/Description";
import { AccountingSection } from "./components/AccountingSection/AccountingSection";
import { BottomSection } from "./components/BottomSection/BottomSection";

export const LeftHandPanel = () => {
  return (
    <div className={s.container}>
      <TopSection />
      <Description />
      <AccountingSection />
      <Divider className={s.divider} />
      <BottomSection />
    </div>
  );
};
