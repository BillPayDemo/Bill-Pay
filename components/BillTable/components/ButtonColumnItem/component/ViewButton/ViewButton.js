import { TextLink } from "@codat/orchard-ui";
import React from "react";
import s from "./ViewButton.module.css";
import { ViewModal } from "./components/ViewModal/ViewModal";

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
        <ViewModal open={open} billData={billData} handleClose={handleClose} />
      </td>
    </tr>
  );
};
