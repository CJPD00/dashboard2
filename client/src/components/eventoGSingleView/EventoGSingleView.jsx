//import React from "react";
import Header from "../Header";
import { Box, Button, Typography, useTheme } from "@mui/material";
import FlexBetween from "../FlexBetween";
import { useParams } from "react-router-dom";
import { useGetEventoByIdQuery } from "../../state/api";
import dayjs from "dayjs";

const EventoGSingleView = () => {
  const theme = useTheme();
  const { id } = useParams();

  const { data, isLoading } = useGetEventoByIdQuery(id);

  //console.log(id);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title={`Evento ${data?.evento?.title}`} subtitle=" " />
      </FlexBetween>

      <Box
        mt="20px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="20px"
        sx={{
          "& > div": {
            backgroundColor: theme.palette.background.alt,
            padding: "20px",
            borderRadius: "10px",
            boxShadow: theme.shadows[2],
          },
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography variant="h2" textAlign="center" fontWeight="bold" sx={{ mb: "10px",color: theme.palette.secondary[100] }}>
            {data && data?.evento?.title}
          </Typography>
          <Typography
            variant="subtitle2"
            textAlign="center"
            mt="10px"
            color={theme.palette.secondary[300]}
          >
            {data && data?.evento?.description}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="10px"
          sx={{
            "& > div": {
              display: "flex",
              alignItems: "center",
              gap: "5px",
            },
            width: "100%"
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ color: theme.palette.secondary[100] }}>Fecha:</Typography>
          <Typography variant="h5" sx={{ color: theme.palette.secondary[300] }}>
            {data && dayjs(data?.evento?.day).format("DD/MM/YYYY")}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="10px"
          sx={{
            "& > div": {
              display: "flex",
              alignItems: "center",
              gap: "5px",
              
            },
            width: "100%"
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ color: theme.palette.secondary[100] }}>Tipo:</Typography>
          <Typography variant="h5" sx={{ color: theme.palette.secondary[300] }}>{data && data?.evento?.type}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default EventoGSingleView;
