import {
  LightModeOutlined,
  DarkModeOutlined,
  MenuOutlined,
  //SearchOutlined,
  SettingsOutlined,
  LogoutOutlined,
  PersonAddAlt1Outlined,
} from "@mui/icons-material";
//import { useTheme } from "@mui/material";

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
import ConfigForm from "../configForm/ConfigForm";
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

  //console.log(data);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleUserEdit = () => {
    setIsModalOpen(true);
    setModalContent(<UserFormEdit setIsModalOpen={setIsModalOpen} />);
    setModalTitle("Editar Perfil");
  };

  const handleConfigEdit = () => {
    setIsModalOpen(true);
    setModalContent(<ConfigForm setIsModalOpen={setIsModalOpen} />);
    setModalTitle("Configuraciones");
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
          <Tooltip title="Menu">
            <IconButton
              onClick={() => {
                isSidebarOpen
                  ? setIsSidebarOpen(false)
                  : setIsSidebarOpen(true);
              }}
              //sx={{ height: "80px", ml: "1rem" }}
            >
              <MenuOutlined></MenuOutlined>
            </IconButton>
          </Tooltip>
          {/* <h1
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              color: theme.palette.text.primary,
            }}
          >
            Catedra Honorífica de Ciencias Tecnicas
          </h1> */}
          {/* <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Cátedra
          </Typography> */}
          {/* <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius={"9px"}
            gap={2}
            p={"0.1rem 1.5rem"}
          >
            <InputBase placeholder="Search..."></InputBase>
            <IconButton>
              <SearchOutlined></SearchOutlined>
            </IconButton>
          </FlexBetween> */}
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
          {user.role !== "user" && (
            <Tooltip title="Configuraciones">
              <IconButton onClick={handleConfigEdit}>
                <SettingsOutlined sx={{ fontSize: "25px" }}></SettingsOutlined>
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Editar Perfil">
            <IconButton onClick={handleUserEdit}>
              <PersonAddAlt1Outlined
                sx={{ fontSize: "25px" }}
              ></PersonAddAlt1Outlined>
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
              <Tooltip title="Cerrar Sesión">
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
