import axios from "axios";
import useSWR from "swr";
import { CompanyHeader } from "../components/CompanyHeader/CompanyHeader";
import { TitleWithSubHeadings } from "../components/TitleWithSubHeadings/TitleWithSubHeadings";
import { BillTable } from "../components/BillTable/BillTable";
import Divider from "@mui/material/Divider";
import { Footer } from "../components/Footer/Footer";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Spinner, Typography } from "@codat/orchard-ui";
import s from "../styles/Bills.module.css";
import Box from "@mui/material/Box";
import { boxStyling } from "../styles/Bills.styling";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 6000);
  }, []);

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
    <>
      {loading === false ? (
        <div>
          <Head>
            <title>Bills</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <CompanyHeader />
          <div
            style={{
              paddingTop: "48px",
              paddingRight: "15%",
              paddingLeft: "15%",
            }}
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
      ) : (
        <>
          <Box sx={boxStyling} className={s.loadingPage}>
            <style>{"body { background-color: #f7f8ff; }"}</style>
            <div className={s.spinner}>
              <Typography variant="h2">Finding your bills...</Typography>
              <Spinner />
            </div>
          </Box>
          <Footer />
        </>
      )}
    </>
  );
}
