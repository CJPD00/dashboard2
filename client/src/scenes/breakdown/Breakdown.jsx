import { Box } from "@mui/material";
import Header from "../../components/Header";
import BreakdownChart from "../../components/breakdownChart/BreakdownChart";

const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Desglose" subtitle="Desglose de Proyectos por tipo" />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Breakdown;
