import { TextLink } from "@codat/orchard-ui";
import React from "react";
import s from "./ViewButton.module.css";
import { ViewModal } from "./components/ViewModal/ViewModal";

export const ViewButton = ({ args, billData }) => {
  const [isViewModalOpen, setViewModalOpen] = React.useState(false);
  const handleOpen = () => setViewModalOpen(true);
  const handleClose = () => setViewModalOpen(false);

  return (
    <tr>
      <td>
        <TextLink onClick={handleOpen} className={s.linkText}>
          View
        </TextLink>
        <ViewModal
          isViewModalOpen={isViewModalOpen}
          billData={billData}
          handleClose={handleClose}
        />
      </td>
    </tr>
  );
};
