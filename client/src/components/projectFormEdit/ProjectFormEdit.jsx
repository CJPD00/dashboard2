//import React from 'react'
import {
  TextField,
  Button,
  useTheme,
  Alert,
  Autocomplete,
} from "@mui/material";
import { useState } from "react";
import {
  useGetCareersQuery,
  useGetCareersByIdDepartamentoQuery,
  useUpdateProjectMutation,
  useUploadProjectDocMutation,
} from "../../state/api";
import { notification } from "antd";
import useAuth from "../../hooks/useAuth";

const ProjectFormEdit = ({ data, setIsModalOpen }) => {
  //console.log(data);
  const theme = useTheme();
  const { user } = useAuth();
  const sector = data.projecto.sector ? "Si" : "No";
  const [dataForm, setDataForm] = useState(data.projecto);
  const [file, setFile] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [autoCompleteErrorEstado, setAutocompleteErrorEstado] = useState(false);
  const [helperTextEstado, setHelperTextEstado] = useState("");
  const [autoCompleteErrorTipo, setAutocompleteErrorTipo] = useState(false);
  const [helperTextTipo, setHelperTextTipo] = useState("");
  const [autoCompleteErrorSector, setAutocompleteErrorSector] = useState(false);
  const [helperTextSector, setHelperTextSector] = useState("");
  const [autoCompleteValueSector, setAutoCompleteValueSector] =
    useState(sector);
  const [autoCompleteValueCarrera, setAutoCompleteValueCarrera] = useState(
    data.projecto.idCarrera.nombre
  );
  const [autoCompleteErrorCarrera, setAutocompleteErrorCarrera] =
    useState(false);
  const [helperTextCarrera, setHelperTextCarrera] = useState("");
  const [archivoError, setArchivoError] = useState(false);
  const [messageError2, setMessageError2] = useState("");

  const { data: carrerasData, isLoading } = useGetCareersQuery();
  const { data: carrerasData2 } = useGetCareersByIdDepartamentoQuery({
    id: user?.departamento,
  });
  const [updateProject, error] = useUpdateProjectMutation();
  const [uploadProjectDoc, uploadProjectDocResult] =
    useUploadProjectDocMutation();

  const carrerasOpciones =
    carrerasData?.carreras?.length > 0
      ? carrerasData.carreras.map((item) => {
          return { label: item?.nombre, value: item?._id };
        })
      : [];

  const carrerasOpciones2 =
    carrerasData2?.carreras?.length > 0
      ? carrerasData2.carreras.map((item) => {
          return { label: item?.nombre, value: item?._id };
        })
      : [];

  //console.log(dataForm);

  const estadoObtions = [
    { label: "Activo", value: "activo" },
    { label: "Inactivo", value: "inactivo" },
    { label: "Cancelado", value: "cancelado" },
  ];

  const tipoOptions = [
    { value: "tesis", label: "Tesis" },
    { value: "maestria", label: "Maestria" },
    { value: "doctorado", label: "Doctorado" },
  ];

  const sectorOptions = [
    { label: "Si", value: true },
    { label: "No", value: false },
  ];

  const handleAutocompleteChangeEstado = (event, newValue) => {
    setDataForm({ ...dataForm, estado: newValue?.value });
    setAutocompleteErrorEstado(false);
    setHelperTextEstado("");
  };
  const handleAutocompleteChangeTipo = (event, newValue) => {
    setDataForm({ ...dataForm, tipo: newValue?.value });
    setAutocompleteErrorTipo(false);
    setHelperTextTipo("");
  };
  const handleAutocompleteChangeSector = (event, newValue) => {
    setAutoCompleteValueSector(newValue);
    setDataForm({ ...dataForm, sector: newValue?.value });
    setAutocompleteErrorSector(false);
    setHelperTextSector("");
  };
  const handleAutocompleteChangeCarrera = (event, newValue) => {
    setAutoCompleteValueCarrera(newValue);
    setDataForm({ ...dataForm, idCarrera: newValue?.value });
    setAutocompleteErrorCarrera(false);
    setHelperTextCarrera("");
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

  const handleChangeFile = (e) => {
    setTextError(false);
    setMessageError("");
    setFile(e.target.files[0]);
    //console.log(file);
  };

  const handleClick = async () => {
    //console.log(dataForm);
    //console.log(autoCompleteValueSector);
    if (!dataForm.estado) {
      // setMessageError("Todos los campos son obligatorios");
      // setTextError(true);
      setAutocompleteErrorEstado(true);
      setHelperTextEstado("Por favor, selecciona un Estado");
      return;
    }
    if (!dataForm.tipo) {
      // setMessageError("Todos los campos son obligatorios");
      // setTextError(true);
      setAutocompleteErrorTipo(true);
      setHelperTextTipo("Por favor, selecciona un tipo");
      return;
    }
    if (!autoCompleteValueSector) {
      // setMessageError("Todos los campos son obligatorios");
      // setTextError(true);
      setAutocompleteErrorSector(true);
      setHelperTextSector("Por favor, seleccione si pertene a un sector");
      return;
    }
    if (!autoCompleteValueCarrera) {
      // setMessageError("Todos los campos son obligatorios");
      // setTextError(true);
      setAutocompleteErrorCarrera(true);
      setHelperTextCarrera("Por favor, selecciona una carrera");
      return;
    }
    if (textError) {
      return;
    }
    try {
      if (file) {
        const formData = new FormData();
        formData.append("recurso", file, file.name);
        //console.log(formData.get("recurso"));
        //console.log(file);
        const response = await uploadProjectDoc({
          id: dataForm._id,
          file: formData,
        });
        if (response.error) {
          //setMessageError("Archivo no aceptado");
          //setTextError(true);
          setArchivoError(true);
          console.log("estoy aqui")
          return;
        }
      }
      const response = await updateProject(dataForm);
      if (response.error) {
        console.log("estoy aqui update")
        setTextError(true);
        setMessageError("El nombre del proyecto ya existe");
        return;
      }
      setIsModalOpen(false);
      notification["success"]({
        message: "Proyecto editado exitosamente",
      });
      //console.log(response);
    } catch (error) {
      setMessageError(error.message);
      console.log(error.message)
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
        helperText={archivoError ? "Archivo no aceptado" : null}
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
        options={estadoObtions}
        value={dataForm.estado}
        onChange={handleAutocompleteChangeEstado}
        sx={{ width: "100%", mb: 2 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Estado"
            variant="outlined"
            error={autoCompleteErrorEstado}
            helperText={helperTextEstado}
          />
        )}
      ></Autocomplete>
      <Autocomplete
        options={tipoOptions}
        value={dataForm.tipo}
        onChange={handleAutocompleteChangeTipo}
        sx={{ width: "100%", mb: 2 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tipo"
            variant="outlined"
            error={autoCompleteErrorTipo}
            helperText={helperTextTipo}
          />
        )}
      ></Autocomplete>
      <Autocomplete
        options={sectorOptions}
        value={autoCompleteValueSector}
        onChange={handleAutocompleteChangeSector}
        sx={{ width: "100%", mb: 2 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Sector"
            variant="outlined"
            error={autoCompleteErrorSector}
            helperText={helperTextSector}
          />
        )}
      ></Autocomplete>
      <Autocomplete
        options={user.role === "admin" ? carrerasOpciones : carrerasOpciones2}
        value={autoCompleteValueCarrera}
        onChange={handleAutocompleteChangeCarrera}
        sx={{ width: "100%", mb: 2 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Carrera"
            variant="outlined"
            error={autoCompleteErrorCarrera}
            helperText={helperTextCarrera}
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

export default ProjectFormEdit;
