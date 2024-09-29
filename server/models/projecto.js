import mongoose from "mongoose";
const Schema = mongoose.Schema;
const projectoSchema = new Schema(
  {
    titulo: {
      type: String,
      //unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    autor: {
      type: String,
      required: true,
    },
    // miembros: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Personal",
    //   },
    // ],
    estado: {
      type: String,
      enum: ["activo", "inactivo", "cancelado"],
      default: "activo",
    },
    tipo: {
      type: String,
      enum: ["tesis", "maestria", "doctorado"],
      default: "tesis",
    },
    sector: {
      type: Boolean,
      default: false,
    },
    idCarrera: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carrera",
      required: true,
    },
    carrera: {
      type: String,
      //required: true,
    },
    recurso: {
      type: String,
      //required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Projecto", projectoSchema);
