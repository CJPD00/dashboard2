import { Modal as MuiModal, useTheme } from "@mui/material";

const Modal = ({ isVisible = false, setIsVisible, children, ...props }) => {
  const theme = useTheme();

  return (
    <MuiModal
      open={isVisible}
      onClose={() => setIsVisible(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...props}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {children}
    </MuiModal>
  );
};

export default Modal;
