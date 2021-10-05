import React from "react";
import { Button } from "@codat/orchard-ui";
import s from "./PayButton.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Divider, IconButton } from "@mui/material";
import { modalStyling, closeButtonStyling } from "../../Modal.styling";
import { CloseIcon } from "@codat/orchard-ui";
import { DotDataPoint } from "../../../../../DotDataPoint/DotDataPoint";
import { TitleWithSubHeadings } from "../../../../../TitleWithSubHeadings/TitleWithSubHeadings";
import { getFormattedAmountDue } from "../../../../BillTable.helpers";
import { PayModalFields } from "./components/PayModalFields/PayModalFields";

export const PayButton = ({ billData }) => {
  const [isPayModalOpen, setPayModalOpen] = React.useState(false);
  const handlePayModalOpen = () => setPayModalOpen(true);
  const handlePayModalClose = () => setPayModalOpen(false);

  return (
    <tr>
      <td>
        <Button
          label="Pay"
          className={s.buttonText}
          onClick={handlePayModalOpen}
        />
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
            <PayModalFields />
            <div className={s.payBillButtonContainer}>
              <Button
                label="Pay Bill"
                className={s.payBillButton}
                onClick={handlePayModalClose}
              />
            </div>
          </Box>
        </Modal>
      </td>
    </tr>
  );
};
