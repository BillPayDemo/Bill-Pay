import Head from "next/head";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import { landingPageBoxStyling } from "../styles/LandingPage.styling";
import { LandingPageContent } from "../components/LandingPageContent/LandingPageContent";
import { Footer } from "../components/Footer/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <style>{"body { background-color: #f7f8ff; }"}</style>

      <Head>
        <title>Bill Pay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={landingPageBoxStyling}>
        <LandingPageContent />
      </Box>
      <Footer />
    </div>
  );
}
