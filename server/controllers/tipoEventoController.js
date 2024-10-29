import TipoEvento from "../models/tipoEvento.js";

export const postTipoEvento = async (req, res) => {
  try {
    const { name } = req.body;
    const tipo = new TipoEvento({ name });
    await tipo.save();
    res.json({ tipo, code: 201 });
  } catch (error) {
    res.status(500).json({ message: error.message, code: 500 });
  }
};

export const getTiposEventos = async (req, res) => {
  try {
    const tiposEventos = await TipoEvento.find();
    res.json({ tiposEventos, code: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTipoEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const tipo = await TipoEvento.findByIdAndDelete(id);
    res.json({ tipo, code: 200 });
  } catch (error) {
    console.log(error);
  }
};
