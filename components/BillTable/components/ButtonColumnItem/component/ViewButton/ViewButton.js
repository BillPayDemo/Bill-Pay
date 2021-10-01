import { TextLink, CloseIcon } from "@codat/orchard-ui";
import React from "react";
import s from "./ViewButton.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "20%",
  width: "40%",
  transform: "translate(-50%, -50%)",
  p: 4,
  background: "#FFFFFF",
  outline: "none",
  boxShadow:
    "0px 8px 12px rgba(111, 116, 154, 0.08), 0px 3px 16px rgba(111, 116, 154, 0.08), 0px 5px 7px rgba(111, 116, 154, 0.12)",
  borderRadius: "8px",
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
        BackdropProps={{ style: { opacity: 0.8, background: "white" } }}
      >
        <Box sx={style}>
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
