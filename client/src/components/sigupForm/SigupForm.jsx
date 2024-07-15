import { useState, useEffect } from "react";
import { Paper, Chip, TextField, Button, Alert } from "@mui/material";
import { useTheme } from "@mui/material";
import { Lock, AppRegistration } from "@mui/icons-material";
import {
  comparePasswords,
  verifyEmail,
  verifyPassword,
} from "../../helpers/authHelper";

const SigupForm = () => {
  const theme = useTheme();
  const [dataForm, setDataForm] = useState({});
  //inputs errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  //message validation
  const [messageError, setMessageError] = useState();
  //sucess registration
  const [successRegistration, setSuccessRegistration] = useState(false);

  const handleBlurEmail = () => {
    if (!verifyEmail(dataForm.email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleBlurPassword = () => {
    if (!verifyPassword(dataForm.password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleBlurName = () => {
    if (!dataForm.name) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const handleBlurConfirmPassword = () => {
    if (!comparePasswords(dataForm.password, dataForm.confirmPassword)) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  };

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessageError(null);
    setSuccessRegistration(false);

    //console.log(dataForm);

    if (
      !dataForm.email ||
      !dataForm.password ||
      !dataForm.name ||
      !dataForm.lastname ||
      !dataForm.confirmPassword
    ) {
      setMessageError("Todos los campos son obligatorios");
      return;
    } else if (nameError) {
      setMessageError("Los campos nombre y apellido son obligatorios");
      return;
    } else if (emailError) {
      setMessageError("Ingrese un correo valido");
      return;
    } else if (passwordError) {
      setMessageError(
        "Ingrese una contraseña de 8 a 15 caracteres y al menos un numero y una letra mayuscula y minuscula y un caracter especial !"
      );
      return;
    } else if (!comparePasswords(dataForm.password, dataForm.confirmPassword)) {
      setConfirmPasswordError(true);
      setMessageError("Las contraseñas no coinciden");
      return;
    } else if (
      verifyEmail(dataForm.email) &&
      verifyPassword(dataForm.password)
    ) {
      setMessageError(null);
    }

    setSuccessRegistration(true);
    setTimeout(() => setSuccessRegistration(false), 2000);
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
        label="Registro"
        icon={<Lock />}
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
        label="Nombre"
        type="text"
        variant="standard"
        size="small"
        name="name"
        value={dataForm.name}
        error={nameError}
        onBlur={handleBlurName}
        onChange={(e) => handleChange(e)}
        sx={{
          mb: 2,
          width: "100%",
        }}
      />

      <TextField
        label="Apellidos"
        type="text"
        variant="standard"
        size="small"
        name="lastname"
        value={dataForm.lastname}
        error={nameError}
        onBlur={handleBlurName}
        onChange={(e) => handleChange(e)}
        sx={{
          mb: 2,
          width: "100%",
        }}
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

      <TextField
        label="Confirmar Contraseña"
        type="password"
        variant="standard"
        size="small"
        name="confirmPassword"
        value={dataForm.confirmPassword}
        error={confirmPasswordError}
        onBlur={handleBlurConfirmPassword}
        onChange={(e) => handleChange(e)}
        sx={{ mb: 2, width: "100%" }}
      />

      <Button
        variant="contained"
        color="secondary"
        sx={{ width: "100%" }}
        startIcon={<AppRegistration />}
        onClick={handleSubmit}
      >
        Registrarse
      </Button>

      {messageError || messageError === "" ? (
        <Alert
          severity="error"
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            //color: theme.palette.primary[200],
            width: "100%",
            textAlign: "center",
            fontSize: "0.8rem",
            p: 1,
            borderRadius: "5px",
            backgroundColor: theme.palette.background.alt,
            border: `1px solid ${theme.palette.primary[300]}`,

            "& .MuiAlert-icon": {
              //color: theme.palette.primary[200],
            },

            "& .MuiAlert-message": {
              // color: theme.palette.primary[200],
            },

            "& .MuiAlert-action": {
              // color: theme.palette.primary[200],
            },

            "& .MuiAlert-root": {
              //color: theme.palette.primary[200],
            },
          }}
        >
          {messageError}
        </Alert>
      ) : null}
      {successRegistration ? (
        <Alert
          severity="success"
          autoHideDuration={3000}
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            //color: theme.palette.primary[200],
            width: "100%",
            textAlign: "center",
            fontSize: "0.8rem",
            p: 1,
            borderRadius: "5px",
            backgroundColor: theme.palette.background.alt,
            border: `1px solid ${theme.palette.primary[300]}`,

            "& .MuiAlert-icon": {
              //color: theme.palette.primary[200],
            },

            "& .MuiAlert-message": {
              // color: theme.palette.primary[200],
            },

            "& .MuiAlert-action": {
              // color: theme.palette.primary[200],
            },

            "& .MuiAlert-root": {
              //color: theme.palette.primary[200],
            },
          }}
        >
          Registro exitoso
        </Alert>
      ) : null}
    </Paper>
  );
};

export default SigupForm;
