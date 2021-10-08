import React from "react";
import "../../node_modules/@codat/orchard-ui/dist/index.css";
import s from "./LandingPageContent.module.css";
import { BankIcon, Typography, Button } from "@codat/orchard-ui";
import Box from "@mui/material/Box";
import { circleStyling } from "./Styles.styling";

export const LandingPageContent = () => {
  return (
    <div className={s.container}>
      <Box sx={circleStyling}>
        <BankIcon fillColor="#482DEB" className={s.icon} />
      </Box>
      <Typography variant="h3" style={{ margin: 0 }} className={s.title}>
        Bill Pay
      </Typography>
      <Typography variant="p" style={{ margin: 0 }} className={s.subtitle}>
        Connect your accounting platform to make it quick and easy to pay your
        suppliers
      </Typography>
      <Button label="Get Started" href="/company-name" />
      <Typography
        style={{
          margin: 0,
          fontSize: "10px",
        }}
        variant="p"
        className={s.smallText}
      >
        Powered by <strong> Codat </strong>
      </Typography>
    </div>
  );
};
