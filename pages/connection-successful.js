import React from "react";
import Box from "@mui/material/Box";
import { boxStyling } from "../styles/ConnectionSuccessful.styling";
import { ConnectionSuccessfulBox } from "../components/ConnectionSuccessfulBox/ConnectionSuccessfulBox";
import { Footer } from "../components/Footer/Footer";
import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcherWithId = (url, companyId) =>
  axios
    .get(url, {
      params: {
        id: companyId,
      },
    })
    .then((res) => {
      return res.data;
    });

export default function ConnectionSuccessful() {
  const [companyId, setValue] = useState("");

  useEffect(() => {
    setValue(window.sessionStorage.getItem("companyId"));
  }, [setValue]);

  const { data: connectionData, error: errorConnection } = useSWR(
    ["/api/connections", companyId],
    fetcherWithId
  );

  if (connectionData) {
    sessionStorage.setItem("connectionId", connectionData[0].id);
  }

  return (
    <>
      <Head>
        <title>Connection Successful</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={boxStyling}>
        <style>{"body { background-color: #f7f8ff; }"}</style>
        <ConnectionSuccessfulBox />
      </Box>
      <Footer />
    </>
  );
}
