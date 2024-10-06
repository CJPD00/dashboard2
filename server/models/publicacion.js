import { Schema, model } from "mongoose";
import Carrera from "./carrera.js";

const publicacionSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  carrera: {
    type: Schema.Types.ObjectId,
    ref: "Carrera",
    required: true,
  },
});

export default model("Publicacion", publicacionSchema);
