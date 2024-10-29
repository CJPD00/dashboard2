//import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Stack,
  Typography,
  //Rating,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { EmojiEventsOutlined } from "@mui/icons-material";
import { useState } from "react";
import Header from "../../components/Header";
import useModal from "../../hooks/useModal";
import { useGetPremiosQuery } from "../../state/api";
import PremioForm from "../../components/premioForm/PremioForm";
import PremioFormEdit from "../../components/premioFormEdit/PremioFormEdit";
import {
  useDeletePremioMutation,
  useGetPremioImageQuery,
} from "../../state/api";
import { notification } from "antd";

const Rewards = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { data, isLoading } = useGetPremiosQuery();
  const { setIsModalOpen, setModalContent, setModalTitle } = useModal();
  //console.log(data);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Premios" subtitle="Todos los Premios." />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<EmojiEventsOutlined />}
          onClick={() => {
            setIsModalOpen(true);
            setModalContent(<PremioForm setIsModalOpen={setIsModalOpen} />);
            setModalTitle("Agregar Premio");
          }}
          sx={{
            ":hover": {
              backgroundColor: "secondary.light",
              color: "neutral.white",
            },
            backgroundColor: "secondary.main",
            color: "neutral.white",
            borderRadius: "10px",
            padding: "0.5rem 1rem",
          }}
        >
          Agregar Premio
        </Button>
      </FlexBetween>

      {!isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.premios.map((reward) => (
            <Reward key={reward._id} {...reward} />
          ))}
        </Box>
      ) : (
        <>Cargando...</>
      )}
    </Box>
  );
};

const Reward = ({ title, description, cantidadProjectos, _id, tipo }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setIsModalOpen, setModalContent, setModalTitle } = useModal();

  const [deletePremio, { isLoading }] = useDeletePremioMutation();

  const { data, isLoading: isLoadingPremioImage } = useGetPremioImageQuery({
    id: _id,
  });

  console.log(data);

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    setDialogOpen(true);
  };

  const handleConfirm = async () => {
    try {
      await deletePremio(_id);
      setDialogOpen(false);
      notification.success({
        message: "Premio eliminado con exito",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
    setModalContent(
      <PremioFormEdit
        setIsModalOpen={setIsModalOpen}
        _id={_id}
        title={title}
        description={description}
        cantidadProjectos={cantidadProjectos}
        tipo={tipo}
      />
    );
    setModalTitle("Editar Premio");
  };

  const handleEvidencia = () => {
    window.open(data?.url, "_blank").focus();
  };

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[300]}>
          Cantidad de Projectos: {cantidadProjectos}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Ver Menos" : "Ver Mas"}
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <Stack justifyContent="center">
          <Button
            sx={{
              ":hover": {
                backgroundColor: "secondary.light",
                color: "neutral.white",
              },
              backgroundColor: "secondary.main",
              color: "neutral.white",
              borderRadius: "10px",
              padding: "0.5rem 1rem",
              margin: "0.5rem",
            }}
            onClick={handleEvidencia}
          >
            Evidencia
          </Button>
          <Button
            sx={{
              ":hover": {
                backgroundColor: "secondary.light",
                color: "neutral.white",
              },
              backgroundColor: "secondary.main",
              color: "neutral.white",
              borderRadius: "10px",
              padding: "0.5rem 1rem",
              margin: "0.5rem",
            }}
            onClick={handleEdit}
          >
            Editar
          </Button>
          <Button
            sx={{
              ":hover": {
                backgroundColor: "secondary.light",
                color: "neutral.white",
              },
              backgroundColor: "secondary.main",
              color: "neutral.white",
              borderRadius: "10px",
              padding: "0.5rem 1rem",
              margin: "0.5rem",
            }}
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        </Stack>
      </Collapse>
      <Dialog open={dialogOpen} onClose={handleCancel}>
        <DialogTitle
          sx={{ textAlign: "center", color: theme.palette.error.main }}
        >
          Advertencia
        </DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar este elemento?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancel}
            sx={{
              color: theme.palette.error.main,
              ":hover": {
                backgroundColor: theme.palette.error.light,
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            sx={{
              color: theme.palette.success.main,
              ":hover": {
                backgroundColor: theme.palette.success.light,
              },
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Rewards;
