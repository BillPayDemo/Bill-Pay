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

// This will be necessary when adding rows later
function createData(date, supplier, reference, amountDue) {
  return { date, supplier, reference, amountDue };
}

const rows = [];

export const FormattedColumnCell = ({ text }) => {
  return (
    <>
      <TableCell align="left">
        <Typography
          style={{
            color: "#5f6374",
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

export const BillTable = () => {
  return (
    <TableContainer
      components={{
        Container: function removeShadowAroundTable(props) {
          return <Paper {...props} elevation={0} />;
        },
      }}
      className={s.table}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <FormattedColumnCell text="Date" />
            <FormattedColumnCell text="Supplier" />
            <FormattedColumnCell text="Reference" />
            <FormattedColumnCell text="Amount Due" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">{row.supplier}</TableCell>
              <TableCell align="left">{row.reference}</TableCell>
              <TableCell align="left">{row.amountDue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
