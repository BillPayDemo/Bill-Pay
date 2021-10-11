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
import { getFormattedAmount, FormattedCell } from "./BillTable.helpers";
import { ViewModal } from "./components/ButtonColumnItem/component/ViewButton/components/ViewModal/ViewModal";
import { PayModal } from "./components/ButtonColumnItem/component/PayButton/components/PayModal/PayModal";
import { useContext } from "react";
import { BillModalContext } from "../ModalStore/ModalStore";
import { Button } from "@codat/orchard-ui";
import axios from "axios";
import { useState, useEffect } from "react";

export const BillTable = ({ billData, accountData }) => {
  const { state, onViewModalClose, onPayModalClose } =
    useContext(BillModalContext);

  const [companyId, setCompanyId] = useState("");
  useEffect(() => {
    setCompanyId(window.sessionStorage.getItem("companyId"));
  }, [setCompanyId]);

  const handleSyncClick = () => {
    axios.post("/api/bills", { action: "sync", companyId: companyId });
  };

  return (
    <>
      {billData && (
        <>
          <ViewModal
            isViewModalOpen={state.isViewModalOpen}
            handleViewModalClose={onViewModalClose}
            billData={billData}
          />
          <PayModal
            isPayModalOpen={state.isPayModalOpen}
            handlePayModalClose={onPayModalClose}
            billData={billData}
            accountData={accountData}
          />
        </>
      )}
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
              <FormattedCell
                text="Reference"
                colour="#5f6374"
                fontSize="14px"
              />
              <FormattedCell
                text="Amount Due"
                colour="#5f6374"
                fontSize="14px"
              />
              <FormattedCell text="" />
            </TableRow>
          </TableHead>
          <TableBody>
            {billData &&
              billData.map((bill) => (
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
                    text={getFormattedAmount(bill.currency, bill.amountDue)}
                  />
                  <TableCell className={s.buttonsTableCell}>
                    <ButtonColumnItem billData={bill} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Button label="Sync" onClick={handleSyncClick} />
      </TableContainer>
    </>
  );
};
