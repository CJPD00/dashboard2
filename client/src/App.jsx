import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./scenes/layout/Layout";
import Dashboard from "./scenes/dashboard/Dashboard";
import Departments from "./scenes/departments/Departments";
import Users from "./scenes/users/Users";
import Projects from "./scenes/Projects/Projects";
import Careers from "./scenes/careers/Careers";
import Geography from "./scenes/geography/Geography";
import Breakdown from "./scenes/breakdown/Breakdown";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout></Layout>}>
              <Route
                path="/"
                element={<Navigate to="/dashboard" replace></Navigate>}
              />
              <Route path="dashboard" element={<Dashboard></Dashboard>} />
              <Route
                path="Departamentos"
                element={<Departments></Departments>}
              />
              <Route path="Usuarios" element={<Users></Users>} />
              <Route path="Proyectos" element={<Projects></Projects>} />
              <Route path="Carreras" element={<Careers></Careers>} />
              <Route path="Geografia" element={<Geography></Geography>} />
              <Route path="Desglose" element={<Breakdown></Breakdown>} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
