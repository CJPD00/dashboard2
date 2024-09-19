import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
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
    <Dialog
      open={isVisible}
      onClose={() => setIsVisible(false)}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: theme.palette.background.default,
        },
        "& .MuiDialogTitle-root": {
          backgroundColor: theme.palette.background.default,
        },

        "& .MuiDialogContent-root": {
          backgroundColor: theme.palette.background.default,
          borderTop: `1px solid ${theme.palette.divider}`,
        },
        "& .MuiDialogActions-root ": {
          backgroundColor: theme.palette.background.default,

        }
      }}
    >
      <DialogTitle id="dialog-title" sx={{ textAlign: "center" }}>
        {title}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => setIsVisible(false)} color="secondary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
