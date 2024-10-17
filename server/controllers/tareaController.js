import Tarea from "../models/tarea.js";

//getAll
export const getTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.status(200).json({ tareas, code: 200 });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTareaById = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findById(id);
    res.status(200).json({ tarea, code: 200 });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const createTarea = async (req, res) => {
  const tarea = req.body;
  const newTarea = new Tarea(tarea);
  try {
    await newTarea.save();
    res.status(201).json({ newTarea, code: 201 });
  } catch (error) {
    console.log(error)
    res.status(409).json({ message: error.message });
  }
};

export const updateTarea = async (req, res) => {
  try {
    await Tarea.updateOne({ _id: req.params.id }, req.body);
    res
      .status(200)
      .json({ message: "Tarea actualizada exitosamente", code: 200 });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const deleteTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByIdAndDelete(id);
    if (!tarea) {
      return res
        .status(404)
        .json({ message: "Tarea no encontrada", code: 404 });
    }
    res
      .status(200)
      .json({ message: "Tarea eliminada exitosamente", code: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
