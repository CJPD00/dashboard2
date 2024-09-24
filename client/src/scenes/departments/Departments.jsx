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
import { ApartmentOutlined } from "@mui/icons-material";

import { useState } from "react";
import { useGetDepartmentsQuery } from "../../state/api";

import Header from "../../components/Header";
import DepartmentForm from "../../components/departmentForm/DepartmentForm";
import { DepartmentFormEdit } from "../../components/departmentFormEdit/DepartmentFormEdit";
import useModal from "../../hooks/useModal";
import { useDeleteDepartmentMutation } from "../../state/api";

const Departments = () => {
  const { data, isLoading } = useGetDepartmentsQuery();
  //console.log(data);

  const {
    //isModalOpen,
    setIsModalOpen,
    //modalContent,
    setModalContent,
    //modalTitle,
    setModalTitle,
  } = useModal();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Departamentos" subtitle="Todos los departamentos." />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ApartmentOutlined />}
          onClick={() => {
            setIsModalOpen(true);
            setModalContent(<DepartmentForm setIsModalOpen={setIsModalOpen} />);
            setModalTitle("Agregar departamento");
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
          Agregar departamento
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
          {data.departamentos.map((department) => (
            <Department key={department._id} {...department} />
          ))}
        </Box>
      ) : (
        <>Cargando...</>
      )}
    </Box>
  );
};

const Department = ({ nombre, cantidadProfesores, description, _id }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    //isModalOpen,
    setIsModalOpen,
    //modalContent,
    setModalContent,
    //modalTitle,
    setModalTitle,
  } = useModal();

  const [deleteDepartment, { isLoading }] = useDeleteDepartmentMutation();
  const handleDelete = async () => {
    setDialogOpen(true);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleConfirm = async () => {
    setDialogOpen(false);
    try {
      await deleteDepartment({ nombre });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
    setModalContent(
      <DepartmentFormEdit
        setIsModalOpen={setIsModalOpen}
        _id={_id}
        nombre={nombre}
        description={description}
        cantidadProfesores={cantidadProfesores}
      />
    );
    setModalTitle("Editar Departamento");
  };

  //console.log(description);

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
          {nombre}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[300]}>
          Cantidad de Profesores: {cantidadProfesores}
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

export default Departments;
