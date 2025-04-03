//import React from 'react'
import { Button, TextField, useTheme } from "@mui/material";
import { useState } from "react";
import { useUploadEstatutoMutation } from "../../state/api";
import { notification } from "antd";

const Estatuto = ({ setIsModalOpen }) => {
  const [archivoError, setArchivoError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [file, setFile] = useState(null);

  const [uploadEstatuto] = useUploadEstatutoMutation();

  const theme = useTheme();

  const handleChangeFile = (e) => {
    setArchivoError(false);
    setMessageError("");
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handleClick = async () => {
    //console.log(file);
    if (!file) {
      setArchivoError(true);
      setMessageError("Por favor seleccione un archivo");
    }
    const formData = new FormData();
    formData.append("recurso", file, file.name);

    try {
      const response = await uploadEstatuto({ file: formData });
      console.log("estoy aqui");
      if (response.error) {
        setArchivoError(true);
        setMessageError("Archivo no válido");
        return;
      }
      setIsModalOpen(false);
      notification["success"]({
        message: "Estatuto guardado exitosamente",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="editForm"
      style={{
        backgroundColor: theme.palette.background.alt,
        color: theme.palette.text.primary,
        padding: "1rem",
        //borderRadius: "10px",
        //boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
      }}
    >
      <TextField
        //label="Buscar archivo"
        name="recurso"
        type="file"
        variant="filled"
        size="small"
        error={archivoError}
        helperText={messageError}
        //onBlur={handleBlur}
        //value={file}
        onChange={(e) => handleChangeFile(e)}
        sx={{
          mb: 2,
          width: "100%",
          cursor: "pointer",
          textAlign: "left",
          color: "black",
          //display: "none",
          "&:hover": {
            color: theme.palette.primary.main,
          },
          "&:focus": {
            color: theme.palette.primary.main,
          },
          "&:active": {
            color: theme.palette.primary.main,
          },
          "&:disabled": {
            color: theme.palette.primary.main,
          },
          "&:disabled:hover": {
            color: theme.palette.primary.main,
          },
          input: {
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "0.5rem",
            "&:hover": {
              borderColor: theme.palette.primary.main,
              cursor: "pointer",
            },
            "&:focus": {
              borderColor: theme.palette.primary.main,
              boxShadow: "0 0 0 2px #ccc",
            },
          },
        }}
      />

      {/* {textError ? (
        <Alert
          severity="error"
          sx={{
            width: "100%",
            padding: "0.5rem",
            backgroundColor: "transparent",
            mb: 2,
          }}
        >
          {messageError}
        </Alert>
      ) : (
        <></>
      )} */}
      <Button
        variant="contained"
        color="secondary"
        sx={{ width: "100%" }}
        onClick={handleClick}
      >
        Guardar
      </Button>
    </div>
  );
};

export default Estatuto;
