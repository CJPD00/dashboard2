import Projecto from "../models/projecto.js";
import Carrera from "../models/carrera.js";

export const createProjecto = async (req, res) => {
  const { titulo, description, autor, idCarrera } = req.body;
  try {
    const newProjecto = new Projecto({
      titulo,
      description,
      autor,
      idCarrera,
    });

    //agregar al carrera
    // const carrera = await Carrera.findById(idCarrera);
    // if (!carrera) {
    //   return res.status(404).json({
    //     message: "Carrera no encontrada",
    //     code: 404,
    //   });
    // }

    // carrera.projectos.push(newProjecto._id);

    // //agregar al projecto
    // newProjecto.carrera = carrera.nombre;

    await newProjecto.save();
    //await carrera.save();

    res.status(201).json({
      message: "Projecto creado exitosamente",
      code: 201,
      projecto: newProjecto,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const getProjectos = async (req, res) => {
  //console.log("llegue al metodo getProjectos");
  try {
    //pagination
    const { page = 1, limit = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
      console.log(sortFormatted);
      return sortFormatted;
    };

    const sortFormatted = sort ? generateSort() : {};

    const projectos = await Projecto.find({
      $or: [
        { titulo: { $regex: search, $options: "i" } },
        { autor: { $regex: search, $options: "i" } },
        { estado: { $regex: search, $options: "i" } },
        { tipo: { $regex: search, $options: "i" } },
        { carrera: { $regex: search, $options: "i" } },
      ],
    })
      .sort(sortFormatted)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("idCarrera");

    const total = await Projecto.countDocuments({
      $or: [
        { titulo: { $regex: search, $options: "i" } },
        { autor: { $regex: search, $options: "i" } },
        { estado: { $regex: search, $options: "i" } },
        { tipo: { $regex: search, $options: "i" } },
        { carrera: { $regex: search, $options: "i" } },
      ],
    });

    res.status(200).json({ projectos, code: 200, total });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const projecto = await Projecto.findById(id).populate("idCarrera");
    if (!projecto) {
      console.log("entre aqui");
      return res.status(404).json({
        message: "Projecto no encontrado",
        code: 404,
      });
    }
    res.status(200).json({ projecto, code: 200 });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const deleteProjecto = async (req, res) => {
  const { id } = req.params;
  try {
    const projecto = await Projecto.deleteOne({ _id: id });
    if (!projecto) {
      return res.status(404).json({
        message: "Projecto no encontrado",
        code: 404,
      });
    }
    res
      .status(200)
      .json({ message: "Projecto eliminado exitosamente", code: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateProjecto = async (req, res) => {
  const { id } = req.params;
  const { titulo, description, autor, estado, tipo, sector, idCarrera } =
    req.body;

  try {
    const updatedProjecto = await Projecto.findByIdAndUpdate(
      id,
      { titulo, description, autor, idCarrera, estado, tipo, sector },
      { new: true }
    ).populate("idCarrera");
    if (!updatedProjecto) {
      return res.status(404).json({
        message: "Projecto no encontrado",
        code: 404,
      });
    }
    res.status(200).json({
      message: "Projecto actualizado exitosamente",
      code: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
