import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  HomeOutlined,
  ApartmentOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  BuildOutlined,
  PublicOutlined,
  CalendarMonthOutlined,
  PieChartOutline,
  BorderColorOutlined,
  EmojiEventsOutlined,
  AssignmentOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import noAvatar from "../../assets/noAvatar.png";
import { useGetAvatarQuery } from "../../state/api";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Datos",
    icon: null,
  },
  {
    text: "Departamentos",
    icon: <ApartmentOutlined />,
  },
  {
    text: "Carreras",
    icon: <BuildOutlined />,
  },
  {
    text: "Usuarios",
    icon: <Groups2Outlined />,
  },
  {
    text: "Proyectos",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Agenda",
    icon: null,
  },
  {
    text: "Eventos",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Tareas",
    icon: <AssignmentOutlined />,
  },
  {
    text: "Promociones",
    icon: null,
  },
  {
    text: "Publicaciones",
    icon: <BorderColorOutlined />,
  },
  {
    text: "Premios",
    icon: <EmojiEventsOutlined />,
  },
  {
    text: "Estadísticas",
    icon: null,
  },
  {
    text: "Geografia",
    icon: <PublicOutlined />,
  },
  {
    text: "Desglose",
    icon: <PieChartOutline />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isMobile,
  user,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const { data, isLoading } = useGetAvatarQuery(user.avatar);

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => {
            setIsSidebarOpen(false);
          }}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[200],
              borderWidth: isMobile ? "0" : "2px",
              transition: "transform 1s ease-in-out",
            },
          }}
        >
          <Box width={"100%"}>
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    CÀTEDRA
                  </Typography>
                </Box>
                {isMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeftOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={user.avatar ? data?.url ?? noAvatar : noAvatar}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user && user.name}
                </Typography>
                {/* <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user && user.role}
                </Typography> */}
              </Box>
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
