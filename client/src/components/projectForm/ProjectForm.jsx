//import React from 'react'
import {
  TextField,
  Button,
  useTheme,
  Alert,
  Autocomplete,
} from "@mui/material";
import {
  useGetCareersQuery,
  useGetCareersByIdDepartamentoQuery,
} from "../../state/api";
import { useState } from "react";
import { useCreateProjectMutation } from "../../state/api";
import { notification } from "antd";
import useAuth from "../../hooks/useAuth";

const ProjectForm = ({ setIsModalOpen }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const [dataForm, setDataForm] = useState({});
  const [messageError, setMessageError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [autocompleteValor, setAutocompleteValor] = useState(null);
  const [autoCompleteError, setAutocompleteError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const { data, isLoading } = useGetCareersQuery();
  const { data: data2 } = useGetCareersByIdDepartamentoQuery({
    id: user?.departamento,
  });

  console.log(data2);

  const [createProject, error] = useCreateProjectMutation();

  const opciones =
    data?.carreras?.length > 0
      ? data.carreras.map((item) => {
          return { label: item?.nombre, value: item?._id };
        })
      : [];

  const opciones2 =
    data2?.carreras?.length > 0
      ? data2.carreras.map((item) => {
          return { label: item?.nombre, value: item?._id };
        })
      : [];

  const handleAutocompleteChange = (event, newValue) => {
    setAutocompleteValor(newValue);
    setDataForm({ ...dataForm, idCarrera: newValue?.value });
    setAutocompleteError(false);
    setHelperText("");
    //console.log(dataForm);
  };

  const handleBlur = () => {
    if (
      dataForm.titulo === "" ||
      !dataForm.titulo ||
      dataForm.description === "" ||
      !dataForm.description ||
      !dataForm.autor ||
      dataForm.autor === ""
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
      dataForm.titulo === "" ||
      !dataForm.titulo ||
      !dataForm.titulo.trim() === "" ||
      dataForm.description === "" ||
      !dataForm.description ||
      !dataForm.description.trim() === "" ||
      !dataForm.autor ||
      !dataForm.autor.trim() === "" ||
      dataForm.autor === ""
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
      dataForm.titulo === "" ||
      !dataForm.idCarrera ||
      dataForm.idCarrera === ""
    ) {
      setMessageError("Todos los campos son obligatorios");
      setTextError(true);
      setAutocompleteError(true);
      setHelperText("Por favor, selecciona un departamento");
      return;
    } else if (textError) {
      return;
    } else {
      try {
        const response = await createProject(dataForm);
        if (response.error) {
          setTextError(true);
          setMessageError("El proyecto ya existe");
          return;
        }
        setIsModalOpen(false);
        notification.success({
          message: "Proyecto creado exitosamente",
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
        name="titulo"
        type="text"
        variant="standard"
        size="small"
        error={textError}
        //onBlur={handleBlur}
        value={dataForm.titulo}
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
        //onBlur={handleBlur}
        value={dataForm.autor}
        onKeyDown={(e) => {
          if (!/[a-zA-Z ]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={(e) => handlerChange(e)}
        sx={{ mb: 2, width: "100%" }}
      />
      <TextField
        label="Descripción"
        name="description"
        type="textarea"
        variant="standard"
        multiline
        rows={4}
        size="small"
        error={textError}
        onBlur={handleBlur}
        value={dataForm.description}
        //error={passwordError}
        //onBlur={handleBlurPassword}
        onChange={(e) => handlerChange(e)}
        sx={{ mb: 2, width: "100%" }}
      />

      <Autocomplete
        options={user.role === "admin" ? opciones : opciones2}
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

export default ProjectForm;
