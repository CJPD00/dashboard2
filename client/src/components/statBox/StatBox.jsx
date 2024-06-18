import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "../FlexBetween";

const StatBox = ({ title, value, icon, description, increase }) => {
  return (
    <Box
      gridColumn="span 3"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={useTheme().palette.background.alt}
      borderRadius="0.55rem"
    >
      <FlexBetween>
        <Typography
          variant="h6"
          sx={{ color: useTheme().palette.secondary[100] }}
        >
          {title}
        </Typography>
        {icon}
      </FlexBetween>
      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ color: useTheme().palette.secondary[200] }}
      >
        {value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: useTheme().palette.secondary.light }}
        >
          {`+${increase}`}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: useTheme().palette.secondary.light }}
        >
          {description}
        </Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
