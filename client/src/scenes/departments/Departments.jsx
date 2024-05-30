import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { useState } from "react";
import { useGetDepartmentsQuery } from "../../state/api";

import Header from "../../components/Header";

const Departments = () => {
  const { data, isLoading } = useGetDepartmentsQuery();
  //console.log(data);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Departamentos" subtitle="Todos los departamentos." />

      {!isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.departamentos.map((department) => (
            <Department key={department._id} {...department} />
          ))}
        </Box>
      ) : (
        <>Cargando...</>
      )}
    </Box>
  );
};

const Department = ({ nombre, cantidadProfesores, description }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  //console.log(description);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {nombre}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[300]}>
          Cantidad de Profesores: {cantidadProfesores}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Ver Menos" : "Ver Mas"}
        </Button>
      </CardActions>  
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Departments;
