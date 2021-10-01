import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import BlockButton from "../components/BlockButton";
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

  const listBills = (bills) => (
    <ul>
      {bills.map((bill) => (
        <li key={bill.id}>
          <pre>
            {JSON.stringify(
              {
                id: bill.id,
                status: bill.status,
                totalAmount: bill.totalAmount,
                amountDue: bill.amountDue,
                issueDate: bill.issueDate,
              },
              null,
              2
            )}
          </pre>
          <BlockButton onClick={() => handlePayClick(bill.id)} label="Pay" />
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <CompanyHeader />
      <div style={{ paddingRight: "25%", paddingLeft: "25%" }}>
        {dataCompanyInfo !== undefined && (
          <TitleWithSubHeadings
            mainTitle="Bill Pay"
            upperTitle={dataCompanyInfo.companyName}
            lowerTitle="Easily view and pay outstanding supplier invoices"
          />
        )}
        <Divider />
        <BillTable />
        <Footer />
      </div>
    </div>
  );
}
