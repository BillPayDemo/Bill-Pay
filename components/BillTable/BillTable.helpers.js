import getSymbolFromCurrency from "currency-symbol-map";

export const getFormattedAmountDue = (unformattedSymbol, unformattedAmount) => {
  const formattedSymbol = getSymbolFromCurrency(unformattedSymbol);
  const formattedAmount = unformattedAmount
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedSymbol.concat(formattedAmount);
};
