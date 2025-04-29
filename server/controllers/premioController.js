//import premio from "../models/premio.js";
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
  const premioBody = req.body.premio;

  const premio = JSON.parse(premioBody);

  let filePath = req.files.recurso.path;

  console.log(premio.title, premio.description);
  console.log(filePath);

  let filesplit = filePath.split("\\");

  console.log(filesplit);

  let fileName = filesplit[filesplit.length - 1];

  console.log(fileName);

  let extSplit = fileName.split(".");

  console.log(extSplit);

  let fileExt = extSplit[1];

  console.log(fileExt);

  if (fileExt !== "png" && fileExt !== "jpg") {
    console.log("Extensión no válida");
    return res.status(400).send({ message: "Extensión no válida" });
  }

  const newPremio = new Premio({
    ...premio,
    recurso: fileName,
  });

  try {
    await newPremio.save();
    res.status(201).json({ message: "Premio creado exitosamente", code: 201 });
  } catch (error) {
    console.log(error);
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

export const getPremiosByIdProject = async (req, res) => {
  try {
    const premios = await Premio.find({ projectos: { $in: req.params.id } });
    if (!premios) {
      return res
        .status(404)
        .json({ message: "Premios no encontrados", code: 404 });
    }
    res.status(200).json({ premios, code: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const otorgarPremio = async (req, res) => {
  try {
    const premio = await Premio.findById(req.body.premioId);
    if (!premio) {
      console.log("entre aqui");
      return res
        .status(404)
        .json({ message: "Premio no encontrado", code: 404 });
    }

    //comprobar si el id del projecto ya esta
    if (premio.projectos.includes(req.body.projectId)) {
      return res.status(409).json({
        message: "El proyecto ya tiene este premio otorgado",
        code: 409,
      });
    }

    // Add the project ID to the array of project IDs in the premio
    premio.projectos.push(req.body.projectId);
    premio.cantidadProjectos = premio.cantidadProjectos + 1;
    await premio.save();

    res
      .status(200)
      .json({ message: "Premio otorgado exitosamente", code: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const revocarPremio = async (req, res) => {
  try {
    const premio = await Premio.findById(req.body.premioId);

    if (!premio) {
      return res.status(404).json({
        message: "No se encontraron premios con el proyecto especificado",
        code: 404,
      });
    }

    //console.log(premio.projectos[0].toString());
    //console.log(req.body.projectId);

    premio.projectos = premio.projectos.filter(
      (projectId) => projectId.toString() !== req.body.projectId
    );

    console.log(premio);
    if (premio.projectos.length < premio.cantidadProjectos) {
      premio.cantidadProjectos = premio.projectos.length;
    }
    await premio.save();

    res.status(200).json({
      message: "Premios revocados exitosamente para el proyecto especificado",
      code: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
