import Projecto from "../models/projecto.js";
import Personal from "../models/personal.js";
import Departamento from "../models/departamento.js";
import Carrera from "../models/carrera.js";

export const getProjectsByType = async (req, res) => {
  try {
    const projectos = await Projecto.find();

    if (!projectos) {
      return res.status(404).json({ message: "No se encontraron proyectos" });
    }

    const projectsByType = projectos.reduce((acc, projecto) => {
      const tipo = projecto.tipo;
      const cantidad = acc[tipo] ? acc[tipo] + 1 : 1;
      acc[tipo] = cantidad;
      return acc;
    }, {});

    return res.status(200).json({ projectsByType, code: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//devolver el total de departamentos,carreras, projectos y personal
export const getTotal = async (req, res) => {
  try {
    const [totalDepartamentos, totalCarreras, totalProjectos, totalPersonal] =
      await Promise.all([
        Departamento.countDocuments(),
        Carrera.countDocuments(),
        Projecto.countDocuments(),
        Personal.countDocuments(),
      ]);
    return res.status(200).json({
      totalDepartamentos,
      totalCarreras,
      totalProjectos,
      totalPersonal,
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//devolver el total de departamentos,carreras, projectos y personal en el último mes
export const getTotalRecent = async (req, res) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const [
      totalProjectosNew,
      totalPersonalNew,
      totalDepartamentosNew,
      totalCarrerasNew,
    ] = await Promise.all([
      Projecto.countDocuments({ createdAt: { $gte: oneMonthAgo } }),
      Personal.countDocuments({ createdAt: { $gte: oneMonthAgo } }),
      Departamento.countDocuments({ createdAt: { $gte: oneMonthAgo } }),
      Carrera.countDocuments({ createdAt: { $gte: oneMonthAgo } }),
    ]);

    return res.status(200).json({
      totalProjectosNew,
      totalPersonalNew,
      totalDepartamentosNew,
      totalCarrerasNew,
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
