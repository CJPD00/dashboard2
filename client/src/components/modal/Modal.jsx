import { Modal as MuiModal } from "@mui/material";
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
    <MuiModal
      open={isVisible}
      onClose={() => setIsVisible(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      disableRestoreFocus = {true}
      disableScrollLock={false}
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        border: `1px solid ${theme.palette.text.primary}`,
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        p: 2,
        zIndex: 1000,
        width: "50%",
        height: "50%",
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.5)", 
        },

        "& .MuiPaper-root": {
          backgroundColor: "background.default",
          color: "text.primary",
          border: `1px solid ${theme.palette.text.primary}`,
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          p: 2,
        },
      }}
    >
      {children}
    </MuiModal>
  );
};

export default Modal;
