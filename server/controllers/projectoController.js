import Projecto from "../models/projecto.js";
import Carrera from "../models/carrera.js";

export const createProjecto = async (req, res) => {
  const {
    titulo,
    description,
    autor,
    miembros,
    estado,
    tipo,
    sector,
    idCarrera,
  } = req.body;
  try {
    const newProjecto = new Projecto({
      titulo,
      description,
      autor,
      miembros,
      estado,
      tipo,
      sector,
      idCarrera,
    });

    //agregar al carrera
    const carrera = await Carrera.findById(idCarrera);
    if (!carrera) {
      return res.status(404).json({
        message: "Carrera no encontrada",
        code: 404,
      });
    }

    carrera.projectos.push(newProjecto._id);

    await newProjecto.save();
    await carrera.save();

    res.status(201).json({
      message: "Projecto creado exitosamente",
      code: 201,
      projecto: newProjecto,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProjectos = async (req, res) => {
  try {
    const projectos = await Projecto.find().populate("idCarrera");
    res.status(200).json({ projectos, code: 200 });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
