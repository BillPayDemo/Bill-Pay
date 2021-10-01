import { TextLink, CloseIcon } from "@codat/orchard-ui";
import React from "react";
import s from "./ViewButton.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 50,
  outline: "none",
  p: 4,
  background: "#FFFFFF",
  border: "2px solid #F7F8FF",
  boxShadow:
    "0px 8px 12px rgba(111, 116, 154, 0.08), 0px 3px 16px rgba(111, 116, 154, 0.08), 0px 5px 7px rgba(111, 116, 154, 0.12)",
  borderRadius: "8px",
};

const styleCross = {
  position: "relative",
  top: "16px",
  right: "16px",
};

export const ViewButton = (args) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <TextLink onClick={handleOpen} className={s.linkText}>
        View
      </TextLink>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ style: { opacity: 0.3 } }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <IconButton
            size="small"
            onClick={handleClose}
            className={s.crossButton}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </div>
  );
};
