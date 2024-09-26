import Header from "../../components/Header";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetUsersQuery } from "../../state/api";
import FlexBetween from "../../components/FlexBetween";
import { Groups2Outlined } from "@mui/icons-material";
import { useState } from "react";
import { useGetDepartmentsQuery, useActiveUserMutation } from "../../state/api";
import {
  TextField,
  Button,
  useTheme,
  Alert,
  Autocomplete,
} from "@mui/material";
import useModal from "../../hooks/useModal";

const Users = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetUsersQuery();
  const { setIsModalOpen, setModalContent, setModalTitle } = useModal();
  //console.log(data);

  const rows =
    data?.users?.length > 0
      ? data.users.map((row) => ({
          id: row._id,
          name: row.name,
          active: row.active,
          lastname: row.lastname,
          role: row.role,
        }))
      : [];

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.3,
    },
    {
      field: "lastName",
      headerName: "Apellido",
      flex: 0.3,
    },
    {
      field: "role",
      headerName: "Role",
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
            //onClick={() => handleDelete(params.row.id)}
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
    setModalContent(<UserActive setIsModalOpen={setIsModalOpen} id={id} />);
    setModalTitle("Editar usuario");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Usuarios" subtitle="Todos los usuarios" />
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
    </Box>
  );
};

const UserActive = ({ setIsModalOpen, id }) => {
  const [autoCompleteError, setAutocompleteError] = useState(false);
  const [helperText, setHelperText] = useState("Selecciona un departamento");
  const [autocompleteValor, setAutocompleteValor] = useState(null);

  const theme = useTheme();

  const [activeUser, error] = useActiveUserMutation();
  const { data } = useGetDepartmentsQuery();

  const opciones =
    data?.departamentos?.length > 0
      ? data.departamentos.map((item) => {
          return { label: item?.nombre, value: item?._id };
        })
      : [];

  const handleAutocompleteChange = (event, newValue) => {
    setAutocompleteValor(newValue);
    setDataForm({ ...dataForm, idDepartamento: newValue?.value });
    setAutocompleteError(false);
    setHelperText("");
    //console.log(dataForm);
  };

  const handleClick = async () => {
    if (!autocompleteValor) {
      setAutocompleteError(true);
      setHelperText("Selecciona un departamento");
    } else {
      const departamento = autocompleteValor?.value;
      await activeUser({ id, departamento });
      setIsModalOpen(false);
    }
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
