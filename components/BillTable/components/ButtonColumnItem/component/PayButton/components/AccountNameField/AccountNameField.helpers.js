import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "white",
    border: "1px solid rgba(221,221,221,1)",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
  },
}));
