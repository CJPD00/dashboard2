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
  Button,
  Box,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import { useState } from "react";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, user }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  //console.log(user);

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
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user && user.user && user.user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user && user.user && user.user.role}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              ></ArrowDropDownOutlined>
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
