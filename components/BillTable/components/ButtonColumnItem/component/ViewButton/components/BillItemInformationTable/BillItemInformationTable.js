import React from "react";
import s from "./BillItemInformationTable.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  getFormattedAmountDue,
  FormattedCell,
} from "../../../../../../BillTable.helpers.js";

const ItemFormattedCell = ({ text, align = "left" }) => {
  return (
    <FormattedCell text={text} colour="#29262B" fontSize="14px" align={align} />
  );
};

export const BillItemInformationTable = ({ billLineItems, currency }) => {
  return (
    <TableContainer
      components={{
        Container: function removeShadowAroundTable(props) {
          return <Paper {...props} elevation={0} />;
        },
      }}
      className={s.table}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <FormattedCell text="Account Name" />
            <FormattedCell text="Description" />
            <FormattedCell text="Unit Cost" align="right" />
            <FormattedCell text="Quantity" align="right" />
            <FormattedCell text="" />
          </TableRow>
        </TableHead>
        <TableBody>
          {billLineItems &&
            billLineItems.map((lineItem) => (
              <TableRow
                key={lineItem.itemRef?.id ?? lineItem.accountRef?.id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <ItemFormattedCell text={lineItem.accountRef?.name ?? ""} />
                <ItemFormattedCell text={lineItem.description ?? ""} />
                <ItemFormattedCell
                  text={
                    getFormattedAmountDue(currency, lineItem.unitAmount) ?? ""
                  }
                  align="right"
                />
                <ItemFormattedCell
                  text={lineItem.quantity ?? ""}
                  align="right"
                />
                <ItemFormattedCell
                  text={
                    getFormattedAmountDue(currency, lineItem.subTotal) ?? ""
                  }
                  align="right"
                />
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
