import Projecto from "../models/projecto.js";
import Personal from "../models/personal.js";

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
