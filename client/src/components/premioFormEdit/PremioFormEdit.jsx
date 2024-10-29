//import React from 'react'
import { TextField, Alert, Autocomplete } from "@mui/material";
import { useTheme, Button } from "@mui/material";
import { useState, useEffect } from "react";
import {
  useUpdatePremioMutation,
  useGetTiposPremioQuery,
} from "../../state/api";
import { notification } from "antd";

const PremioFormEdit = ({
  setIsModalOpen,
  _id,
  title,
  description,
  cantidadProjectos,
  tipo,
}) => {
  const theme = useTheme();
  const [dataForm, setDataForm] = useState({});
  const [messageError, setMessageError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [autocompleteValor, setAutocompleteValor] = useState(null);
  const [autoCompleteError, setAutocompleteError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const [updatePremio, error] = useUpdatePremioMutation();
  const { data } = useGetTiposPremioQuery();

  useEffect(() => {
    setDataForm({
      _id: _id,
      title: title,
      description: description,
      cantidadProjectos: cantidadProjectos,
      tipo: tipo,
    });

    setAutocompleteValor(tipo);
  }, [title, description, cantidadProjectos, _id, tipo]);

  //console.log(dataForm);

  const opciones =
    data?.tiposPremios?.length > 0
      ? data.tiposPremios.map((item) => {
          return { label: item?.name, value: item?._id };
        })
      : [];

  const handleAutoCompleteChange = (event, value) => {
    setAutocompleteValor(value);
    setAutocompleteError(false);
    setHelperText(" ");
    setDataForm({ ...dataForm, tipo: value?.label });
  };

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

  const handleClick = async () => {
    //console.log(dataForm);

    if (!autocompleteValor) {
      setAutocompleteError(true);
      setHelperText("elige un tipo de premio");
      return;
    }
    if (dataForm.title === "") {
      setMessageError("Todos los campos son obligatorios");
      setTextError(true);
      return;
    } else if (textError) {
      return;
    } else {
      try {
        const response = await updatePremio(dataForm);
        if (response.error) {
          setTextError(true);
          setMessageError("El nombre ya está en uso");
          return;
        }
        setIsModalOpen(false);
        notification["success"]({
          message: "Premio actualizado correctamente",
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
      <Autocomplete
        options={opciones}
        value={autocompleteValor}
        onChange={handleAutoCompleteChange}
        sx={{ width: "100%", mb: 2 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tipo"
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

export default PremioFormEdit;
