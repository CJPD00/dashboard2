//modelo de departamento

import mongoose from "mongoose";
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

export default mongoose.model("Departamento", departamentoSchema);
