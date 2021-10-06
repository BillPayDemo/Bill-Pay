import React from "react";
import s from "./TotalBreakdownTable.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  getFormattedAmount,
  FormattedCell,
} from "../../../../../../BillTable.helpers.js";

const TotalCellFormatted = ({ text, fontWeight }) => {
  return (
    <FormattedCell
      text={text}
      width="25%"
      colour="#29262B"
      fontSize="14px"
      align="right"
      padding="8px 16px 8px 16px"
      fontWeight={fontWeight}
    />
  );
};

const BillTotalTableRow = ({ billData }) => {
  const totalInformation = [
    {
      label: "Subtotal",
      value: getFormattedAmount(billData.currency, billData.subTotal),
      id: 1,
    },
    {
      label: "Total Tax",
      value: getFormattedAmount(billData.currency, billData.taxAmount),
      id: 2,
    },
    {
      label: "Total",
      value: getFormattedAmount(billData.currency, billData.totalAmount),
      id: 3,
      fontWeight: "700",
    },
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
            <TotalCellFormatted
              text={item.label ?? ""}
              fontWeight={item.fontWeight ?? ""}
            />
            <TotalCellFormatted
              text={item.value ?? ""}
              fontWeight={item.fontWeight ?? ""}
            />
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
