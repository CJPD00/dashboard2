//modelo carrera

import mongoose from "mongoose";
import Projecto from "./projecto.js";
import Publicacion from "./publicacion.js";
const Schema = mongoose.Schema;
const carreraSchema = new Schema(
  {
    nombre: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    idDepartamento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departamento",
      required: true,
    },
    departamento: {
      type: String,
      required: true,
    },
    projectos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projecto",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

carreraSchema.pre("deleteOne", async function (next) {
  try {
    console.log("Middleware de deleteOne se está ejecutando");
    const { _conditions } = this;
    //console.log(_conditions);
    const carrera = _conditions._id;
    //console.log(typeof depart);

    const projectos = await Projecto.find({ idCarrera: carrera });
    const publicaciones = await Publicacion.find({ carrera: carrera });
    for (const projecto of projectos) {
      await projecto.deleteOne({ idCarrera: carrera });
    }

    for (const publicacion of publicaciones) {
      await publicacion.deleteOne({ carrera: carrera });
    }
    next();
    console.log("Middleware de deleteOne finalizado");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default mongoose.model("Carrera", carreraSchema);
