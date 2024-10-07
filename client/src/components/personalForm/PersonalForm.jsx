//import React from 'react'
import {
  TextField,
  Button,
  useTheme,
  Alert,
  Autocomplete,
} from "@mui/material";
import { useState } from "react";
import { getNames, getCode } from "country-list";
import { verifyEmail } from "../../helpers/authHelper";
import { useCreatePersonalMutation } from "../../state/api";
import { notification } from "antd";

const PersonalForm = ({ id, setIsModalOpen }) => {
  const theme = useTheme();
  const [dataForm, setDataForm] = useState({
    country: "CU",
    projecto: `${id}`,
  });
  const [messageError, setMessageError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [autocompleteValor, setAutocompleteValor] = useState(null);
  const [autoCompleteError, setAutocompleteError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const [createPersonal, error] = useCreatePersonalMutation();

  const countries = getNames().map((name) => ({
    name,
    code: getCode(name),
  }));

  //console.log(countries);
  const opciones =
    countries?.length > 0
      ? countries.map((item) => {
          return { label: item?.name, value: item?.code };
        })
      : [];

  const handleAutocompleteChange = (event, newValue) => {
    setAutocompleteValor(newValue);
    setDataForm({ ...dataForm, country: newValue?.value });
    setAutocompleteError(false);
    setHelperText("");
    console.log(dataForm);
  };

  const handleBlur = () => {
    if (
      dataForm.name === "" ||
      !dataForm.name ||
      dataForm.lastname === "" ||
      !dataForm.lastname ||
      !dataForm.email ||
      dataForm.email.trim() === ""
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
      dataForm.name === "" ||
      !dataForm.name ||
      !dataForm.name.trim() === "" ||
      dataForm.lastname === "" ||
      !dataForm.lastname ||
      !dataForm.lastname.trim() === "" ||
      !dataForm.email ||
      dataForm.email.trim() === ""
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
    if (
      dataForm.nombre === "" ||
      !dataForm.lastname ||
      dataForm.lastname === ""
    ) {
      setMessageError("Todos los campos son obligatorios");
      setTextError(true);
      // setAutocompleteError(true);
      // setHelperText("Por favor, selecciona un departamento");
      return;
    } else if (!verifyEmail(dataForm.email)) {
      setMessageError("Correo electrónico inválido");
      setTextError(true);
      return;
    } else if (textError) {
      return;
    } else {
      try {
        const response = await createPersonal(dataForm);
        console.log(response);
        if (response.error) {
          setMessageError("correo en uso");
          setTextError(true);
          return;
        }
        setIsModalOpen(false);
        notification.success({
          message: "Creado con exito",
          description: "Personal creado con exito",
        });
        //console.log(response.error);
      } catch (error) {
        setMessageError(error.message);
      }
      console.log(dataForm);
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
        label="Nombre"
        name="name"
        type="text"
        variant="standard"
        size="small"
        error={textError}
        //onBlur={handleBlur}
        value={dataForm.name}
        onKeyDown={(e) => {
          if (!/[a-zA-Z ]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={(e) => handlerChange(e)}
        sx={{ mb: 2, width: "100%" }}
      />
      <TextField
        label="Apellido"
        name="lastname"
        type="text"
        variant="standard"
        size="small"
        error={textError}
        onBlur={handleBlur}
        value={dataForm.lastname}
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
        label="Email"
        name="email"
        type="email"
        variant="standard"
        size="small"
        error={textError}
        onBlur={handleBlur}
        value={dataForm.email}
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
            label="Pais (opcional)"
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

export default PersonalForm;
