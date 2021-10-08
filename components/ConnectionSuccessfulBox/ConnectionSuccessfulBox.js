import React, { useEffect, useState } from "react";
import { LeftHandPanel } from "./components/LeftHandPanel/LeftHandPanel";
import { RightHandPanel } from "./components/RightHandPanel/RightHandPanel";
import s from "./ConnectionSuccessfulBox.module.css";

export const ConnectionSuccessfulBox = () => {
  const [state, setState] = useState("");
  useEffect(() => {
    setState(window.sessionStorage.getItem("companyId"));
  }, [setState]);

  console.log(state);
  return (
    <div className={s.box}>
      <LeftHandPanel />
      <RightHandPanel />
    </div>
  );
};
