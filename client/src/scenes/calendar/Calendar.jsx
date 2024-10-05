import Header from "../../components/Header";
import { useTheme, Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CalendarTodayOutlined } from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import { useGetEventosGQuery, useDeleteEventoGMutation } from "../../state/api";
import useModal from "../../hooks/useModal";
import EventoGForm from "../../components/eventoGform/EventoGForm";
import EventoGFormEdit from "../../components/eventoGformEdit/EventoGFormEdit";
import { useNavigate } from "react-router-dom";
import DataGridCustomToolbarSimple from "../../components/dataGridCustomToolbarSimple/DataGridCustomToolbarSimple";

const Calendar = () => {
  const theme = useTheme();

  const { setIsModalOpen, setModalContent, setModalTitle } = useModal();

  const { data, isLoading } = useGetEventosGQuery();

  const [deleteEventoG, error] = useDeleteEventoGMutation();

  const navigate = useNavigate();

  const handleEdit = (id) => {
    setIsModalOpen(true);
    setModalContent(
      <EventoGFormEdit setIsModalOpen={setIsModalOpen} id={id} />
    );
    setModalTitle("Editar Evento");
  };

  const handleDelete = async (id) => {
    try {
      await deleteEventoG({ id });
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (id) => {
    navigate(`/eventoSingle/${id}`);
  };

  const rows =
    data?.eventos?.length > 0
      ? data.eventos.map((row) => ({
          id: row._id,
          Titulo: row.title,
          Dia: row.day,
          Tipo: row.type,
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
      field: "Tipo",
      headerName: "Tipo",
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
    setModalContent(<EventoGForm setIsModalOpen={setIsModalOpen} />);
    setModalTitle("Crear Nuevo Evento");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Eventos" subtitle="Todos las eventos" />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CalendarTodayOutlined />}
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
          Agregar Evento
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
          slots={{ toolbar: DataGridCustomToolbarSimple }}
        />
      </Box>
    </Box>
  );
};

export default Calendar;
