import { Footer } from "../components/Footer/Footer";
import Link from "next/link";
import { CompanyNameContent } from "../components/CompanyNameContent/CompanyNameContent";
import Box from "@mui/material/Box";
import {
  companyNameStyling,
  headingStyling,
} from "../styles/CompanyName.styling";
import Head from "next/head";

export default function CompanyName() {
  return (
    <>
      <Head>
        <title>Company Name</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style>{"body { background-color: #f7f8ff; }"}</style>
      <Box sx={companyNameStyling}>
        <CompanyNameContent />
      </Box>
      <Footer />
    </>
  );
}
