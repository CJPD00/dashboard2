import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "../FlexBetween";
import useAuth from "../../hooks/useAuth";

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  const { user } = useAuth();

  return (
    <GridToolbarContainer>
      <FlexBetween width={"100%"}>
        <FlexBetween gap="0.5rem">
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        {user.role !== "user" && (
          <TextField
            label="Buscar..."
            size="small"
            sx={{ width: "15rem", mb: "0.5rem" }}
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearch(searchInput)}>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
