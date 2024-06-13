import Personal from "../models/personal.js";
import Projecto from "../models/projecto.js";
import getCountryIso3 from "country-iso-2-to-3";

//getAllPersonal
export const getAllPersonal = async (req, res) => {
  try {
    const personal = await Personal.find().populate("projecto");
    res.status(200).json({ personal, code: 200 });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//getpersonal por projecto
export const getPersonalByProject = async (req, res) => {
  try {
    const { id } = req.params;
    const personal = await Personal.find({ projecto: id }).populate("projecto");
    res.status(200).json({ personal, code: 200 });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//addpersonal
export const addPersonal = async (req, res) => {
  const { name, lastname, email, ocupation, tipo, country, projecto } =
    req.body;
  try {
    const newPersonal = new Personal({
      name,
      lastname,
      email,
      ocupation,
      tipo,
      country,
      projecto,
    });

    //agregar al projecto
    const project = await Projecto.findById(projecto);
    if (!project) {
      return res.status(404).json({
        message: "Projecto no encontrado",
        code: 404,
      });
    }
    project.miembros.push(newPersonal._id);

    await project.save();
    await newPersonal.save();

    res.status(201).json({
      message: "Personal creado exitosamente",
      code: 201,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//getGeography
export const getGeography = async (req, res) => {
  try {
    const personal = await Personal.find();

    const mappedLocations = personal.reduce((acc, { country }) => {
      const iso3 = getCountryIso3(country);

      if (!acc[iso3]) {
        acc[iso3] = 0;
      }
      acc[iso3]++;

      return acc;
    }, {});

    //console.log(mappedLocations);

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json({ locations: formattedLocations, code: 200 });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
