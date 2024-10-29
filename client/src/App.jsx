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
import Calendar from "./scenes/calendar/Calendar";
import Posts from "./scenes/posts/Posts";
import Rewards from "./scenes/rewards/Rewards";
import Tasks from "./scenes/tasks/Tasks";
import AuthProvider from "./providers/authProvider";
import EventoGSingleView from "./components/eventoGSingleView/EventoGSingleView";
import PublicacionSingleView from "./components/publicacionSingleView/PublicacionSingleView";
import TareaSingleView from "./components/tareaSingleView/TareaSingleView";
import ProjectSingleView from "./components/projectSingleView/ProjectSingleView";
import { ModalProvider } from "./providers/ModalProvider";
import { esES } from "@mui/x-data-grid/locales";
import Auth from "./scenes/auth/Auth";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode], esES);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <ModalProvider>
              <Routes>
                <Route path="/login" element={<Auth></Auth>}></Route>
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
                  <Route path="Eventos" element={<Calendar></Calendar>} />
                  <Route path="Publicaciones" element={<Posts></Posts>} />
                  <Route path="Premios" element={<Rewards></Rewards>} />
                  <Route path="Tareas" element={<Tasks></Tasks>} />
                  <Route
                    path="EventoSingle/:id"
                    element={<EventoGSingleView />}
                  />
                  <Route
                    path="PublicacionSingle/:id"
                    element={<PublicacionSingleView />}
                  />
                  <Route path="TareaSingle/:id" element={<TareaSingleView />} />
                  <Route
                    path="ProyectoSingle/:id"
                    element={<ProjectSingleView />}
                  />
                </Route>
              </Routes>
            </ModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
