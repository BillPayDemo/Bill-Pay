import axios from "axios";
import useSWR from "swr";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { CompanyHeader } from "../components/CompanyHeader/CompanyHeader";
import { TitleWithSubHeadings } from "../components/TitleWithSubHeadings/TitleWithSubHeadings";
import { BillTable } from "../components/BillTable/BillTable";
import { Footer } from "../components/Footer/Footer";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { Switch } from "@mui/material";
import { Spinner, Typography } from "@codat/orchard-ui";
import s from "../styles/Bills.module.css";
import { boxStyling } from "../styles/Bills.styling";

const fetcherWithId = async (
  url,
  companyId,
  page,
  rowsPerPage,
  isFilteredBills
) =>
  await axios
    .get(url, {
      params: {
        id: companyId,
        pageSize: rowsPerPage,
        pageNumber: page,
        isFilteredBills: isFilteredBills,
      },
    })
    .then((res) => {
      return res.data;
    });

export default function Bills() {
  const [companyId, setValue] = useState("");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [isFilteredBills, setIsFilteredBills] = React.useState(false);

  useEffect(() => {
    setValue(window.sessionStorage.getItem("companyId"));
  }, [setValue]);

  const handleSwitchChange = () => {
    setIsFilteredBills(!isFilteredBills);
    setPage(1);
  };

  const { data: dataStatus, error: errorDataStatus } = useSWR(
    companyId ? ["/api/dataStatus", companyId] : null,
    fetcherWithId
  );

  const {
    data: dataResult,
    error: errorBills,
    mutate: mutateBills,
  } = useSWR(
    companyId
      ? [
          "/api/bills",
          companyId,
          page,
          rowsPerPage,
          isFilteredBills,
          dataStatus,
        ]
      : null,
    fetcherWithId,
    {
      isPaused: () => !dataStatus,
    }
  );

  const dataBills = dataResult?.results;

  const { data: dataCompanyInfo, error: errorCompanyInfo } = useSWR(
    companyId ? ["/api/company", companyId, dataStatus] : null,
    fetcherWithId,
    {
      isPaused: () => !dataStatus,
    }
  );
  const { data: dataAccounts, error: errorAccounts } = useSWR(
    companyId ? ["/api/accounts", companyId, dataStatus] : null,
    fetcherWithId,
    {
      isPaused: () => !dataStatus,
    }
  );

  const isDataLoaded =
    dataBills && dataCompanyInfo && dataAccounts && dataStatus;

  const billStatus = dataStatus && dataStatus.bills.currentStatus;

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
      accountId: account.id,
    }));

  return (
    <>
      <style>{"body { overflow-y: scroll; }"}</style>
      {isDataLoaded ? (
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
              <div className={s.companyInfoHeading}>
                <TitleWithSubHeadings
                  mainTitle="Bill Pay"
                  upperTitle={dataCompanyInfo.companyName}
                  lowerTitle="Easily view and pay outstanding supplier invoices"
                />
                <div className={s.switch}>
                  <Typography
                    variant="small"
                    className={s.smallText}
                    style={{ margin: "0" }}
                  >
                    View unpaid bills only
                  </Typography>
                  <Switch
                    size="small"
                    checked={isFilteredBills}
                    onChange={() => handleSwitchChange()}
                  />
                </div>
              </div>
            )}
            <Divider />
            <BillTable
              billData={listBills}
              accountData={accounts}
              billStatus={billStatus}
              mutateBills={mutateBills}
              pageNumber={page}
              setPageNumber={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              totalResults={dataResult.totalResults}
            />
          </div>
          <Footer />
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
