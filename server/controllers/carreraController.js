import Carrera from "../models/carrera.js";
import Departamento from "../models/departamento.js";

//get allCarreras
export const getAllCarreras = async (req, res) => {
  try {
    const carreras = await Carrera.find();
    res.status(200).json({ carreras, code: 200 });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get carreras by idDepartamento
export const getCarrerasByIdDepartamento = async (req, res) => {
  try {
    const { id } = req.params;
    const carreras = await Carrera.find({ idDepartamento: id });
    res.status(200).json({ carreras, code: 200 });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//postCarrera
export const postCarrera = async (req, res) => {
  const { nombre, description, idDepartamento } = req.body;
  const newCarrera = new Carrera({
    nombre,
    description,
    idDepartamento,
  });
  try {
    //añadir al departamento la carrera
    const departamento = await Departamento.findById(idDepartamento);
    if (!departamento) {
      return res.status(404).json({
        message: "Departamento no encontrado",
        code: 404,
      });
    }

    await newCarrera.save();
    departamento.carreras.push(newCarrera._id);

    await departamento.save();

    res.status(201).json({
      message: "Carrera creada exitosamente",
      code: 201,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
