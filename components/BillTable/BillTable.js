import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ButtonColumnItem } from "./components/ButtonColumnItem/ButtonColumnItem";
import { ViewModal } from "./components/ButtonColumnItem/component/ViewButton/components/ViewModal/ViewModal";
import { PayModal } from "./components/ButtonColumnItem/component/PayButton/components/PayModal/PayModal";
import s from "./BillTable.module.css";
import {
  getFormattedAmount,
  getFormattedDate,
  FormattedCell,
} from "./BillTable.helpers";
import { BillModalContext } from "../ModalStore/ModalStore";

export const BillTable = ({
  billData,
  accountData,
  billStatus,
  mutateBills,
  pageNumber,
  setPageNumber,
  rowsPerPage,
  setRowsPerPage,
  totalResults,
}) => {
  const { state, onViewModalClose, onPayModalClose } =
    useContext(BillModalContext);

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(1);
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
            mutateBills={mutateBills}
          />
        </>
      )}
      <div className={s.table}>
        <TableContainer
          components={{
            Container: function removeShadowAroundTable(props) {
              return <Paper {...props} elevation={0} />;
            },
          }}
        >
          <Table
            sx={{ minWidth: 650, tableLayout: "fixed" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <FormattedCell text="Date" colour="#5f6374" fontSize="14px" />
                <FormattedCell
                  text="Supplier"
                  colour="#5f6374"
                  fontSize="14px"
                />
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
                    <FormattedCell text={getFormattedDate(bill.issueDate)} />
                    <FormattedCell text={bill.supplierName} />
                    <FormattedCell text={bill.accountName} />
                    <FormattedCell
                      text={getFormattedAmount(bill.currency, bill.amountDue)}
                    />
                    <TableCell className={s.buttonsTableCell}>
                      <ButtonColumnItem
                        billData={bill}
                        billStatus={billStatus}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalResults}
          rowsPerPage={rowsPerPage}
          page={pageNumber - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          SelectProps={{
            MenuProps: {
              disableScrollLock: true,
            },
          }}
        />
      </div>
    </>
  );
};
