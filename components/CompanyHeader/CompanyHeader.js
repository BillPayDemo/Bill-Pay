import React from "react";
import s from "./CompanyHeader.module.css";
import { BankIcon, Typography, Button } from "@codat/orchard-ui";

export const CompanyHeader = () => {
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <BankIcon fillColor="#482DEB" className={s.icon} />
        <Typography
          style={{
            color: "#482DEB",
            marginBottom: "0px",
          }}
          variant="h3"
        >
          CoBank
        </Typography>
      </div>
      <Button label="Logout" onClick={() => handleLogout()} />
    </div>
  );
};
