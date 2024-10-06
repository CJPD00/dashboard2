import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const premioSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    cantidadProjectos: {
      type: Number,
      required: true,
      default: 0,
    },
    projectos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projecto",
      },
    ],
    recurso: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Premio", premioSchema);
