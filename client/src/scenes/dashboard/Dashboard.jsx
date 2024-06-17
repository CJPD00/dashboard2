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
import StatBox from "../../components/statBox/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetTotalsQuery();

  //console.log("🚀 ~ file: Dashboard.jsx:Dashboard ~ data", data);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
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
          description="En todo el mundo"
          icon={
            <Groups2Outlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total de departamentos"
          value={data && data.totalDepartamentos}
          description="Since last month"
          icon={
            <ApartmentOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
