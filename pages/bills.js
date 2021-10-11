import axios from "axios";
import useSWR from "swr";
import { CompanyHeader } from "../components/CompanyHeader/CompanyHeader";
import { TitleWithSubHeadings } from "../components/TitleWithSubHeadings/TitleWithSubHeadings";
import { BillTable } from "../components/BillTable/BillTable";
import Divider from "@mui/material/Divider";
import { Footer } from "../components/Footer/Footer";
import Head from "next/head";
import { useState, useEffect } from "react";

const fetcher = (url) =>
  axios.get(url).then((res) => {
    return res.data;
  });

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

export default function Bills() {
  const [companyId, setValue] = useState("");

  useEffect(() => {
    setValue(window.sessionStorage.getItem("companyId"));
  }, [setValue]);

  const { data: dataBills, error: errorBills } = useSWR("/api/bills", fetcher);

  const { data: dataCompanyInfo, error: errorCompanyInfo } = useSWR(
    ["/api/company", companyId],
    fetcherWithId
  );

  const { data: dataAccounts, error: errorAccounts } = useSWR(
    "/api/accounts",
    fetcher
  );

  const { data: dataStatus, error: errorDataStatus } = useSWR(
    "/api/dataStatus",
    fetcher
  );

  const billStatus = dataStatus && dataStatus.bills.currentStatus;

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
      reference: bill.reference ?? null,
      dueDate: bill.dueDate,
      lineItems: bill.lineItems,
      subTotal: bill.subTotal,
      taxAmount: bill.taxAmount,
    }));

  const accounts =
    dataAccounts !== undefined &&
    dataAccounts.map((account) => ({
      currency: account.currency,
      isBankAccount: account.isBankAccount,
      accountName: account.name,
    }));

  return (
    <div>
      <Head>
        <title>Bills</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
        <BillTable
          billData={listBills}
          accountData={accounts}
          billStatus={billStatus}
        />
        <Footer />
      </div>
    </div>
  );
}
