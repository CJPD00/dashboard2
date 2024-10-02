import { Schema, model } from "mongoose";

const publicacionSchema = new Schema({
  title: {
    type: String,
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
    type: String,
    required: true,
  },
});

export default model("Publicacion", publicacionSchema);
