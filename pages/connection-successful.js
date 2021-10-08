import React from "react";
import Box from "@mui/material/Box";
import { boxStyling } from "../styles/ConnectionSuccessful.styling";
import { ConnectionSuccessfulBox } from "../components/ConnectionSuccessfulBox/ConnectionSuccessfulBox";
import { Footer } from "../components/Footer/Footer";
import Head from "next/head";

export default function ConnectionSuccessful() {
  return (
    <>
      <Head>
        <title>Connection Successful</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={boxStyling}>
        <style>{"body { background-color: #F2F2F2; }"}</style>
        <ConnectionSuccessfulBox />
      </Box>
      <Footer />
    </>
  );
}
