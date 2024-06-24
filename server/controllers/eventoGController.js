import eventoGeneral from "../models/eventoGeneral.js";

export const getEventos = async (req, res) => {
  try {
    const eventos = await eventoGeneral.find();
    return res.status(200).json({ eventos, code: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//post
export const createEventos = async (req, res) => {
  try {
    const evento = await eventoGeneral.create(req.body);
    return res.status(200).json({ evento, code: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
