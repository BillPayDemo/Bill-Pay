import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { boxStyling } from "../styles/ConnectionSuccessful.styling";
import { ConnectionSuccessfulBox } from "../components/ConnectionSuccessfulBox/ConnectionSuccessfulBox";
import { Footer } from "../components/Footer/Footer";
import Head from "next/head";
import axios from "axios";
import useSWR from "swr";

const fetcherWithId = async (url, companyId) =>
  await axios
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
    companyId ? ["/api/connections", companyId] : null,
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
