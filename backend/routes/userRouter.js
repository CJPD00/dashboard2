import { Router } from "express";
import { getUser } from "../controllers/userController.js";

const userRouter = Router();

//get
userRouter.get("/:id", getUser);

export default userRouter;
