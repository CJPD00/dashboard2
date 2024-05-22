import Departamento from "../models/departamento.js";

//getDepartamentosWhitCarreras
export const getDepartamentosWhitCarreras = async (req, res) => {
  try {
    const departamentos = await Departamento.find().populate("carreras");
    res.status(200).json({ departamentos, code: 200 });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//postDepartamento
export const postDepartamento = async (req, res) => {
  const { nombre, cantidadProfesores } = req.body;

  const newDepartamento = new Departamento({
    nombre,
    cantidadProfesores,
  });
  try {
    await newDepartamento.save();
    res.status(201).json({
      message: "Departamento creado exitosamente",
      code: 201,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
