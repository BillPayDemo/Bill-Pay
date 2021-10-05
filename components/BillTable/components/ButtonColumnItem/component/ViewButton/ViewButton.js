import { TextLink, CloseIcon } from "@codat/orchard-ui";
import React from "react";
import s from "./ViewButton.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { modalStyling, closeButtonStyling } from "../../Modal.styling";
import { TitleWithSubHeadings } from "../../../../../TitleWithSubHeadings/TitleWithSubHeadings";
import Divider from "@mui/material/Divider";

export const ViewButton = ({ args, billData }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <tr>
      <td>
        <TextLink onClick={handleOpen} className={s.linkText}>
          View
        </TextLink>
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
            <div className={s.container}>
              <div className={s.title}>
                <TitleWithSubHeadings
                  mainTitle="Invoice"
                  upperTitle={null}
                  lowerTitle={billData.reference ?? billData.id}
                  mainTitleCustomFontSize="33px"
                />
              </div>
              <Divider />
            </div>
          </Box>
        </Modal>
      </td>
    </tr>
  );
};
