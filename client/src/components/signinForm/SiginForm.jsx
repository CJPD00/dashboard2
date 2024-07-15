import { useState, useEffect } from "react";
import { Paper, Chip, TextField, Button, Alert } from "@mui/material";
import { useTheme } from "@mui/material";
import { Face, Login } from "@mui/icons-material";
import { Navigate } from "react-router-dom";
import { verifyEmail, verifyPassword } from "../../helpers/authHelper";
import { login } from "../../state/user";

const SiginForm = () => {
  const theme = useTheme();
  const [dataForm, setDataForm] = useState({});
  //inputs errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  //message validation
  const [messageError, setMessageError] = useState();
  //sucess login
  const [successLogin, setSuccessLogin] = useState(false);

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

  const handleChange = (e) => {
    if (verifyEmail(dataForm.email)) {
      setEmailError(false);
    }
    if (verifyPassword(dataForm.password)) {
      setPasswordError(false);
    }
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessageError(null);
    setSuccessLogin(false);

    if (!dataForm.email || !dataForm.password) {
      setMessageError("Todos los campos son obligatorios");
      return;
    } else if (emailError) {
      setMessageError("Ingrese un correo valido");
      return;
    } else if (passwordError) {
      setMessageError(
        "contraseña incorrecta, por favor verifique e intente de nuevo"
      );
      return;
    } else if (
      verifyEmail(dataForm.email) &&
      verifyPassword(dataForm.password)
    ) {
      setMessageError(null);
    }

    const response = await login(dataForm);

    if (response.message) {
      setMessageError(response.message);
      return;
    }

    const { accessToken, refreshToken } = response;

    console.log(accessToken, refreshToken);
    // localStorage.setItem("accessToken", accessToken);
    // localStorage.setItem("refreshToken", refreshToken);

    setSuccessLogin(true);
    //console.log(successLogin);

    return <Navigate to="/" />;
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
      {successLogin ? (
        <Alert
          severity="success"
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
          Login exitoso
        </Alert>
      ) : null}
    </Paper>
  );
};

export default SiginForm;
