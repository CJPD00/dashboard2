import { Router } from "express";
import {
  getAllUsers,
  getUser,
  signUp,
} from "../controllers/userController.js";
import { verifyPasswords } from "../middlewares/verifyPasswords.js";

const userRouter = Router();

//get
userRouter.get("/:id", getUser);

//getAll
userRouter.get("/", getAllUsers);

//signUp
userRouter.post("/signUp", [verifyPasswords], signUp);

//login
userRouter.post("/login", login);

export default userRouter;
