//modelo carrera

import mongoose from "mongoose";
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

export default mongoose.model("Carrera", carreraSchema);
