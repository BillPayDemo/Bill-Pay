import React from "react";
import { Button } from "@codat/orchard-ui";
import s from "./PayButton.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { modalStyling, closeButtonStyling } from "../../Modal.styling";
import { CloseIcon } from "@codat/orchard-ui";

export const PayButton = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
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
        </Box>
      </Modal>
    </div>
  );
};
