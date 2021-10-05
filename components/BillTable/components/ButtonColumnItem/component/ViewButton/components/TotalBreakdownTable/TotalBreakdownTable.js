import React from "react";
import s from "./TotalBreakdownTable.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  getFormattedAmountDue,
  FormattedCell,
} from "../../../../../../BillTable.helpers.js";

const BillTotalTableRow = ({ billData }) => {
  const totalInformation = [
    { label: "Subtotal", value: billData.subTotal, id: 1 },
    { label: "Total Tax", value: billData.taxAmount, id: 2 },
    { label: "Total", value: billData.totalAmount, id: 3 },
  ];
  return (
    <TableBody>
      {totalInformation &&
        totalInformation.map((item) => (
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": {
                border: 0,
              },
            }}
            key={item.id}
          >
            <FormattedCell text={item.label ?? ""} width="25%" />
            <FormattedCell text={item.value ?? ""} width="25%" />
          </TableRow>
        ))}
    </TableBody>
  );
};

export const TotalBreakDownTable = ({ billData }) => {
  return (
    <div className={s.table}>
      <TableContainer
        components={{
          Container: function removeShadowAroundTable(props) {
            return <Paper {...props} elevation={0} />;
          },
        }}
        style={{ width: "30%" }}
      >
        <Table aria-label="simple table">
          <BillTotalTableRow billData={billData} />
        </Table>
      </TableContainer>
    </div>
  );
};
