import { Modal as AntModal } from "antd";
import { useTheme } from "@mui/material";

const Modal = ({
  isVisible = false,
  title,
  setIsVisible,
  children,
  ...props
}) => {
  const theme = useTheme();

  return (
    <AntModal
      open={isVisible}
      title={title}
      centered
      onCancel={() => setIsVisible(false)}
      footer={false}
      {...props}
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.text.primary}`,
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        zIndex: 1000,

        //maxWidth: "800px",
        //width: "100%",

        //height: "100%",
      }}
    >
      {children}
    </AntModal>
  );
};

export default Modal;
