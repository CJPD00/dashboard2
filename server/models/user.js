import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import Departamento from "./departamento.js";

const userSchema = new Schema(
  {
    // Name of the user
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },

    // Last name of the user
    lastname: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },

    // Email of the user, must be unique
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },

    // Password of the user
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
    },

    // Role of the user, defaults to admin
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    // Whether the user is active or not
    active: {
      type: Boolean,
      default: false,
    },
    // Avatar of the user
    avatar: {
      type: String,
    },
    departamento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departamento",
      //default: null,
    },
  },
  {
    // Disable the version key
    versionKey: false,
    // Add timestamps to the document
    timestamps: true,
  }
);

// Set strict to false
userSchema.set("strict", false);

export default model("User", userSchema);
