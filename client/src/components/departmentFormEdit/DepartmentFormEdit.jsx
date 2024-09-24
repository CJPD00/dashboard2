//import React from "react";
import { TextField, Button, useTheme, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { useUpdateDepartmentMutation } from "../../state/api";

export const DepartmentFormEdit = ({
  nombre,
  cantidadProfesores,
  description,
  setIsModalOpen,
  _id,
}) => {
  const theme = useTheme();
  const [dataForm, setDataForm] = useState({});
  const [messageError, setMessageError] = useState(null);
  const [textError, setTextError] = useState(null);

  const [updateDepartment, error] = useUpdateDepartmentMutation();

  useEffect(() => {
    setDataForm({
      nombre: nombre,
      cantidadProfesores: cantidadProfesores,
      description: description,
    });
  }, [nombre, cantidadProfesores, description]);

  const handleBlur = () => {
    if (
      dataForm.nombre === "" ||
      !dataForm.nombre ||
      dataForm.cantidadProfesores === "" ||
      !dataForm.cantidadProfesores ||
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
      !dataForm.nombre === "" ||
      dataForm.cantidadProfesores === "" ||
      !dataForm.cantidadProfesores ||
      !dataForm.cantidadProfesores === "" ||
      dataForm.description === "" ||
      !dataForm.description ||
      !dataForm.description === ""
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
    //console.log(dataForm, _id);
    if (dataForm.nombre === "") {
      setMessageError("Todos los campos son obligatorios");
      setTextError(true);
      return;
    } else if (textError) {
      return;
    } else {
      try {
        const response = await updateDepartment({
          id: _id,
          nombre: dataForm.nombre,
          cantidadProfesores: dataForm.cantidadProfesores,
          description: dataForm.description,
        });
        setIsModalOpen(false);
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
        onChange={(e) => handlerChange(e)}
        sx={{ mb: 2, width: "100%" }}
      />
      <TextField
        label="Cantidad de Profesores"
        name="cantidadProfesores"
        type="number"
        variant="standard"
        size="small"
        error={textError}
        //onBlur={handleBlur}
        value={dataForm.cantidadProfesores}
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
