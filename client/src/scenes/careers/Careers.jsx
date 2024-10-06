import Header from "../../components/Header";
import { Box, useTheme, Button, Alert } from "@mui/material";
import { BuildOutlined } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetCareersQuery, useDeleteCareerMutation } from "../../state/api";
import FlexBetween from "../../components/FlexBetween";
import useModal from "../../hooks/useModal";
import CareerForm from "../../components/careerForm/CareerForm";
import CareerFormEdit from "../../components/careerFormEdit/CareerFormEdit";
import { notification } from "antd";
import DataGridCustomToolbarSimple from "../../components/dataGridCustomToolbarSimple/DataGridCustomToolbarSimple";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

const Careers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCareersQuery();
  const { setIsModalOpen, setModalContent, setModalTitle, isModalOpen } =
    useModal();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [deleteCareer, error] = useDeleteCareerMutation();
  //console.log(data);

  const handlePost = () => {
    setIsModalOpen(true);
    setModalContent(<CareerForm setIsModalOpen={setIsModalOpen} />);
    setModalTitle("Crear Nueva Carrera");
  };

  const handleEdit = (id) => {
    setIsModalOpen(true);
    //console.log(isModalOpen);
    setModalContent(<CareerFormEdit setIsModalOpen={setIsModalOpen} id={id} />);
    setModalTitle("Editar Carrera");
    // console.log(id);
  };

  const handleDelete = async (id) => {
    //setDialogOpen(true);

    try {
      await deleteCareer({ id });
      notification.success({
        message: "Carrera eliminada correctamente",
      });
      //setConfirm(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleConfirm = async (id) => {
  //   setConfirm(true);
  //   setDialogOpen(false);
  // };

  // const handleCancel = () => {
  //   setDialogOpen(false);
  // };

  const rows =
    data?.carreras?.length > 0
      ? data.carreras.map((row) => ({
          id: row._id,
          nombre: row.nombre,
          departamento: row.departamento,
        }))
      : [];

  const columns = [
    // {
    //   field: "_id",
    //   headerName: "ID",
    //   flex: 0.3,
    //   renderCell: () => <div style={{ display: "none" }} />,
    // },
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 0.3,
    },
    {
      field: "departamento",
      headerName: "Departamento",
      flex: 0.3,
    },
    {
      headerName: "Acciones",
      flex: 0.3,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="warning"
            sx={{
              ":hover": {
                backgroundColor: "warning.light",
                color: "neutral.white",
              },
              backgroundColor: "warning.main",
              color: "neutral.white",
              borderRadius: "10px",
              padding: "0.5rem 1rem",
              marginRight: "1rem",
            }}
            onClick={() => handleEdit(params.row.id)}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              ":hover": {
                backgroundColor: "error.light",
                color: "neutral.white",
              },
              backgroundColor: "error.main",
              color: "neutral.white",
              borderRadius: "10px",
              padding: "0.5rem 1rem",
            }}
            onClick={() => handleDelete(params.row.id)}
          >
            Eliminar
          </Button>
        </div>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Carreras" subtitle="Todos las carreras" />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<BuildOutlined />}
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
          onClick={handlePost}
        >
          Agregar Carrera
        </Button>
      </FlexBetween>
      <Alert
        severity="warning"
        sx={{ marginBottom: "1rem", backgroundColor: "transparent" }}
      >
        Si Elimina una carera, se borrará permanentemente y todo lo relacionado
        con ella.
      </Alert>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={rows}
          columns={columns}
          slots={{
            toolbar: DataGridCustomToolbarSimple,
          }}
        />
      </Box>
      {/* <Dialog open={dialogOpen} onClose={handleCancel}>
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
      </Dialog> */}
    </Box>
  );
};

export default Careers;
