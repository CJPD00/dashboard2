//import React from 'react'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Alert } from "@mui/material";
import { useTheme, Button } from "@mui/material";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useUpdateTareaMutation, useGetTareaByIdQuery } from "../../state/api";

const TareaFormEdit = ({ setIsModalOpen, id }) => {
  const theme = useTheme();
  const [dataForm, setDataForm] = useState({});
  //const [fecha, setFecha] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [fechaError, setFechaError] = useState(false);
  const [helperText2, setHelperText2] = useState("");

  const [updateTarea, error] = useUpdateTareaMutation();

  const { data } = useGetTareaByIdQuery(id);

  useEffect(() => {
    if (data) {
      setDataForm({
        title: data?.tarea?.title || "",
        description: data?.tarea?.description || "",
        fecha: dayjs(data?.tarea?.fecha),
        responsable: data?.tarea?.responsable || "",
        lugar: data?.tarea?.lugar || "",
      });
    }
  }, [data]);

  const handleBlur = () => {
    if (
      dataForm.title === "" ||
      !dataForm.title ||
      dataForm.description === "" ||
      !dataForm.description ||
      !dataForm.responsable ||
      dataForm.responsable === "" ||
      !dataForm.lugar ||
      dataForm.lugar === ""
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
      !dataForm.description.trim() === "" ||
      !dataForm.responsable ||
      dataForm.responsable === "" ||
      !dataForm.lugar ||
      dataForm.lugar === ""
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
    if (!dataForm.fecha) {
      setFechaError(true);
      //console.log(fechaError);
      setHelperText2("elige una fecha");
      return;
    }
    if (dataForm.title === "") {
      setMessageError("Todos los campos son obligatorios");
      setTextError(true);
      return;
    } else if (textError) {
      return;
    } else {
      const formatFecha = dayjs(dataForm.fecha).toDate();

      const { title, description, responsable, lugar } = dataForm;

      const response = await updateTarea({
        title,
        description,
        responsable,
        lugar,
        fecha: formatFecha,
        id,
      });
      setIsModalOpen(false);
      //console.log(DataForm);
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Fecha"
          value={dataForm.fecha}
          onChange={(newValue) => {
            setDataForm({ ...dataForm, fecha: newValue });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={fechaError}
              helperText={helperText2}
            />
          )}
          sx={{ mb: 2, width: "100%" }}
        />
      </LocalizationProvider>
      {fechaError ? (
        <Alert severity="error" sx={{ mb: 2, backgroundColor: "transparent" }}>
          {helperText2}
        </Alert>
      ) : (
        ""
      )}
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
      <TextField
        label="Responsable"
        name="responsable"
        type="text"
        variant="standard"
        size="small"
        error={textError}
        onBlur={handleBlur}
        value={dataForm.responsable}
        onChange={(e) => handlerChange(e)}
        sx={{ mb: 2, width: "100%" }}
      />
      <TextField
        label="Lugar"
        name="lugar"
        type="text"
        variant="standard"
        size="small"
        error={textError}
        onBlur={handleBlur}
        value={dataForm.lugar}
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

export default TareaFormEdit;
