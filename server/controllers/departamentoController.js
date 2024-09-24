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
  const { nombre, cantidadProfesores, description } = req.body;

  const newDepartamento = new Departamento({
    nombre,
    cantidadProfesores,
    description,
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

export const deleteDepartamento = async (req, res) => {
  const { nombre } = req.params;
  try {
    const deletedDepartamento = await Departamento.deleteOne({ nombre });
    if (!deletedDepartamento) {
      return res.status(404).json({
        message: "Departamento no encontrado",
        code: 404,
      });
    }
    res.status(200).json({
      message: "Departamento eliminado exitosamente",
      code: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDepartamento = async (req, res) => {
  const { id } = req.params;
  const { nombre, cantidadProfesores, description } = req.body;

  //console.log(nombre, cantidadProfesores, description, id);

  try {
    const updatedDepartamento = await Departamento.findByIdAndUpdate(
      id,
      { nombre, cantidadProfesores, description },
      { new: true }
    );
    if (!updatedDepartamento) {
      return res.status(404).json({
        message: "Departamento no encontrado",
        code: 404,
      });
    }
    res.status(200).json({
      message: "Departamento actualizado exitosamente",
      code: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
