import { Footer } from "../components/Footer/Footer";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { CompanyNameContent } from "../components/CompanyNameContent/CompanyNameContent";
import Box from "@mui/material/Box";

const modalStyling = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "50%",
  height: "30%",
  transform: "translate(-50%, -80%)",
  p: 4,
  background: "#FFFFFF",
  outline: "none",
  boxShadow:
    "0px 8px 12px rgba(111, 116, 154, 0.08), 0px 3px 16px rgba(111, 116, 154, 0.08), 0px 5px 7px rgba(111, 116, 154, 0.12)",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  // margin: 0,
  padding: 0,
};

export default function CompanyName() {
  return (
    <>
      <div style={{ backgroundColor: "red!important" }}>
        <Box sx={modalStyling}>
          {/* <div className={styles.container}> */}
          <CompanyNameContent />
          {/* </div> */}
        </Box>
      </div>
      <h4
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
        }}
      >
        Go straight to{"  "}
        <Link href="/bills">
          <a>Bills</a>
        </Link>
      </h4>
      <Footer />
    </>
  );
}
