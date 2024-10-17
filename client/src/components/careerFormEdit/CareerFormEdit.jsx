import {
  TextField,
  Button,
  useTheme,
  Alert,
  Autocomplete,
} from "@mui/material";
import { useState, useEffect } from "react"; //import React from 'react'
import {
  useUpdateCareerMutation,
  useGetCareerByIdQuery,
  useGetDepartmentsQuery,
} from "../../state/api";
import { notification } from "antd";
import useAuth from "../../hooks/useAuth";

const CareerFormEdit = ({ setIsModalOpen, id }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const [dataForm, setDataForm] = useState({});
  const [messageError, setMessageError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [autoCompleteError, setAutocompleteError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const { data } = useGetCareerByIdQuery(id);
  //console.log(data.carrera);
  const { data: departamentos } = useGetDepartmentsQuery();
  const [updateCareer, error] = useUpdateCareerMutation();

  const opciones =
    departamentos?.departamentos?.length > 0
      ? departamentos.departamentos.map((item) => {
          return { label: item?.nombre, value: item?._id };
        })
      : [];
  const [autocompleteValor, setAutocompleteValor] = useState(
    data?.carrera?.idDepartamento?.nombre
  );

  useEffect(() => {
    if (data) {
      setDataForm({
        id: id,
        nombre: data?.carrera.nombre,
        description: data?.carrera.description,
        idDepartamento: data?.carrera?.idDepartamento._id,
      });
      console.log(departamentos);
    }
  }, [data]);

  const handleAutocompleteChange = (event, newValue) => {
    setAutocompleteValor(newValue);
    setDataForm({ ...dataForm, idDepartamento: newValue?.value });
    setAutocompleteError(false);
    setHelperText("");
    //console.log(dataForm);
  };

  const handleBlur = () => {
    if (
      dataForm.nombre === "" ||
      !dataForm.nombre ||
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
      dataForm.nombre === "" ||
      !dataForm.nombre ||
      !dataForm.nombre.trim() === "" ||
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
    if (
      dataForm.nombre === "" ||
      !dataForm.idDepartamento ||
      dataForm.idDepartamento === ""
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
        const response = await updateCareer(dataForm);
        if (response.error) {
          setTextError(true);
          setMessageError("El nombre ya está en uso");
          return;
        }
        setIsModalOpen(false);
        notification["success"]({
          message: "Carrera actualizada correctamente",
        });
        console.log(response);
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
        label="Nombre"
        name="nombre"
        type="text"
        variant="standard"
        size="small"
        error={textError}
        //onBlur={handleBlur}
        value={dataForm.nombre}
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

      {user.role === "admin" && (
        <Autocomplete
          options={opciones}
          value={autocompleteValor}
          onChange={handleAutocompleteChange}
          sx={{ width: "100%", mb: 2 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Departamento"
              variant="outlined"
              error={autoCompleteError}
              helperText={helperText}
            />
          )}
        ></Autocomplete>
      )}
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

export default CareerFormEdit;
