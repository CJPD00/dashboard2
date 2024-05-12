import {
  LightModeOutlined,
  DarkModeOutlined,
  MenuOutlined,
  SearchOutlined,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";

import FlexBetween from "../FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../../state";
import profileImage from "../../assets/Designer (1).png";
import {
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
} from "@mui/material";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton
            onClick={() => {
              isSidebarOpen ? setIsSidebarOpen(false) : setIsSidebarOpen(true);
            }}
          >
            <MenuOutlined></MenuOutlined>
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius={"9px"}
            gap={2}
            p={"0.1rem 1.5rem"}
          >
            <InputBase placeholder="Search..."></InputBase>
            <IconButton>
              <SearchOutlined></SearchOutlined>
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/* RIGHT SIDE */}
        <FlexBetween gap={"1.5rem"}>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }}></DarkModeOutlined>
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }}></LightModeOutlined>
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined></SettingsOutlined>
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
