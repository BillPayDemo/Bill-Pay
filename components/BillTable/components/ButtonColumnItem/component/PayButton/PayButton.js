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

export const PayButton = (billData) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const bill = billData.billData;
  console.log(billData);

  return (
    <tr>
      <td>
        <Button label="Pay" className={s.buttonText} onClick={handleOpen} />
        <Modal
          open={open}
          onClose={handleClose}
          BackdropProps={{ style: { opacity: 0.8, background: "white" } }}
        >
          <Box sx={modalStyling}>
            <IconButton
              size="small"
              onClick={handleClose}
              style={closeButtonStyling}
            >
              <CloseIcon />
            </IconButton>
            {billData && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
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
                  customPaddingBottom="16px"
                />
                <TitleWithSubHeadings
                  upperTitle="Amount Due"
                  mainTitle={getFormattedAmountDue(
                    bill.currency,
                    bill.amountDue
                  )}
                  lowerTitle={null}
                  mainTitleCustomFontSize="20px"
                  customPaddingBottom="16px"
                />
              </div>
            )}
            <Divider />
          </Box>
        </Modal>
      </td>
    </tr>
  );
};
