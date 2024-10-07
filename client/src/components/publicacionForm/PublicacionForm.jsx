//import React from 'react'
import { TextField, Alert, Autocomplete } from "@mui/material";
import { useTheme, Button } from "@mui/material";
import { useState } from "react";
import {
  useCreatePublicacionesMutation,
  useGetCareersQuery,
} from "../../state/api";
import { notification } from "antd";

const PublicacionForm = ({ setIsModalOpen }) => {
  const theme = useTheme();
  const [dataForm, setDataForm] = useState({});
  const [messageError, setMessageError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [autocompleteValor, setAutocompleteValor] = useState(null);
  const [autoCompleteError, setAutocompleteError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const [createPublicacion, error] = useCreatePublicacionesMutation();
  const { data, isLoading } = useGetCareersQuery();

  const opciones =
    data?.carreras?.length > 0
      ? data.carreras.map((item) => {
          return { label: item?.nombre, value: item?._id };
        })
      : [];

  const handleBlur = () => {
    if (
      dataForm.title === "" ||
      !dataForm.title ||
      dataForm.autor === "" ||
      !dataForm.autor ||
      !dataForm.link ||
      dataForm.link === ""
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
      dataForm.autor === "" ||
      !dataForm.autor ||
      !dataForm.autor.trim() === "" ||
      !dataForm.link ||
      dataForm.link === ""
    ) {
      setMessageError("Todos los campos son obligatorios");
      setTextError(true);
    } else {
      setMessageError(null);
      setTextError(false);
    }
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleAutocompleteChange = (event, newValue) => {
    setAutocompleteValor(newValue);
    setDataForm({ ...dataForm, carrera: newValue?.value });
    setAutocompleteError(false);
    setHelperText("");
    setMessageError("");
    setTextError(false);
  };

  const handleClick = async () => {
    //console.log(dataForm);
    if (
      dataForm.title === "" ||
      !dataForm.title ||
      dataForm.autor === "" ||
      !dataForm.autor ||
      dataForm.link === "" ||
      !dataForm.link
    ) {
      setMessageError("Todos los campos son obligatorios");
      setTextError(true);
      return;
    }
    if (
      !autocompleteValor ||
      !autocompleteValor.value ||
      autocompleteValor.value === ""
    ) {
      setAutocompleteError(true);
      setHelperText("Selecciona una carrera");
      // setMessageError("Todos los campos son obligatorios");
      // setTextError(true);
      return;
    } else if (textError) {
      return;
    } else {
      try {
        const response = await createPublicacion(dataForm);
        if (response.error) {
          setTextError(true);
          setMessageError("La publicación ya existe");
          return;
        }
        setIsModalOpen(false);
        notification.success({
          message: "Publicación Creada",
          description: "La publicación ha sido creada exitosamente",
        });
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
        label="Autor"
        name="autor"
        type="text"
        variant="standard"
        size="small"
        error={textError}
        onBlur={handleBlur}
        value={dataForm.autor}
        onKeyDown={(e) => {
          if (!/[a-zA-Z ]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        //error={passwordError}
        //onBlur={handleBlurPassword}
        onChange={(e) => handlerChange(e)}
        sx={{ mb: 2, width: "100%" }}
      />
      <TextField
        label="Link"
        name="link"
        type="text"
        variant="standard"
        size="small"
        error={textError}
        onBlur={handleBlur}
        value={dataForm.link}
        //error={passwordError}
        //onBlur={handleBlurPassword}
        onChange={(e) => handlerChange(e)}
        sx={{ mb: 2, width: "100%" }}
      />
      <Autocomplete
        options={opciones}
        value={autocompleteValor}
        onChange={handleAutocompleteChange}
        sx={{ width: "100%", mb: 2 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Carrera"
            variant="outlined"
            error={autoCompleteError}
            helperText={helperText}
          />
        )}
      ></Autocomplete>

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

export default PublicacionForm;
