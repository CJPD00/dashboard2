import { Schema, model } from "mongoose";

const eventoGeneralSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    day: {
      type: Date,
      required: true,
    },
    // link: {
    //   type: String,
    //   default: null,
    // },
    // exclusive: {
    //   type: Boolean,
    //   default: false,
    // },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("EventoGeneral", eventoGeneralSchema);
