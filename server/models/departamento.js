//modelo de departamento

import mongoose from "mongoose";
import Carrera from "./carrera.js";
const Schema = mongoose.Schema;

const departamentoSchema = new Schema(
  {
    nombre: {
      type: String,
      unique: true,
      required: true,
    },
    cantidadProfesores: {
      type: Number,
      required: true,
      default: 0,
    },

    description: {
      type: String,
      required: true,
    },

    carreras: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carrera",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

departamentoSchema.pre("remove", async function (next) {
  try {
    await Carrera.deleteMany({ idDepartamento: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Departamento", departamentoSchema);
