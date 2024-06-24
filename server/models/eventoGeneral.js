import { Schema, model } from "mongoose";

const eventoGeneralSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
    exclusive: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: [
        "facultad",
        "universidad",
        "provincial",
        "nacional",
        "internacional",
      ],
      default: "facultad",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("EventoGeneral", eventoGeneralSchema);
