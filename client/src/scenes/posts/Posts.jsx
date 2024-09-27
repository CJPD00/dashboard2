import React from "react";
import Header from "../../components/Header";
import { useTheme, Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "../../components/FlexBetween";
import { BorderColorOutlined } from "@mui/icons-material";

const Posts = () => {
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Publicaciones" subtitle="Todas Las Publicaciones" />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<BorderColorOutlined />}
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
          // onClick={handlePost}
        >
          Agregar Publicación
        </Button>
      </FlexBetween>
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
        {/* <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={rows}
          columns={columns}
        /> */}
      </Box>
    </Box>
  );
};

export default Posts;
