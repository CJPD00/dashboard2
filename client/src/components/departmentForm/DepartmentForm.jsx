//import React from "react";
import { TextField, Button, useTheme, Alert } from "@mui/material";
import { useState } from "react";
//import { notification } from "antd";
import { useCreateDepartmentMutation } from "../../state/api";
import { notification } from "antd";

const DepartmentForm = ({ setIsModalOpen }) => {
  const theme = useTheme();
  const [dataForm, setDataForm] = useState({});
  const [messageError, setMessageError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [createDepartment, error] = useCreateDepartmentMutation();

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
      !dataForm.nombre.trim() === "" ||
      dataForm.cantidadProfesores === "" ||
      !dataForm.cantidadProfesores ||
      !dataForm.cantidadProfesores.trim() === "" ||
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
    if (dataForm.nombre === "") {
      setMessageError("Todos los campos son obligatorios");
      setTextError(true);
      return;
    } else if (textError) {
      return;
    } else {
      try {
        const response = await createDepartment(dataForm);
        if (response.error) {
          setTextError(true);
          setMessageError("El Departamento ya existe");
          return;
        }
        setIsModalOpen(false);
        notification["success"]({
          message: "Departamento Creado",
          description: "El Departamento ha sido creado exitosamente",
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

export default DepartmentForm;
