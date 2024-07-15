import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTheme, useMediaQuery } from "@mui/material";
import { getAccessToken } from "../../state/auth";
import { Navigate } from "react-router-dom";
import SigninForm from "../../components/signinForm/SiginForm";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Auth = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("( max-width: 600px )");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (getAccessToken()) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Box
      sx={{
        //color: theme.palette.secondary[200]
        // display: "flex",
        // justifyContent: "center",
        width: isSmallScreen ? "100%" : "50%",
        margin: "0 auto",
        marginTop: "5rem",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.secondary[300],
            },
            "& .Mui-selected": {
              color: theme.palette.secondary[300],
            },
            "& .MuiTab-root": {
              //color: theme.palette.secondary[100],
            },
          }}
        >
          <Tab label="Acceso" {...a11yProps(0)} />
          <Tab label="Registro" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SigninForm />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
};

export default Auth;
