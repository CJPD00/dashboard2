//import React from 'react'

import Header from "../../components/Header";
import { useTheme, Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "../../components/FlexBetween";
import useModal from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { AssignmentOutlined } from "@mui/icons-material";
import { useGetTareasQuery, useDeleteTareaMutation } from "../../state/api";
import TareaForm from "../../components/tareaForm/TareaForm";
import TareaFormEdit from "../../components/tareaFormEdit/TareaFormEdit";
import { notification } from "antd";
import DataGridCustomToolbarSimple from "../../components/dataGridCustomToolbarSimple/DataGridCustomToolbarSimple";

const Tasks = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { setIsModalOpen, setModalContent, setModalTitle } = useModal();

  const { data, isLoading } = useGetTareasQuery();

  const [deleteTarea, error] = useDeleteTareaMutation();

  const rows =
    data?.tareas?.length > 0
      ? data.tareas.map((row) => ({
          id: row._id,
          Titulo: row.title,
          Responsable: row.responsable,
          Lugar: row.lugar,
        }))
      : [];

  const columns = [
    {
      field: "Titulo",
      headerName: "Titulo",
      flex: 0.2,
    },
    {
      field: "Responsable",
      headerName: "Responsable",
      flex: 0.2,
    },
    {
      field: "Lugar",
      headerName: "Lugar",
      flex: 0.2,
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
            onClick={() => handleView(params.row.id)}
          >
            Ver
          </Button>
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

  const handlePost = () => {
    setIsModalOpen(true);
    setModalContent(<TareaForm setIsModalOpen={setIsModalOpen} />);
    setModalTitle("Crear Nueva Tarea");
  };

  const handleEdit = (id) => {
    setIsModalOpen(true);
    setModalTitle("Editar Tarea");
    setModalContent(<TareaFormEdit setIsModalOpen={setIsModalOpen} id={id} />);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTarea({ id });
      notification.success({
        message: "Tarea eliminada",
        description: "La tarea ha sido eliminada con exito",
        //placement: "bottomRight",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (id) => {
    navigate(`/tareaSingle/${id}`);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Tareas" subtitle="Todas las Tareas" />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AssignmentOutlined />}
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
          Agregar tarea
        </Button>
      </FlexBetween>
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
    </Box>
  );
};

export default Tasks;
