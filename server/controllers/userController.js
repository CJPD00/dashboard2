import User from "../models/user.js";
import {
  createToken,
  decodeToken,
  createRefreshToken,
} from "../services/jwtServices.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        code: 404,
      });
    }
    res.status(200).json({ user, code: 200 });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get allUsers
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users, code: 200 });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//signUp
export const signUp = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;
    const newUser = new User({
      name,
      lastname,
      email,
      password,
    });
    if (name.length < 3 || lastname.length < 3) {
      return res.status(401).json({
        message: "El nombre y el apellido deben tener al menos 3 caracteres",
        code: 401,
      });
    }
    newUser.password = bcrypt.hashSync(password, 10);
    await newUser.save();
    const token = createToken(newUser);
    const refreshToken = createRefreshToken(newUser);
    res.status(201).json({
      token,
      refreshToken,
      code: 201,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "El usuario no existe",
        code: 401,
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Contraseña incorrecta",
        code: 401,
      });
    }
    if (user.role !== "admin") {
      return res.status(401).json({
        message: "No eres administrador",
        code: 401,
      });
    }
    const token = await createToken(user);
    const refreshToken = await createRefreshToken(user);
    res.status(200).json({
      token,
      refreshToken,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, lastname, password } = req.body;

    password = bcrypt.hashSync(password, 10);

    const user = await User.findByIdAndUpdate(
      id,
      { name, lastname, password },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        code: 404,
      });
    }
    res.status(200).json({ user, code: 200 });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
