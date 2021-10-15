import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
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

export const BillTable = ({
  billData,
  accountData,
  billStatus,
  mutateBills,
}) => {
  const { state, onViewModalClose, onPayModalClose } =
    useContext(BillModalContext);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                billData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((bill) => (
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
          count={billData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};
