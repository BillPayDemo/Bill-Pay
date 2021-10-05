import getSymbolFromCurrency from "currency-symbol-map";
import { Typography } from "@codat/orchard-ui";
import TableCell from "@mui/material/TableCell";

export const getFormattedAmountDue = (unformattedSymbol, unformattedAmount) => {
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
  paddingLeft = "16px",
}) => {
  return (
    <>
      <TableCell
        align={align}
        width={width}
        style={{ paddingLeft: paddingLeft }}
      >
        <Typography
          style={{
            margin: 0,
            color: colour,
            fontSize: fontSize,
          }}
          variant="small"
        >
          {text}
        </Typography>
      </TableCell>
    </>
  );
};
