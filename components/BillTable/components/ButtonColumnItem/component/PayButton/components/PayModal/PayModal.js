import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@codat/orchard-ui";
import { CloseIcon } from "@codat/orchard-ui";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Divider, IconButton, CircularProgress } from "@mui/material";
import { DotDataPoint } from "../../../../../../../DotDataPoint/DotDataPoint";
import { TitleWithSubHeadings } from "../../../../../../../TitleWithSubHeadings/TitleWithSubHeadings";
import { PayModalFields } from "../PayModalFields/PayModalFields";
import { BillModalContext } from "../../../../../../../ModalStore/ModalStore";
import "../../../../../../../../node_modules/@codat/orchard-ui/dist/index.css";
import { getFormattedAmount } from "../../../../../../BillTable.helpers";
import { modalStyling, closeButtonStyling } from "../../../../Modal.styling";
import s from "./PayModal.module.css";

export const PayModal = ({
  isPayModalOpen,
  handlePayModalClose,
  billData,
  accountData,
  mutateBills,
}) => {
  const { state } = useContext(BillModalContext);
  const bill = billData.find((bill) => bill.id === state.billSelected);

  const [connectionId, setConnectionId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [inPaymentProcess, setInPaymentProcess] = useState(false);

  useEffect(() => {
    setConnectionId(window.sessionStorage.getItem("connectionId"));
  }, [setConnectionId]);

  useEffect(() => {
    setCompanyId(window.sessionStorage.getItem("companyId"));
  }, [setCompanyId]);

  useEffect(() => {
    setAccountId(window.sessionStorage.getItem("accountId"));
  }, [setAccountId]);

  const processCodatPayment = async (id) => {
    await axios.put("/api/bills", {
      id: id,
      connectionId: connectionId,
      companyId: companyId,
      accountId: accountId,
    });
  };

  const processBillSync = async () => {
    await axios.post("/api/bills", { action: "sync", companyId: companyId });
  };

  const handlePayClick = async (billId) => {
    setInPaymentProcess(true);
    await processCodatPayment(billId);
    sessionStorage.setItem("latestPaidBillId", billId);
    handlePayModalClose();
    setInPaymentProcess(false);
    await processBillSync();
    await mutateBills();
  };

  return bill ? (
    <Modal
      open={isPayModalOpen}
      onClose={handlePayModalClose}
      BackdropProps={{ style: { opacity: 0.8, background: "white" } }}
      disableScrollLock={true}
    >
      <Box sx={modalStyling}>
        <IconButton
          size="small"
          onClick={handlePayModalClose}
          style={closeButtonStyling}
        >
          <CloseIcon />
        </IconButton>
        {bill && (
          <div className={s.topSectionContainer}>
            <TitleWithSubHeadings
              upperTitle={bill.reference ?? bill.id}
              mainTitle="Bill Payment"
              lowerTitle={
                <DotDataPoint
                  leftText={bill.supplierName}
                  rightText={bill.accountName}
                />
              }
              mainTitleCustomFontSize="26px"
            />
            <TitleWithSubHeadings
              upperTitle="Amount Due"
              mainTitle={getFormattedAmount(bill.currency, bill.amountDue)}
              mainTitleCustomFontSize="20px"
            />
          </div>
        )}
        <Divider />
        <PayModalFields
          billData={bill}
          accountData={accountData}
          setAccountId={setAccountId}
        />
        <div className={s.payBillButtonContainer}>
          {inPaymentProcess ? (
            <CircularProgress />
          ) : (
            <Button
              label="Pay Bill"
              className={s.payBillButton}
              onClick={() => handlePayClick(bill.id)}
            />
          )}
        </div>
      </Box>
    </Modal>
  ) : null;
};
