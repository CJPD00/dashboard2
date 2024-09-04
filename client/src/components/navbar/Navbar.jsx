import {
  LightModeOutlined,
  DarkModeOutlined,
  MenuOutlined,
  SearchOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

import FlexBetween from "../FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../../state";
import noAvatar from "../../assets/noAvatar.png";
import { logout } from "../../state/auth";
import {
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  //Button,
  Box,
  Typography,
  //MenuItem,
  //Menu,
  Tooltip,
} from "@mui/material";
import UserFormEdit from "../userFormEdit/UserFormEdit";
import { useState } from "react";
import { useGetAvatarQuery } from "../../state/api";

const Navbar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  user,
  setIsModalOpen,
  setModalContent,
  setModalTitle,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { data, isLoading } = useGetAvatarQuery(user.avatar);

  //console.log(user);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleUserEdit = () => {
    setIsModalOpen(true);
    setModalContent(<UserFormEdit />);
    setModalTitle("Editar Perfil");
  };

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
          <Tooltip title="Cambiar Tema">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }}></DarkModeOutlined>
              ) : (
                <LightModeOutlined
                  sx={{ fontSize: "25px" }}
                ></LightModeOutlined>
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Configuraciones">
            <IconButton onClick={handleUserEdit}>
              <SettingsOutlined></SettingsOutlined>
            </IconButton>
          </Tooltip>
          <FlexBetween>
            <Box
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
                src={user.avatar ? data?.url ?? noAvatar : noAvatar}
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
                  {user && user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user && user.role}
                </Typography>
              </Box>
              <Tooltip title="Cerrar Sesion">
                <IconButton
                  onClick={handleLogout}
                  //sx={{ color: theme.palette.secondary[100] }}
                >
                  <LogoutOutlined
                    sx={{
                      color: theme.palette.secondary[300],
                      fontSize: "25px",
                    }}
                  ></LogoutOutlined>
                </IconButton>
              </Tooltip>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
