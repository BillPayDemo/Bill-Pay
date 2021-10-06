import { TextLink } from "@codat/orchard-ui";
import React from "react";
import s from "./ViewButton.module.css";
import { BillModalContext } from "../../../../../ModalStore/ModalStore";
import { useContext } from "react";

export const ViewButton = ({ args, billData }) => {
  const { onViewModalOpen } = useContext(BillModalContext);
  return (
    <tr>
      <td>
        <TextLink
          onClick={() => onViewModalOpen(billData.id)}
          className={s.linkText}
        >
          View
        </TextLink>
      </td>
    </tr>
  );
};
