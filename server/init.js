import dotenv from "dotenv";
import User from "./models/user.js";
import bcrypt from "bcrypt";

dotenv.config();

export const init = async () => {
  try {
    const newUser = new User({
      name: "admin",
      lastname: "admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
      active: true,
    });

    newUser.password = bcrypt.hashSync(newUser.password, 10);

    await newUser.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
