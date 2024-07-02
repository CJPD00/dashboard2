import { Router } from "express";
import refreshToken from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/refresh", refreshToken);

export default authRouter;
