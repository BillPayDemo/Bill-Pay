import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Button } from "@codat/orchard-ui";
import s from "./PayModal.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Divider, IconButton } from "@mui/material";
import { modalStyling, closeButtonStyling } from "../../../../Modal.styling";
import { CloseIcon } from "@codat/orchard-ui";
import { DotDataPoint } from "../../../../../../../DotDataPoint/DotDataPoint";
import { TitleWithSubHeadings } from "../../../../../../../TitleWithSubHeadings/TitleWithSubHeadings";
import { getFormattedAmount } from "../../../../../../BillTable.helpers";
import { PayModalFields } from "../PayModalFields/PayModalFields";
import { BillModalContext } from "../../../../../../../ModalStore/ModalStore";
import { useSWRConfig } from "swr";
import axios from "axios";

export const PayModal = ({
  isPayModalOpen,
  handlePayModalClose,
  billData,
  accountData,
}) => {
  const { state } = useContext(BillModalContext);
  const bill = billData.find((bill) => bill.id === state.billSelected);

  const { mutate } = useSWRConfig();

  const [connectionId, setConnectionId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    setConnectionId(window.sessionStorage.getItem("connectionId"));
  }, [setConnectionId]);

  useEffect(() => {
    setCompanyId(window.sessionStorage.getItem("companyId"));
  }, [setCompanyId]);

  useEffect(() => {
    setAccountId(window.sessionStorage.getItem("accountId"));
  }, [setAccountId]);

  const processCodatPayment = (id) => {
    axios.put("/api/bills", {
      id: id,
      connectionId: connectionId,
      companyId: companyId,
      accountId: accountId,
    });
    mutate("/api/bills");
  };

  const handlePayClick = (billId) => {
    handlePayModalClose();
    processCodatPayment(billId);
  };

  return bill ? (
    <Modal
      open={isPayModalOpen}
      onClose={handlePayModalClose}
      BackdropProps={{ style: { opacity: 0.8, background: "white" } }}
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
              upperTitle={bill.id}
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
        <PayModalFields billData={bill} accountData={accountData} />
        <div className={s.payBillButtonContainer}>
          <Button
            label="Pay Bill"
            className={s.payBillButton}
            onClick={() => handlePayClick(bill.id)}
          />
        </div>
      </Box>
    </Modal>
  ) : null;
};
