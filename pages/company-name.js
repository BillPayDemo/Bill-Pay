import { Footer } from "../components/Footer/Footer";
import Link from "next/link";
import { CompanyNameContent } from "../components/CompanyNameContent/CompanyNameContent";
import Box from "@mui/material/Box";
import {
  companyNameStyling,
  headingStyling,
} from "../styles/CompanyName.styling";

export default function CompanyName() {
  return (
    <>
      <style>{"body { background-color: #F2F2F2; }"}</style>
      <Box sx={companyNameStyling}>
        <CompanyNameContent />
      </Box>
      <h4 style={headingStyling}>
        Go straight to{"  "}
        <Link href="/bills">
          <a>Bills</a>
        </Link>
      </h4>
      <Footer />
    </>
  );
}
