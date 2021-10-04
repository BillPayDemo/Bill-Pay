import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import s from "./BillTable.module.css";
import { Typography } from "@codat/orchard-ui";
import { ButtonColumnItem } from "./components/ButtonColumnItem/ButtonColumnItem";
import moment from "moment";

export const FormattedColumnHeaderCell = ({ text }) => {
  return (
    <>
      <TableCell align="left">
        <Typography
          style={{
            color: "#5f6374",
            margin: 0,
            fontSize: "14px",
          }}
          variant="small"
        >
          {text}
        </Typography>
      </TableCell>
    </>
  );
};

export const FormattedCell = ({ text }) => {
  return (
    <>
      <TableCell align="left" style={{ padding: "18px" }}>
        <Typography
          style={{
            margin: 0,
          }}
          variant="small"
        >
          {text}
        </Typography>
      </TableCell>
    </>
  );
};

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
            <FormattedColumnHeaderCell text="Date" />
            <FormattedColumnHeaderCell text="Supplier" />
            <FormattedColumnHeaderCell text="Reference" />
            <FormattedColumnHeaderCell text="Amount Due" />
            <FormattedColumnHeaderCell text="" />
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
                <FormattedCell text={bill.amountDue} />
                <TableCell style={{ padding: "12px" }}>
                  <ButtonColumnItem />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
