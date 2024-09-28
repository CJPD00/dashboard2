import Premio from "../models/premio.js";

export const getPremios = async (req, res) => {
  try {
    const premios = await Premio.find();
    res.status(200).json({ premios, code: 200 });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPremio = async (req, res) => {
  const premio = req.body;
  const newPremio = new Premio(premio);
  try {
    await newPremio.save();
    res.status(201).json({ message: "Premio creado exitosamente", code: 201 });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePremio = async (req, res) => {
  const premio = req.body;
  const updatePremio = new Premio(premio);
  try {
    await Premio.updateOne({ _id: req.params.id }, updatePremio);
    res
      .status(200)
      .json({ message: "Premio actualizado exitosamente", code: 200 });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePremio = async (req, res) => {
  try {
    await Premio.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Premio eliminado exitosamente", code: 200 });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
