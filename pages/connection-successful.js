import React from "react";
import Box from "@mui/material/Box";
import { boxStyling } from "../styles/Box.styling";
import { ConnectionSuccessfulBox } from "../components/ConnectionSuccessfulBox/ConnectionSuccessfulBox";

export default function ConnectionSuccessful() {
  return (
    <Box sx={boxStyling}>
      <style>{"body { background-color: #F2F2F2; }"}</style>
      <ConnectionSuccessfulBox />
    </Box>
  );
}
