import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
//import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
//import { useGetUserQuery } from "../../state/api";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";

const Layout = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { user } = useAuth();
  //console.log(user);

  if (!user) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return (
    <Box width={"100%"} height={"100%"} display={isMobile ? "block" : "flex"}>
      <Sidebar
        user={user || {}}
        isMobile={isMobile}
        drawerWidth={"250px"}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      ></Sidebar>
      <Box flexGrow={1}>
        <Navbar
          user={user || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setIsModalOpen={setIsModalOpen}
          setModalContent={setModalContent}
        ></Navbar>
        <Outlet></Outlet>
      </Box>

      <Modal isVisible={isModalOpen} setIsVisible={setIsModalOpen}>
        {modalContent}
      </Modal>
    </Box>
  );
};

export default Layout;
