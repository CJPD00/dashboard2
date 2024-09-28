import Publicacion from "../models/publicacion.js";

export const getPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.find();
    return res.status(200).json({ publicaciones, code: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPublicacionById = async (req, res) => {
  try {
    const publicacion = await Publicacion.findById(req.params.id);
    return res.status(200).json({ publicacion, code: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPublicaciones = async (req, res) => {
  try {
    const todayDate = new Date();
    const publicacion = new Publicacion({
      ...req.body,
      fecha: todayDate,
    });
    await publicacion.save();

    return res.status(200).json({ publicacion, code: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePublicaciones = async (req, res) => {
  try {
    const publicacion = await Publicacion.findById(req.params.id);
    publicacion.set(req.body);
    await publicacion.save();
    return res.status(200).json({ publicacion, code: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePublicaciones = async (req, res) => {
  try {
    const publicacion = await Publicacion.findById(req.params.id);
    await publicacion.deleteOne();
    return res.status(200).json({ publicacion, code: 200 });
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
