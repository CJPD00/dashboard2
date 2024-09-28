//import React from "react";
import Header from "../Header";
import { Box, Button, Typography, useTheme } from "@mui/material";
import FlexBetween from "../FlexBetween";
import { useParams } from "react-router-dom";
import { useGetPublicacionByIdQuery } from "../../state/api";
import { LaunchOutlined } from "@mui/icons-material";

const PublicacionSingleView = () => {
  const theme = useTheme();
  const { id } = useParams();

  const { data, isLoading } = useGetPublicacionByIdQuery(id);

  // console.log(id);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title={`Evento ${data?.publicacion?.title}`} subtitle=" " />
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
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: theme.palette.secondary[100] }}
          >
            Titulo:
          </Typography>
          <Typography variant="h5" sx={{ color: theme.palette.secondary[300] }}>
            {data && data?.publicacion?.title}
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
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: theme.palette.secondary[100] }}
          >
            Autor:
          </Typography>
          <Typography variant="h5" sx={{ color: theme.palette.secondary[300] }}>
            {data && data?.publicacion?.autor}
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
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: theme.palette.secondary[100] }}
          >
            Enlace:
          </Typography>
          <Typography variant="h5" sx={{ color: theme.palette.secondary[300] }}>
            {data && data?.publicacion?.link}
          </Typography>
          <a href={data && data?.publicacion?.link} target="_blank">
            <LaunchOutlined
              sx={{
                color: theme.palette.secondary[300],
                "&:hover": {
                  color: theme.palette.secondary[500],
                  cursor: "pointer",
                },
              }}
            ></LaunchOutlined>
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default PublicacionSingleView;
