import React, { useContext } from "react";
import s from "./ViewModal.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { modalStyling, closeButtonStyling } from "../../../../Modal.styling";
import { TitleWithSubHeadings } from "../../../../../../../TitleWithSubHeadings/TitleWithSubHeadings";
import Divider from "@mui/material/Divider";
import { InformationPanel } from "../../components/InformationPanel/InformationPanel";
import { CloseIcon, Button } from "@codat/orchard-ui";
import { BillItemInformationTable } from "../BillItemInformationTable/BillItemInformationTable";
import { TotalBreakDownTable } from "../TotalBreakdownTable/TotalBreakdownTable";
import { BillModalContext } from "../../../../../../../ModalStore/ModalStore";

export const ViewModal = ({
  isViewModalOpen,
  handleViewModalClose,
  billData,
}) => {
  const { state, onViewModalClosePayButtonOpen } = useContext(BillModalContext);
  const bill = billData.find((bill) => bill.id === state.billSelected);
  return bill ? (
    <Modal
      open={isViewModalOpen}
      onClose={handleViewModalClose}
      BackdropProps={{ style: { opacity: 0.8, background: "white" } }}
      disableScrollLock={true}
    >
      <Box sx={modalStyling}>
        <IconButton
          size="small"
          onClick={handleViewModalClose}
          style={closeButtonStyling}
        >
          <CloseIcon />
        </IconButton>
        <div className={s.topSection}>
          <div className={s.title}>
            <TitleWithSubHeadings
              mainTitle="Invoice"
              lowerTitle={bill.reference ?? bill.id}
              mainTitleCustomFontSize="33px"
            />
          </div>
          <div className={s.button}>
            <Button
              label="Pay Bill"
              className={s.buttonText}
              onClick={onViewModalClosePayButtonOpen}
            />
          </div>
        </div>
        <Divider />
        <InformationPanel billData={bill} />
        <Divider />
        <BillItemInformationTable
          billLineItems={bill.lineItems}
          currency={bill.currency}
        />
        <Divider />
        <TotalBreakDownTable billData={bill} />
      </Box>
    </Modal>
  ) : null;
};
