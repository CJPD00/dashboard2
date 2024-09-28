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
    res.status(409).json({ message: error.message });
  }
};
