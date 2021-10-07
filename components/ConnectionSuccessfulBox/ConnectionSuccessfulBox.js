import React from "react";
import { LeftHandPanel } from "./components/LeftHandPanel/LeftHandPanel";
import { RightHandPanel } from "./components/RightHandPanel/RightHandPanel";
import s from "./ConnectionSuccessfulBox.module.css";

export const ConnectionSuccessfulBox = () => {
  return (
    <div className={s.box}>
      <LeftHandPanel />
      <RightHandPanel />
    </div>
  );
};
