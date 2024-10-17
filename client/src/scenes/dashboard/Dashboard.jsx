import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import { notification } from "antd";
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
  UploadOutlined,
} from "@mui/icons-material";
import BreakdownChart from "../../components/breakdownChart/BreakdownChart";
import { useGetTotalsQuery } from "../../state/api";
import { useGetTotalsRecentQuery } from "../../state/api";
import {
  useGetUsersQuery,
  useLazyDownloadEstatutoQuery,
  useGetExtEstatutoQuery,
} from "../../state/api";
import StatBox from "../../components/statBox/StatBox";
import { DataGrid } from "@mui/x-data-grid";
import useModal from "../../hooks/useModal";
import Estatuto from "../../components/estatutoForm/Estatuto";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetTotalsQuery();
  const { data: data2, isLoading: isLoading2 } = useGetTotalsRecentQuery();
  const { data: data3, isLoading: isLoading3 } = useGetUsersQuery();

  const { setIsModalOpen, setModalContent, setModalTitle } = useModal();

  const [downloadEstatuto, { isLoading: isLoading4 }] =
    useLazyDownloadEstatutoQuery();

  const { data: data4 } = useGetExtEstatutoQuery();

  //console.log(data4);

  if (isLoading || isLoading2 || isLoading3) return "Loading...";

  //console.log("🚀 ~ file: Dashboard.jsx:Dashboard ~ data", data);
  //console.log("🚀 ~ file: Dashboard.jsx:Dashboard ~ data2", data2);
  //console.log("🚀 ~ file: Dashboard.jsx:Dashboard ~ data3", data3);

  const columns = [
    // {
    //   field: "_id",
    //   headerName: "ID",
    //   flex: 0.7,
    // },
    {
      field: "name",
      headerName: "Nombre",
      flex: 0.3,
    },

    {
      field: "lastname",
      headerName: "Apellido",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Rol",
      flex: 0.5,
    },
  ];

  const handleUpload = () => {
    setIsModalOpen(true);
    setModalTitle("Subir Estatutos");
    setModalContent(<Estatuto setIsModalOpen={setIsModalOpen} />);
  };

  const handleDownload = async () => {
    try {
      const response = await downloadEstatuto(); // Suponiendo que `trigger` es la función que llama a la API.

      //console.log(data.recurso);

      if (response.error) {
        notification.error({
          message: "No hay documento para descargar", // Asegúrate de que estás accediendo correctamente al mensaje de error
        });
        return;
      }

      // Crear un objeto URL a partir del blob
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      }); // Ajusta el tipo según lo que estés descargando
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace temporal para descargar
      const a = document.createElement("a");
      a.href = url;
      a.download = `estatutos.${data4.ext}` || "archivo"; // Puedes establecer un nombre por defecto
      document.body.appendChild(a);
      a.click();

      // Limpiar el enlace y liberar el objeto URL
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
      notification.error({
        message: "Error al descargar el archivo",
      });
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="Panel De Control"
          subtitle="Bienvenido a la Cátedra Honorífica de Ciencias Técnicas"
        />
        <FlexBetween>
          {user.role === "admin" && (
            <Button
              sx={{
                ":hover": {
                  backgroundColor: "secondary.light",
                  color: "neutral.white",
                },
                backgroundColor: "secondary.main",
                color: "neutral.white",
                borderRadius: "10px",
                padding: "0.5rem 1rem",
                marginRight: "1rem",
              }}
              startIcon={<UploadOutlined />}
              onClick={handleUpload}
            >
              Subir Estatutos
            </Button>
          )}
          <Button
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
            startIcon={<DownloadOutlined />}
            onClick={handleDownload}
          >
            Descargar Estatutos
          </Button>
        </FlexBetween>
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
          description="El último mes"
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
          description="El último mes"
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
          description="El último mes"
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
          description="El último mes"
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
