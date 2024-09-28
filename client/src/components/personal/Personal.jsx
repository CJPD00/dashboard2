//import React from 'react'
import Header from "../../components/Header";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "../../components/FlexBetween";
import useModal from "../../hooks/useModal";
import { AccessibilityOutlined } from "@mui/icons-material";
import {
  useGetPersonalByProjectQuery,
  useDeletePersonalMutation,
} from "../../state/api";
import PersonalForm from "../personalForm/PersonalForm";
import PersonalFormEdit from "../personalFormEdit/PersonalFormEdit";

const Personal = ({ id }) => {
  //console.log(id);
  const { setIsModalOpen, setModalContent, setModalTitle } = useModal();
  const theme = useTheme();

  const { data, isLoading } = useGetPersonalByProjectQuery({ id });
  const [deletePersonal, { isLoading: deleting }] = useDeletePersonalMutation();

  const rows =
    data?.personal?.length > 0
      ? data.personal.map((row) => ({
          id: row._id,
          name: row.name,
          lastname: row.lastname,
          email: row.email,
          ocupation: row.ocupation,
          tipo: row.tipo,
        }))
      : [];

  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 0.2,
    },
    {
      field: "lastname",
      headerName: "Apellido",
      flex: 0.2,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.3,
    },
    {
      field: "ocupation",
      headerName: "Ocupación",
      flex: 0.2,
    },
    {
      field: "tipo",
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
    setModalTitle("Agregar Miembro");
    setModalContent(<PersonalForm setIsModalOpen={setIsModalOpen} id={id} />);
  };
  const handleDelete = async (id) => {
    try {
      await deletePersonal({ id });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    setIsModalOpen(true);
    setModalTitle("Editar Miembro");
    setModalContent(
      <PersonalFormEdit setIsModalOpen={setIsModalOpen} id={id} />
    );
  };

  return (
    <Box mt={"3rem"}>
      <FlexBetween>
        <Header title="Personal" subtitle="Todos los miembros" />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AccessibilityOutlined />}
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
          Agregar Miembro
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

export default Personal;
