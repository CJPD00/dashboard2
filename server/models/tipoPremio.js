import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tipoPremioSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("TipoPremio", tipoPremioSchema);
