import User from "../models/user.js";
import {
  createToken,
  decodeToken,
  createRefreshToken,
} from "../services/jwtServices.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

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
    if (user.active === false) {
      return res.status(401).json({
        message: "Cuenta inactiva",
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

export const updateUser = async (req, res) => {
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
    res.status(200).json({ user, code: 200, message: "usuario actualizado" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const uploadAvatar = async (req, res) => {
  //console.log(req.headers);
  //console.log(req.params.id);
  //console.log(req.files);
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        code: 404,
      });
    }
    let filePath = req.files.avatar.path;

    let filesplit = filePath.split("\\");

    let fileName = filesplit[filesplit.length - 1];

    let extSplit = fileName.split(".");

    let fileExt = extSplit[1];

    if (fileExt !== "png" && fileExt !== "jpg" && fileExt !== "jpeg") {
      res.status(400).send({ message: "Extensión no válida" });
    }

    user.avatar = fileName;
    //console.log(user);
    await user.save();

    res
      .status(200)
      .json({ message: "Avatar guardado", code: 200, avatarName: user.avatar });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAvatar = (req, res) => {
  const avatarName = req.params.avatarName;
  const filePath = `./uploads/users/${avatarName}`;

  fs.exists(filePath, (exists) => {
    if (exists) {
      res.sendFile(path.resolve(filePath));
    } else {
      res.status(404).send({ message: "La imagen no existe" });
    }
  });
};

export const activateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { departamento } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { active: true, departamento: departamento },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        code: 404,
      });
    }
    res.status(200).json({ user, code: 200, message: "usuario activado" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
