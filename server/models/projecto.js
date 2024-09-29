import mongoose from "mongoose";
import Personal from "./personal.js";
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

projectoSchema.pre("deleteOne", async function (next) {
  try {
    console.log("Middleware de deleteOne se está ejecutando");
    const { _conditions } = this;
    //console.log(_conditions);
    const projecto = _conditions._id;
    //console.log(typeof depart);

    const personal = await Personal.find({ projecto: projecto });
    for (const persona of personal) {
      await persona.deleteOne({ projecto: projecto });
    }
    next();
    console.log("Middleware de deleteOne finalizado");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default mongoose.model("Projecto", projectoSchema);
