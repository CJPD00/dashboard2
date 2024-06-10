import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetCareersQuery } from "../../state/api";

const Careers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCareersQuery();
  console.log(data);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.3,
    },
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
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Carreras" subtitle="Todos las carreras" />
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
          getRowId={(row) => row._id}
          rows={data && data.carreras ? data.carreras : []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Careers;
