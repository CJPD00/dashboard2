//importar schema y model de moongose
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const personalSchema = new Schema(
  {
    name: {
      type: String,
      //unique: true,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      //unique: true,
      required: true,
    },
    ocupation: {
      type: String,
      default: "Desconocido",
    },
    tipo: {
      type: String,
      enum: ["miembro", "colaborador"],
      default: "colaborador",
    },
    country: {
      type: String,
      default: "CU",
    },
    projecto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projecto",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Personal", personalSchema);
