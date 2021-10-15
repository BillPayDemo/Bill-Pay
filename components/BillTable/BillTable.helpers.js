import moment from "moment";
import getSymbolFromCurrency from "currency-symbol-map";
import { Typography } from "@codat/orchard-ui";
import TableCell from "@mui/material/TableCell";

export const getFormattedAmount = (unformattedSymbol, unformattedAmount) => {
  const formattedSymbol = getSymbolFromCurrency(unformattedSymbol);
  const formattedAmount = unformattedAmount
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedSymbol.concat(formattedAmount);
};

export const FormattedCell = ({
  text,
  colour = "#6F749A",
  fontSize = "",
  align = "left",
  width = "",
  padding = "16px",
  fontWeight = "",
}) => {
  return (
    <>
      <TableCell align={align} width={width} style={{ padding: padding }}>
        <Typography
          style={{
            margin: 0,
            color: colour,
            fontSize: fontSize,
            fontWeight: fontWeight,
          }}
          variant="small"
        >
          {text}
        </Typography>
      </TableCell>
    </>
  );
};

export const getFormattedDate = (date) => moment(date).format("MMM DD, YYYY");
