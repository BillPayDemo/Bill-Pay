import React from "react";
import { Button } from "@codat/orchard-ui";
import s from "./PayButton.module.css";
import { PayModal } from "./components/PayModal/PayModal";

export const PayButton = ({ billData }) => {
  const [isPayModalOpen, setPayModalOpen] = React.useState(false);
  const handlePayModalOpen = () => setPayModalOpen(true);
  const handlePayModalClose = () => setPayModalOpen(false);

  return (
    <tr>
      <td>
        <Button
          label="Pay"
          className={s.buttonText}
          onClick={handlePayModalOpen}
        />
        <PayModal
          isPayModalOpen={isPayModalOpen}
          handlePayModalClose={handlePayModalClose}
          billData={billData}
        />
      </td>
    </tr>
  );
};
