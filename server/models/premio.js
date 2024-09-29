import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const premioSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Premio", premioSchema);
