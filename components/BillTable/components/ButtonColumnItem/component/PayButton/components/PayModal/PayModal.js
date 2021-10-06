import React, { useContext } from "react";
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

export const PayModal = ({
  isPayModalOpen,
  handlePayModalClose,
  billData,
  accountData,
}) => {
  const { state } = useContext(BillModalContext);
  const bill = billData.find((bill) => bill.id === state.billSelected);
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
            onClick={handlePayModalClose}
          />
        </div>
      </Box>
    </Modal>
  ) : null;
};
