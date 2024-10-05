import { Schema, model } from "mongoose";

const estatutoSchema = new Schema(
  {
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

export default model("Estatuto", estatutoSchema);
