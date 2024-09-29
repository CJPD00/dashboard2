//import React from 'react'
import { useParams } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import {
  Box,
  useTheme,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  ReceiptLongOutlined,
  ClosedCaptionOutlined,
  DescriptionOutlined,
  Person2Outlined,
  DeviceThermostatOutlined,
  TypeSpecimenOutlined,
  PrecisionManufacturingOutlined,
  HandymanOutlined,
} from "@mui/icons-material";
import StatBox from "../../components/statBox/StatBox";
import Personal from "../personal/Personal";
import { useGetProjectByIdQuery } from "../../state/api";
import useModal from "../../hooks/useModal";
import ProjectFormEdit from "../projectFormEdit/ProjectFormEdit";
import ProjectReward from "../projectReward/ProjectReward";

const ProjectSingleView = () => {
  const { id } = useParams();
  //console.log(id); // Output: "some-id"
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const theme = useTheme();
  const { setIsModalOpen, setModalContent, setModalTitle } = useModal();

  const { data, isLoading } = useGetProjectByIdQuery({ id });

  //console.log(data);

  const handleEdit = () => {
    setIsModalOpen(true);
    setModalContent(
      <ProjectFormEdit data={data} setIsModalOpen={setIsModalOpen} />
    );
    setModalTitle("Editar Projecto");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title={`Projecto ${data?.projecto?.titulo}`}
          //subtitle="Bienvenido a tu  "
        />
        <Button
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
          startIcon={<ReceiptLongOutlined />}
          onClick={handleEdit}
        >
          Editar Projecto
        </Button>
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="Titulo del proyecto"
          value={data && data.projecto.titulo}
          description=""
          icon={
            <ClosedCaptionOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          increase=""
        />
        <StatBox
          title="Descripción del proyecto"
          value={data && data.projecto.description}
          description=""
          icon={
            <DescriptionOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          increase=""
        />
        <StatBox
          title="Autor"
          value={data && data.projecto.autor}
          description=""
          icon={
            <Person2Outlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          increase=""
        />
        <StatBox
          title="Estado del proyecto"
          value={data && data.projecto.estado}
          description=""
          icon={
            <DeviceThermostatOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          increase=""
        />
        <StatBox
          title="Tipo de proyecto"
          value={data && data.projecto.tipo}
          description=""
          icon={
            <TypeSpecimenOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          increase=""
        />
        <StatBox
          title="Sector Estrategico"
          value={data?.projecto.sector ? "Si" : "no"}
          description=""
          icon={
            <PrecisionManufacturingOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          increase=""
        />
        <StatBox
          title="Carrera"
          value={data && data.projecto.idCarrera.nombre}
          description=""
          icon={
            <HandymanOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          increase=""
        />
      </Box>
      <Personal id={id}></Personal>
      <ProjectReward id={id}></ProjectReward>
    </Box>
  );
};

export default ProjectSingleView;
