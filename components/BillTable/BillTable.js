import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import s from "./BillTable.module.css";
import { ButtonColumnItem } from "./components/ButtonColumnItem/ButtonColumnItem";
import moment from "moment";
import { getFormattedAmountDue, FormattedCell } from "./BillTable.helpers";

export const BillTable = (billData) => {
  return (
    <TableContainer
      components={{
        Container: function removeShadowAroundTable(props) {
          return <Paper {...props} elevation={0} />;
        },
      }}
      className={s.table}
    >
      <Table
        sx={{ minWidth: 650, tableLayout: "fixed" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <FormattedCell text="Date" colour="#5f6374" fontSize="14px" />
            <FormattedCell text="Supplier" colour="#5f6374" fontSize="14px" />
            <FormattedCell text="Reference" colour="#5f6374" fontSize="14px" />
            <FormattedCell text="Amount Due" colour="#5f6374" fontSize="14px" />
            <FormattedCell text="" />
          </TableRow>
        </TableHead>
        <TableBody>
          {billData.billData &&
            billData.billData.map((bill) => (
              <TableRow
                key={bill.id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <FormattedCell
                  text={moment(bill.issueDate).format("MMM DD, YYYY")}
                />
                <FormattedCell text={bill.supplierName} />
                <FormattedCell text={bill.accountName} />
                <FormattedCell
                  text={getFormattedAmountDue(bill.currency, bill.amountDue)}
                />
                <TableCell style={{ padding: "12px" }}>
                  <ButtonColumnItem billData={bill} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
