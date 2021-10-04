import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { CompanyHeader } from "../components/CompanyHeader/CompanyHeader";
import { TitleWithSubHeadings } from "../components/TitleWithSubHeadings/TitleWithSubHeadings";
import { BillTable } from "../components/BillTable/BillTable";
import Divider from "@mui/material/Divider";
import { Footer } from "../components/Footer/Footer";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Bills() {
  const { mutate } = useSWRConfig();
  const { data: dataBills, error: errorBills } = useSWR("/api/bills", fetcher);
  const { data: dataCompanyInfo, error: errorCompanyInfo } = useSWR(
    "/api/companyInfo",
    fetcher
  );

  const handlePayClick = (id) => {
    axios.put("/api/bills", { id: id });
    mutate("/api/bills");
  };

  const handleSyncClick = () => {
    axios.post("/api/bills", { action: "sync" });
  };

  const listBills =
    dataBills !== undefined &&
    dataBills.map((bill) => ({
      id: bill.id,
      status: bill.status,
      totalAmount: bill.totalAmount,
      amountDue: bill.amountDue,
      issueDate: bill.issueDate,
      currency: bill.currency,
      supplierName: bill.supplierRef.supplierName,
      accountName: bill.lineItems[0].accountRef?.name ?? "",
    }));

  return (
    <div>
      <CompanyHeader />
      <div
        style={{ paddingTop: "48px", paddingRight: "15%", paddingLeft: "15%" }}
      >
        {dataCompanyInfo !== undefined && (
          <div style={{ marginBottom: "25px" }}>
            <TitleWithSubHeadings
              mainTitle="Bill Pay"
              upperTitle={dataCompanyInfo.companyName}
              lowerTitle="Easily view and pay outstanding supplier invoices"
            />
          </div>
        )}
        <Divider />
        <BillTable billData={listBills} />
        <Footer />
      </div>
    </div>
  );
}
