//import React from 'react'
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
import { EmojiEventsOutlined } from "@mui/icons-material";
import { useState } from "react";
import Header from "../../components/Header";
import useModal from "../../hooks/useModal";
import {
  useGetPremiosByIdProjectQuery,
  useRevocarPremioMutation,
} from "../../state/api";
import FlexBetween from "../FlexBetween";
import ProjectRewardForm from "../projectoRewardForm/ProjectRewardForm";

const ProjectReward = ({ id }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { data, isLoading } = useGetPremiosByIdProjectQuery(id);
  const { setIsModalOpen, setModalContent, setModalTitle } = useModal();

  return (
    <Box mt={"3rem"} pb={"5rem"}>
      <FlexBetween>
        <Header title="Premios" subtitle="Todos los Premios." />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<EmojiEventsOutlined />}
          onClick={() => {
            setIsModalOpen(true);
            setModalContent(
              <ProjectRewardForm setIsModalOpen={setIsModalOpen} id={id} />
            );
            setModalTitle("Otorgar Premio");
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
          Otorgar Premio
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
            <Reward
              key={reward._id}
              title={reward.title}
              description={reward.description}
              cantidadProjectos={reward.cantidadProjectos}
              id={id}
              premioId={reward._id}
            />
          ))}
        </Box>
      ) : (
        <>Cargando...</>
      )}
    </Box>
  );
};

const Reward = ({ title, description, cantidadProjectos, id, premioId }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [dataForm, setDataForm] = useState({
    projectId: id,
    premioId: premioId,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  //const { setIsModalOpen, setModalContent, setModalTitle } = useModal();
  const [revocarPremio, error] = useRevocarPremioMutation();

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleRevocar = async () => {
    setDialogOpen(true);
  };

  const handleConfirm = async () => {
    try {
      await revocarPremio(dataForm);
      setDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
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
            onClick={handleRevocar}
          >
            Revocar
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
          ¿Estás seguro de que deseas Revocar el premio?
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

export default ProjectReward;
