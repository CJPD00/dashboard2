//import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Alert } from "@mui/material";
import { useTheme, Button, Autocomplete } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import { useCreateEventoGMutation } from "../../state/api";
import { notification } from "antd";

const EventoGForm = ({ setIsModalOpen }) => {
  const theme = useTheme();
  const [dataForm, setDataForm] = useState({});
  const [fecha, setFecha] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [autocompleteValor, setAutocompleteValor] = useState(null);
  const [autoCompleteError, setAutocompleteError] = useState(false);
  const [fechaError, setFechaError] = useState(false);
  const [helperText2, setHelperText2] = useState("");
  const [helperText, setHelperText] = useState("");

  const [createEvent, error] = useCreateEventoGMutation();

  const opciones = [
    { value: "facultad", label: "Facultad" },
    { value: "universidad", label: "Universidad" },
    { value: "provincial", label: "Provincial" },
    { value: "nacional", label: "Nacional" },
    { value: "internacional", label: "Internacional" },
  ];

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

  const handleAutocompleteChange = (event, newValue) => {
    setAutocompleteValor(newValue);
    setDataForm({ ...dataForm, type: newValue.value });
    setAutocompleteError(false);
    setHelperText("");
    //console.log(dataForm);
  };

  const handleClick = async () => {
    //console.log(dataForm.day);
    if (!dataForm.type) {
      setAutocompleteError(true);
      setHelperText("elige un tipo de evento");
      return;
    }
    if (!dataForm.day) {
      setFechaError(true);
      console.log(fechaError);
      setHelperText2("elige una fecha");
      return;
    }
    if (
      dataForm.title === "" ||
      !dataForm.title ||
      dataForm.description === "" ||
      !dataForm.description
    ) {
      setMessageError("Todos los campos son obligatorios");
      setTextError(true);
      return;
    }
    try {
      const formatFecha = dayjs(dataForm.day).toDate();

      const DataForm = {
        ...dataForm,
        day: formatFecha,
        type: autocompleteValor.value,
      };
      //console.log(DataForm);
      const response = await createEvent({
        title: DataForm.title,
        day: DataForm.day,
        type: DataForm.type,
        description: DataForm.description,
      });
      setIsModalOpen(false);
      notification["success"]({
        message: "El evento ha sido creado correctamente",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
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
          value={fecha}
          onChange={(newValue) => {
            setDataForm({ ...dataForm, day: newValue });
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
      <Autocomplete
        options={opciones}
        value={autocompleteValor}
        onChange={handleAutocompleteChange}
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

export default EventoGForm;
