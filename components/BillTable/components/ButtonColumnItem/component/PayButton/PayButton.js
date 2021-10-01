import React from "react";
import { Button } from "@codat/orchard-ui";
import s from "./PayButton.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ style: { opacity: 0.3 } }}
      >
        <Box></Box>
      </Modal>
    </div>
  );
};
