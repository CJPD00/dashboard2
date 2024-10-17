import { Schema, model } from "mongoose";

const tareaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    responsable: {
      type: String,
      required: true,
    },
    lugar: {
      type: String,
      required: true,
    },
    // departamento: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Departamento",
    //   required: true,
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Tarea", tareaSchema);
