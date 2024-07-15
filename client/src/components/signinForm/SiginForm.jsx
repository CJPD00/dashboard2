import { useState, useEffect } from "react";
import { Paper, Chip, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { Face, Login } from "@mui/icons-material";

const SiginForm = () => {
  const theme = useTheme();
  const [dataForm, setDataForm] = useState({});
  //inputs errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleBlurEmail = () => {
    if (!dataForm.email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleBlurPassword = () => {
    if (!dataForm.password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleChange = (e) => {
    if (dataForm.email) {
      setEmailError(false);
    }
    if (dataForm.password) {
      setPasswordError(false);
    }
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataForm);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        width: "100%",
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <Chip
        label="Acceso"
        icon={<Face />}
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "center",
          //width: "50%",
        }}
        color="secondary"
        variant="outlined"
      />

      <TextField
        label="Email"
        type="email"
        variant="standard"
        size="small"
        name="email"
        value={dataForm.email}
        error={emailError}
        onBlur={handleBlurEmail}
        onChange={(e) => handleChange(e)}
        sx={{
          mb: 2,
          width: "100%",
        }}
      />

      <TextField
        label="Contraseña"
        type="password"
        variant="standard"
        size="small"
        name="password"
        value={dataForm.password}
        error={passwordError}
        onBlur={handleBlurPassword}
        onChange={(e) => handleChange(e)}
        sx={{ mb: 2, width: "100%" }}
      />

      <Button
        variant="contained"
        color="secondary"
        sx={{ width: "100%" }}
        startIcon={<Login />}
        onClick={handleSubmit}
      >
        Iniciar Sesion
      </Button>
    </Paper>
  );
};

export default SiginForm;
