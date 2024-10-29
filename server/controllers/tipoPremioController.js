import TipoPremio from "../models/tipoPremio.js";

export const getTiposPremios = async (req, res) => {
  try {
    const tiposPremios = await TipoPremio.find();
    res.status(200).json({ tiposPremios, code: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postTipoPremio = async (req, res) => {
  try {
    const tipoPremio = await TipoPremio.create(req.body);
    res.status(200).json({ tipoPremio, code: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTipoPremio = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoPremio = await TipoPremio.findByIdAndDelete(id);
    res.status(200).json({ tipoPremio, code: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
