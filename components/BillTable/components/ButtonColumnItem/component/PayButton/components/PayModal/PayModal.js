import React from "react";
import { Button } from "@codat/orchard-ui";
import s from "./PayModal.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Divider, IconButton } from "@mui/material";
import { modalStyling, closeButtonStyling } from "../../../../Modal.styling";
import { CloseIcon } from "@codat/orchard-ui";
import { DotDataPoint } from "../../../../../../../DotDataPoint/DotDataPoint";
import { TitleWithSubHeadings } from "../../../../../../../TitleWithSubHeadings/TitleWithSubHeadings";
import { getFormattedAmountDue } from "../../../../../../BillTable.helpers";
import { PayModalFields } from "../PayModalFields/PayModalFields";

export const PayModal = ({
  isPayModalOpen,
  handlePayModalClose,
  billData,
  accountData,
}) => {
  return (
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
        {billData && (
          <div className={s.topSectionContainer}>
            <TitleWithSubHeadings
              upperTitle={billData.id}
              mainTitle="Bill Payment"
              lowerTitle={
                <DotDataPoint
                  leftText={billData.supplierName}
                  rightText={billData.accountName}
                />
              }
              mainTitleCustomFontSize="26px"
            />
            <TitleWithSubHeadings
              upperTitle="Amount Due"
              mainTitle={getFormattedAmountDue(
                billData.currency,
                billData.amountDue
              )}
              mainTitleCustomFontSize="20px"
            />
          </div>
        )}
        <Divider />
        <PayModalFields billData={billData} accountData={accountData} />
        <div className={s.payBillButtonContainer}>
          <Button
            label="Pay Bill"
            className={s.payBillButton}
            onClick={handlePayModalClose}
          />
        </div>
      </Box>
    </Modal>
  );
};
