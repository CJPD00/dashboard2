import Carrera from "../models/carrera.js";
import Departamento from "../models/departamento.js";

//get allCarreras
export const getAllCarreras = async (req, res) => {
  try {
    const carreras = await Carrera.find()
      .populate("idDepartamento")
      .populate("projectos");
    res.status(200).json({ carreras, code: 200 });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get carrera by id
export const getCarreraById = async (req, res) => {
  try {
    const { id } = req.params;
    const carrera = await Carrera.findById(id).populate("idDepartamento");
    res.status(200).json({ carrera, code: 200 });
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
    const carreras = await Carrera.find({ idDepartamento: id }).populate(
      "idDepartamento"
    );
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

    departamento.carreras.push(newCarrera._id);
    newCarrera.departamento = departamento.nombre;

    await departamento.save();
    await newCarrera.save();

    res.status(201).json({
      message: "Carrera creada exitosamente",
      code: 201,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//updateCarrera
export const updateCarrera = async (req, res) => {
  const { id } = req.params;
  const { nombre, description, idDepartamento } = req.body;
  try {
    const departamentoData = await Departamento.findById(idDepartamento);
    console.log(departamentoData);
    const departamento = departamentoData?.nombre;
    const updatedCarrera = await Carrera.findByIdAndUpdate(
      id,
      { nombre, description, idDepartamento, departamento },
      { new: true }
    );
    if (!updatedCarrera) {
      return res.status(404).json({
        message: "Carrera no encontrada",
        code: 404,
      });
    }
    res.status(200).json({
      message: "Carrera actualizada exitosamente",
      code: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//deleteCarrera
export const deleteCarrera = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCarrera = await Carrera.deleteOne({ _id: id });
    if (!deletedCarrera) {
      return res.status(404).json({
        message: "Carrera no encontrada",
        code: 404,
      });
    }
    res.status(200).json({
      message: "Carrera eliminada exitosamente",
      code: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
