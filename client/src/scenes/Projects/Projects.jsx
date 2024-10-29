import { useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import { DataGrid } from "@mui/x-data-grid";
import {
  useGetProjectsQuery,
  useGetProjectsByIdDepartamentoQuery,
} from "../../state/api";
import Header from "../../components/Header";
import { useTheme, Box, Button, Alert } from "@mui/material";
import { ReceiptLongOutlined } from "@mui/icons-material";
import DataGridCustomToolbar from "../../components/dataGridCustomToolbar/DataGridCustomToolbar";
import useModal from "../../hooks/useModal";
import ProjectForm from "../../components/projectForm/ProjectForm";
import { useDeleteProjectMutation } from "../../state/api";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import useAuth from "../../hooks/useAuth";
import {esES} from "@mui/x-data-grid/locales";

const Projects = () => {
  const theme = useTheme();
  const { setIsModalOpen, setModalContent, setModalTitle } = useModal();
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useGetProjectsQuery({
    page,
    limit,
    sort,
    search,
  });

  const { data: data2 } = useGetProjectsByIdDepartamentoQuery(
    user?.departamento
  );

  const [deleteProject, error] = useDeleteProjectMutation();

  const navigate = useNavigate();

  //console.log(data);

  const rows =
    data?.projectos?.length > 0
      ? data.projectos.map((row) => ({
          id: row._id,
          Titulo: row.titulo,
          Autor: row.autor,
          Estado: row.estado,
          Tipo: row.tipo,
          Sector: row.sector,
          idCarrera: row?.idCarrera?.nombre || row.carrera,
        }))
      : [];

  const rows2 =
    data2?.projectos?.length > 0
      ? data2.projectos.map((row) => ({
          id: row._id,
          Titulo: row.titulo,
          Autor: row.autor,
          Estado: row.estado,
          Tipo: row.tipo,
          Sector: row.sector,
          idCarrera: row?.idCarrera?.nombre || row.carrera,
        }))
      : [];

  const columns = [
    {
      field: "Titulo",
      headerName: "Título",
      flex: 0.2,
    },
    {
      field: "Autor",
      headerName: "Autor",
      flex: 0.2,
    },

    {
      field: "Estado",
      headerName: "Estado",
      flex: 0.2,
    },
    {
      field: "Tipo",
      headerName: "Tipo",
      flex: 0.2,
    },
    {
      field: "Sector",
      headerName: "Sector",
      flex: 0.2,
      renderCell: (params) => (params.value ? "SI" : "NO"),
    },
    {
      field: "idCarrera",
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

  const handleDelete = async (id) => {
    try {
      await deleteProject({ id });
      notification.success({
        message: "Proyecto eliminado exitosamente",
        //placement: "topRight",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = (id) => {
    navigate(`/proyectoSingle/${id}`);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="Proyectos"
          subtitle={
            user.role === "admin"
              ? "Proyectos de la Cátedra"
              : "Proyectos del Departamento"
          }
        />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ReceiptLongOutlined />}
          onClick={() => {
            setIsModalOpen(true);
            setModalContent(<ProjectForm setIsModalOpen={setIsModalOpen} />);
            setModalTitle("Agregar Projecto");
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
          Crear Proyecto
        </Button>
      </FlexBetween>
      <Alert
        severity="warning"
        sx={{ marginBottom: "1rem", backgroundColor: "transparent" }}
      >
        Si Elimina un proyecto, se borrará permanentemente y todo lo relacionado
        con él.
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
          rows={user.role === "admin" ? rows : rows2}
          columns={columns}
          rowCount={data ? data.total : 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={limit}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setLimit(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          slots={{
            toolbar: DataGridCustomToolbar,
          }}
          slotProps={{
            toolbar: {
              searchInput,
              setSearchInput,
              setSearch,
            },
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </Box>
  );
};

export default Projects;
