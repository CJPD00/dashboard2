import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useGetUserQuery } from "../../state/api";

const Layout = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);
  //console.log(data);

  return (
    <Box width={"100%"} height={"100%"} display={isMobile ? "block" : "flex"}>
      <Sidebar
        user={data || {}}
        isMobile={isMobile}
        drawerWidth={"250px"}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      ></Sidebar>
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        ></Navbar>
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};

export default Layout;
