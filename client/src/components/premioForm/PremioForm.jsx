//import React from 'react'
import { useCreatePremioMutation } from "../../state/api";
import { TextField, Alert } from "@mui/material";
import { useTheme, Button } from "@mui/material";
import { useState } from "react";

const PremioForm = ({ setIsModalOpen }) => {
  const theme = useTheme();
  const [dataForm, setDataForm] = useState({});
  const [messageError, setMessageError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [file, setFile] = useState(null);
  const [archivoError, setArchivoError] = useState(false);
  const [messageError2, setMessageError2] = useState(null);

  const [createPremio, error] = useCreatePremioMutation();

  const handleBlur = () => {
    if (
      dataForm.title === "" ||
      !dataForm.title ||
      dataForm.description === "" ||
      !dataForm.description
    ) {
      setMessageError("Todos los campos son obligatorios");
      setTextError(true);
    } else {
      setMessageError(null);
      setTextError(false);
    }
  };

  const handlerChange = (e) => {
    if (
      dataForm.title === "" ||
      !dataForm.title ||
      !dataForm.title.trim() === "" ||
      dataForm.description === "" ||
      !dataForm.description ||
      !dataForm.description.trim() === ""
    ) {
      setMessageError("Todos los campos son obligatorios");
      setTextError(true);
    } else {
      setMessageError(null);
      setTextError(false);
    }
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
    setArchivoError(false);
    setMessageError2(null);
  };

  const handleClick = async () => {
    //console.log(dataForm);
    if (dataForm.title === "") {
      setMessageError("Todos los campos son obligatorios");
      setTextError(true);
      return;
    }
    if (!file) {
      setArchivoError(true);
      setMessageError2("Por favor seleccione un archivo");
      return;
    } else if (textError) {
      return;
    } else {
      try {
        const formData = new FormData();
        formData.append("recurso", file, file.name);
        formData.append("premio", JSON.stringify(dataForm));
        const response = await createPremio(formData);
        if (response.error) {
          setArchivoError(true);
          setMessageError2("Archivo no permitido");
          return;
        }
        setIsModalOpen(false);
        //console.log(response);
      } catch (error) {
        setMessageError(error.message);
      }
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
        helperText={messageError2}
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
      <TextField
        label="Titulo"
        name="title"
        type="text"
        variant="standard"
        size="small"
        error={textError}
        onBlur={handleBlur}
        value={dataForm.title}
        onChange={(e) => handlerChange(e)}
        sx={{ mb: 2, width: "100%" }}
      />
      <TextField
        label="Descripcion"
        name="description"
        type="textArea"
        multiline
        rows={4}
        variant="standard"
        size="small"
        error={textError}
        onBlur={handleBlur}
        value={dataForm.description}
        onChange={(e) => handlerChange(e)}
        sx={{ mb: 2, width: "100%" }}
      />

      {textError ? (
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
      )}
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

export default PremioForm;
