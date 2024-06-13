import { Schema, model } from "mongoose";

const overallStatSchema = new Schema(
  {
    totalMembers: Number,
    totalProjects: Number,
    year: Number,

    monthlyData: [
      {
        month: String,
        totalMembers: Number,
        totalProjects: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalMembers: Number,
        totalProjects: Number,
      },
    ],
    projectsByCategory: {
      type: Map,
      of: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("OverallStat", overallStatSchema);
