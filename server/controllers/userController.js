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
    const users = await User.find();
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
        message: "User not found",
        code: 401,
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid password",
        code: 401,
      });
    }
    const token = createToken(user);
    const refreshToken = createRefreshToken(user);
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