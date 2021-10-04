import { TextLink, CloseIcon } from "@codat/orchard-ui";
import React from "react";
import s from "./ViewButton.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { modalStyling, closeButtonStyling } from "../../Modal.styling";

export const ViewButton = (args) => {
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
          </Box>
        </Modal>
      </td>
    </tr>
  );
};
