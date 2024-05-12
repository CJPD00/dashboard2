import { styled } from "@mui/material";

const FlexBetween = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    // if the screen is smaller than md
    flexDirection: "column",
  },
}));

export default FlexBetween;
