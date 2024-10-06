import React from "react";
import Header from "../../components/Header";
import { useTheme, Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "../../components/FlexBetween";
import { BorderColorOutlined } from "@mui/icons-material";
import { useGetPublicacionesQuery } from "../../state/api";
import { Link } from "react-router-dom";
import PublicacionForm from "../../components/publicacionForm/PublicacionForm";
import PublicacionFormEdit from "../../components/publicacionFormEdit/PublicacionFormEdit";
import useModal from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { useDeletePublicacionesMutation } from "../../state/api";
import { notification } from "antd";
import DataGridCustomToolbarSimple from "../../components/dataGridCustomToolbarSimple/DataGridCustomToolbarSimple";

const Posts = () => {
  const theme = useTheme();
  const { setIsModalOpen, setModalContent, setModalTitle } = useModal();

  const { data, isLoading } = useGetPublicacionesQuery();

  console.log(data);

  const [deletePublicacion, error] = useDeletePublicacionesMutation();

  const navigate = useNavigate();

  const rows =
    data?.publicaciones?.length > 0
      ? data.publicaciones.map((row) => ({
          id: row._id,
          Titulo: row.title,
          Dia: row.fecha,
          Autor: row.autor,
          Link: row.link,
          carrera: row.carrera.nombre,
        }))
      : [];

  const columns = [
    {
      field: "Titulo",
      headerName: "Titulo",
      flex: 0.2,
    },
    {
      field: "Dia",
      headerName: "Dia",
      flex: 0.2,
    },
    {
      field: "Autor",
      headerName: "Autor",
      flex: 0.2,
    },
    {
      field: "carrera",
      headerName: "Carrera",
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
    setModalTitle("Nueva Publicación");
    setModalContent(<PublicacionForm setIsModalOpen={setIsModalOpen} />);
  };

  const handleEdit = (id) => {
    setIsModalOpen(true);
    setModalTitle("Editar Publicación");
    setModalContent(
      <PublicacionFormEdit setIsModalOpen={setIsModalOpen} id={id} />
    );
  };

  const handleDelete = async (id) => {
    try {
      await deletePublicacion({ id });
      notification.success({
        message: "Publicación eliminada correctamente",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (id) => {
    navigate(`/publicacionSingle/${id}`);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Publicaciones" subtitle="Todas Las Publicaciones" />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<BorderColorOutlined />}
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
          Agregar Publicación
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

export default Posts;
