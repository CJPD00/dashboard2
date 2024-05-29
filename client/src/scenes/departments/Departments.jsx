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
  console.log(data);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  if (!data || isLoading) return "Cargando...";

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Departamentos" subtitle="Todos los departamentos." />
    </Box>
  );
};

export default Departments;
