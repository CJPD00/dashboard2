import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import {
  Box,
  useTheme,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  DownloadOutlined,
  Groups2Outlined,
  ApartmentOutlined,
  BuildOutlined,
  ReceiptLongOutlined,
} from "@mui/icons-material";
import BreakdownChart from "../../components/breakdownChart/BreakdownChart";
import { useGetTotalsQuery } from "../../state/api";
import { useGetTotalsRecentQuery } from "../../state/api";
import { useGetUsersQuery } from "../../state/api";
import StatBox from "../../components/statBox/StatBox";
import { DataGrid } from "@mui/x-data-grid";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetTotalsQuery();
  const { data: data2, isLoading: isLoading2 } = useGetTotalsRecentQuery();
  const { data: data3, isLoading: isLoading3 } = useGetUsersQuery();

  if (isLoading || isLoading2 || isLoading3) return "Loading...";

  //console.log("🚀 ~ file: Dashboard.jsx:Dashboard ~ data", data);
  //console.log("🚀 ~ file: Dashboard.jsx:Dashboard ~ data2", data2);
  //console.log("🚀 ~ file: Dashboard.jsx:Dashboard ~ data3", data3);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.3,
    },

    {
      lastName: "lastName",
      headerName: "Last Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Bienvenido a tu  " />
        <Button
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DownloadOutlined sx={{ mr: "10px" }} />
          Descargar Estatutos
        </Button>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="Miembros y Colaboradores"
          value={data && data.totalPersonal}
          description="El ultimo mes"
          icon={
            <Groups2Outlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          increase={data2 && data2.totalPersonalNew}
        />
        <StatBox
          title="Total de departamentos"
          value={data && data.totalDepartamentos}
          description="El ultimo mes"
          icon={
            <ApartmentOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          increase={data2 && data2.totalDepartamentosNew}
        />
        <StatBox
          title="Total de carreras"
          value={data && data.totalCarreras}
          description="El ultimo mes"
          icon={
            <BuildOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          increase={data2 && data2.totalCarrerasNew}
        />
        <StatBox
          title="Total de proyectos"
          value={data && data.totalProjectos}
          description="El ultimo mes"
          icon={
            <ReceiptLongOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          increase={data2 && data2.totalProjectosNew}
        />

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.alt,
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
            loading={isLoading3 || !data3}
            getRowId={(row) => row._id}
            rows={data3 && data3.users}
            columns={columns}
          />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Projectos por tipo
          </Typography>
          <BreakdownChart isDashboard={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
