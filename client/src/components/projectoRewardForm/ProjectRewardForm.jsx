//import React from 'react'
import {
  TextField,
  Button,
  useTheme,
  Alert,
  Autocomplete,
} from "@mui/material";
import { useState } from "react";
import { useGetPremiosQuery, useOtorgarPremioMutation } from "../../state/api";
import { notification } from "antd";

const ProjectRewardForm = ({ setIsModalOpen, id }) => {
  const theme = useTheme();
  const [dataForm, setDataForm] = useState({ projectId: id });
  const [messageError, setMessageError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [autocompleteValor, setAutocompleteValor] = useState(null);
  const [autoCompleteError, setAutocompleteError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const { data, isLoading } = useGetPremiosQuery();

  const [otorgarPremio, error] = useOtorgarPremioMutation();

  const opciones =
    data?.premios?.length > 0
      ? data.premios.map((item) => {
          return { label: item?.title, value: item?._id };
        })
      : [];

  const handleAutocompleteChange = (event, newValue) => {
    setAutocompleteValor(newValue);
    setDataForm({ ...dataForm, premioId: newValue?.value });
    setAutocompleteError(false);
    setHelperText("");
    setMessageError("");
    setTextError(false);
    //console.log(dataForm);
  };

  const handleClick = async () => {
    //console.log(dataForm);
    if (
      dataForm.premioId === "" ||
      !dataForm.premioId ||
      dataForm.projectId === ""
    ) {
      setMessageError("Todos los campos son obligatorios");
      setTextError(true);
      setAutocompleteError(true);
      setHelperText("Por favor, selecciona un Premio");
      return;
    } else if (textError) {
      return;
    } else {
      try {
        const response = await otorgarPremio(dataForm);
        if (response.error) {
          setMessageError("El premio ya fue otorgado a este proyecto");
          setAutocompleteError(true);
          setTextError(true);
          return;
        }
        //console.log(response);
        setIsModalOpen(false);
        notification.success({
          message: "Premio otorgado",
        });
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
      <Autocomplete
        options={opciones}
        value={autocompleteValor}
        onChange={handleAutocompleteChange}
        sx={{ width: "100%", mb: 2 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Premio"
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

export default ProjectRewardForm;
