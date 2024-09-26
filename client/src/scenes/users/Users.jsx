import Header from "../../components/Header";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetUsersQuery } from "../../state/api";
import FlexBetween from "../../components/FlexBetween";
import { Groups2Outlined } from "@mui/icons-material";
import { useState } from "react";
import {
  useGetDepartmentsQuery,
  useActiveUserMutation,
  useGetUserQuery,
  useDesactiveUserMutation,
  useDeleteUserMutation,
} from "../../state/api";
import {
  TextField,
  Button,
  useTheme,
  Alert,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import useModal from "../../hooks/useModal";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../state/auth";

const Users = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetUsersQuery();
  const { setIsModalOpen, setModalContent, setModalTitle, isModalOpen } =
    useModal();
  const [deleteUser, error] = useDeleteUserMutation();
  const { user } = useAuth();
  //const [dialogOpen, setDialogOpen] = useState(false);
  // const [confirm, setConfirm] = useState(false);
  //console.log(data);

  const rows =
    data?.users?.length > 0
      ? data.users.map((row) => ({
          id: row._id,
          name: row.name,
          active: row.active,
          lastname: row.lastname,
          role: row.role,
          departamento: row?.departamento?.nombre || row.departamento,
        }))
      : [];

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.2,
    },
    {
      field: "lastName",
      headerName: "Apellido",
      flex: 0.2,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.1,
    },
    {
      field: "departamento",
      headerName: "Departamento",
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
            {params.row.active === true ? "Desactivar" : "Activar"}
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

  const handleEdit = (id) => {
    setIsModalOpen(true);
    //console.log(isModalOpen)
    setModalContent(
      <UserActive
        setIsModalOpen={setIsModalOpen}
        setModalContent={setModalContent}
        isModalOpen={isModalOpen}
        id={id}
      />
    );
    setModalTitle("Editar usuario");
  };

  const handleDelete = async (id) => {
    //console.log(user);
    //setDialogOpen(true);

    if (id === user.id) {
      try {
        const response = await deleteUser({ id });
        logout();
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await deleteUser({ id });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const handleConfirm = async () => {
  //   setConfirm(true);
  //   setDialogOpen(false);
  // };

  // const handleCancel = () => {
  //   setDialogOpen(false);
  // };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Usuarios" subtitle="Todos los usuarios" />
      </FlexBetween>
      <Alert
        severity="warning"
        sx={{ marginBottom: "1rem", backgroundColor: "transparent" }}
      >
        Si usted se elimina sera dirigido a la pantalla de login
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
        />
      </Box>
      {/* <Dialog open={dialogOpen} onClose={handleCancel}>
        <DialogTitle
          sx={{ textAlign: "center", color: theme.palette.error.main }}
        >
          Advertencia
        </DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar este usuario si usted se elimina
          sera llevado a la pantalla de login?
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

const UserActive = ({ setIsModalOpen, id, setModalContent, isModalOpen }) => {
  const [autoCompleteError, setAutocompleteError] = useState(false);
  const [helperText, setHelperText] = useState("Selecciona un departamento");
  const [autocompleteValor, setAutocompleteValor] = useState(null);

  const theme = useTheme();

  const [activeUser, error] = useActiveUserMutation();
  const { data } = useGetDepartmentsQuery();
  const { data: dataUser } = useGetUserQuery(id);
  //console.log(dataUser);
  const [desactiveUser, error2] = useDesactiveUserMutation();

  //console.log(isModalOpen)

  useEffect(() => {
    if (dataUser?.user?.active === true) {
      setModalContent(<div>Desactivando usuario</div>);
      desactiveUser(id);
      setIsModalOpen(false);
    }
  }, [dataUser]);

  const opciones =
    data?.departamentos?.length > 0
      ? data.departamentos.map((item) => {
          return { label: item?.nombre, value: item?._id };
        })
      : [];

  const handleAutocompleteChange = (event, newValue) => {
    setAutocompleteValor(newValue);
    //setDataForm({ ...dataForm, idDepartamento: newValue?.value });
    setAutocompleteError(false);
    setHelperText("");
    //console.log(dataForm);
  };

  const handleClick = async () => {
    // if (dataUser?.user?.active === true) {
    //   await desactiveUser(id);
    //   setIsModalOpen(false);
    //   return;
    // }
    if (!autocompleteValor) {
      setAutocompleteError(true);
      setHelperText("Selecciona un departamento");
      return;
    } else {
      try {
        const response = await activeUser({
          id,
          departamento: autocompleteValor?.value,
        });
        //console.log(isModalOpen);
        setIsModalOpen(false);
      } catch (error) {
        console.log(error);
      }
    }
    //console.log(id, autocompleteValor.value);
  };

  return (
    <div
      className="editForm"
      style={{
        backgroundColor: theme.palette.background.alt,
        color: theme.palette.text.primary,
        padding: "1rem",
        //borderRadius: "10px",
        //boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
      }}
    >
      <Autocomplete
        options={opciones}
        value={autocompleteValor}
        onChange={handleAutocompleteChange}
        sx={{ width: "100%", mb: 2 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Departamento"
            variant="outlined"
            error={autoCompleteError}
            helperText={helperText}
          />
        )}
      ></Autocomplete>

      <Button
        variant="contained"
        color="secondary"
        sx={{ width: "100%" }}
        onClick={handleClick}
      >
        Guardar
      </Button>
    </div>
  );
};

export default Users;
