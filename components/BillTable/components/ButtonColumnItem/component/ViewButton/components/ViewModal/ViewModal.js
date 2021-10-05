import React from "react";
import s from "./ViewModal.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { modalStyling, closeButtonStyling } from "../../../../Modal.styling";
import { TitleWithSubHeadings } from "../../../../../../../TitleWithSubHeadings/TitleWithSubHeadings";
import Divider from "@mui/material/Divider";
import { InformationPanel } from "../../components/InformationPanel/InformationPanel";
import { CloseIcon, Button } from "@codat/orchard-ui";

export const ViewModal = ({ isViewModalOpen, handleClose, billData }) => {
  return (
    <Modal
      open={isViewModalOpen}
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
        <div className={s.topSection}>
          <div className={s.title}>
            <TitleWithSubHeadings
              mainTitle="Invoice"
              lowerTitle={billData.reference ?? billData.id}
              mainTitleCustomFontSize="33px"
            />
          </div>
          <div className={s.button}>
            <Button label="Pay Bill" className={s.buttonText} onClick={null} />
          </div>
        </div>
        <Divider />
        <InformationPanel billData={billData} />
        <Divider />
      </Box>
    </Modal>
  );
};
