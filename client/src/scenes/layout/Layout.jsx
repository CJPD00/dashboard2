import { useState } from "react";
import { useTheme } from "@mui/material";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
//import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
//import { useGetUserQuery } from "../../state/api";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import useModal from "../../hooks/useModal";

const Layout = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [modalContent, setModalContent] = useState(<></>);
  // const [modalTitle, setModalTitle] = useState("");
  const { user } = useAuth();

  const {
    isModalOpen,
    setIsModalOpen,
    modalContent,
    setModalContent,
    modalTitle,
    setModalTitle,
  } = useModal();

  //console.log(user);

  if (!user) {
    return <Navigate to="/login" replace></Navigate>;
  }

  //console.log(user);

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
          setModalTitle={setModalTitle}
        ></Navbar>
        <Outlet></Outlet>
      </Box>

      <Modal
        isVisible={isModalOpen}
        setIsVisible={setIsModalOpen}
        title={modalTitle}
      >
        {modalContent}
      </Modal>
    </Box>
  );
};

export default Layout;
