import {
  useGetTiposEventoQuery,
  usePostTipoEventoMutation,
  useDeleteTipoEventoMutation,
  useGetTiposPremioQuery,
  usePostTipoPremioMutation,
  useDeleteTipoPremioMutation,
} from "../../state/api";
import FlexBetween from "../FlexBetween";
import { TextField, Button, useTheme } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ConfigForm = () => {
  const { data } = useGetTiposEventoQuery();
  const { data: data2 } = useGetTiposPremioQuery();
  const [postTipoEvento] = usePostTipoEventoMutation();
  const [postTipoPremio] = usePostTipoPremioMutation();
  const [deleteTipoEvento] = useDeleteTipoEventoMutation();
  const [deleteTipoPremio] = useDeleteTipoPremioMutation();

  const theme = useTheme();

  const [errorEvento, setErrorEvento] = useState(false);
  const [errorPremio, setErrorPremio] = useState(false);
  const [textErrorEvento, setTextErrorEvento] = useState(null);
  const [textErrorPremio, setTextErrorPremio] = useState(null);

  const [tipoEvento, setTipoEvento] = useState("");
  const [tipoPremio, setTipoPremio] = useState("");

  const chips =
    data?.tiposEventos?.map((tipo) => ({
      key: tipo._id,
      label: tipo.name,
    })) || [];

  const chips2 =
    data2?.tiposPremios?.map((tipo) => ({
      key: tipo._id,
      label: tipo.name,
    })) || [];

  const handleChangeTipoEvento = (e) => {
    setTipoEvento(e.target.value);
  };

  const handleChangeTipoPremio = (e) => {
    setTipoPremio(e.target.value);
  };

  const handlePostTipoEvento = async (e) => {
    e.preventDefault();
    if (tipoEvento) {
      try {
        const response = await postTipoEvento({ name: tipoEvento });

        if (response.error) {
          setErrorEvento(true);
          setTextErrorEvento("El tipo de evento ya existe");
          return;
        }

        setTipoEvento("");
        setErrorEvento(false);
        setTextErrorEvento(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePostTipoPremio = async (e) => {
    e.preventDefault();
    if (tipoPremio) {
      try {
        const response = await postTipoPremio({ name: tipoPremio });

        if (response.error) {
          setErrorPremio(true);
          setTextErrorPremio("El tipo de premio ya existe");
          return;
        }

        setTipoPremio("");
        setErrorPremio(false);
        setTextErrorPremio(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteTipoEvento = async (chip) => {
    //console.log(chip);
    try {
      await deleteTipoEvento({ id: chip.key });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTipoPremio = async (chip) => {
    //console.log(chip);
    try {
      await deleteTipoPremio({ id: chip.key });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.alt,
        color: theme.palette.text.primary,
        padding: "1rem",
        //borderRadius: "10px",
        //boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
      }}
    >
      <FlexBetween>
        <TextField
          label="Nuevo tipo de evento"
          name="nombre"
          type="text"
          variant="standard"
          size="small"
          error={errorEvento}
          helperText={textErrorEvento}
          //error={textError}
          //onBlur={handleBlur}
          value={tipoEvento}
          //   onKeyDown={(e) => {
          //     if (!/[a-zA-Z ]/.test(e.key)) {
          //       e.preventDefault();
          //     }
          //   }}
          onChange={(e) => handleChangeTipoEvento(e)}
          sx={{ mb: 2, width: "50%" }}
        />
        <Button
          variant="contained"
          sx={{ mb: 1, marginRight: "1rem" }}
          color="secondary"
          onClick={handlePostTipoEvento}
        >
          Agregar
        </Button>
      </FlexBetween>
      {chips.length > 0 && (
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
            backgroundColor: theme.palette.background.alt,
          }}
          component="ul"
        >
          {chips.map((chip) => (
            <ListItem key={data.key}>
              <Chip
                label={chip.label}
                onDelete={() => handleDeleteTipoEvento(chip)}
                variant="outlined"
                color="secondary"
              />
            </ListItem>
          ))}
        </Paper>
      )}
      <Divider
        sx={{ my: 2, backgroundColor: theme.palette.background.alt }}
      ></Divider>
      <FlexBetween>
        <TextField
          label="Nuevo tipo de premio"
          name="nombre"
          type="text"
          variant="standard"
          size="small"
          error={errorPremio}
          helperText={textErrorPremio}
          //error={textError}
          //onBlur={handleBlur}
          value={tipoPremio}
          //   onKeyDown={(e) => {
          //     if (!/[a-zA-Z ]/.test(e.key)) {
          //       e.preventDefault();
          //     }
          //   }}
          onChange={(e) => handleChangeTipoPremio(e)}
          sx={{ mb: 2, width: "50%" }}
        />
        <Button
          variant="contained"
          sx={{ mb: 1, marginRight: "1rem" }}
          color="secondary"
          onClick={handlePostTipoPremio}
        >
          Agregar
        </Button>
      </FlexBetween>
      {chips2.length > 0 && (
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
            backgroundColor: theme.palette.background.alt,
          }}
          component="ul"
        >
          {chips2.map((chip) => (
            <ListItem key={data.key}>
              <Chip
                label={chip.label}
                onDelete={() => handleDeleteTipoPremio(chip)}
                variant="outlined"
                color="secondary"
              />
            </ListItem>
          ))}
        </Paper>
      )}
    </div>
  );
};

export default ConfigForm;
