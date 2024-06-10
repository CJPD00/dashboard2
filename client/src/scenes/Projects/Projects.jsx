import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetProjectsQuery } from "../../state/api";
import Header from "../../components/Header";
import { useTheme, Box } from "@mui/material";
import { render } from "react-dom";
import DataGridCustomToolbar from "../../components/dataGridCustomToolbar/DataGridCustomToolbar";

const Projects = () => {
  const theme = useTheme();

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
  console.log(data);

  const columns = [
    {
      field: "titulo",
      headerName: "Titulo",
      flex: 0.5,
    },
    {
      field: "autor",
      headerName: "Autor",
      flex: 0.4,
    },

    {
      field: "estado",
      headerName: "Estado",
      flex: 0.4,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      flex: 0.4,
    },
    {
      field: "sector",
      headerName: "Sector",
      flex: 0.4,
      renderCell: (params) => (params.value ? "SI" : "NO"),
    },
    {
      field: "idCarrera",
      headerName: "Carrera",
      flex: 0.5,
      renderCell: (params) => params.value.nombre,
    },
    // {
    //   field: "occupation",
    //   headerName: "Occupation",
    //   flex: 1,
    // },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Proyectos" subtitle="Todos los proyectos." />
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
          rows={data && data.projectos ? data.projectos : []}
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
        />
      </Box>
    </Box>
  );
};

export default Projects;
