import { Router } from "express";
import { getProjectsByType } from "../controllers/overallController.js";

const overallRouter = Router();

overallRouter.get("/projectsByType", getProjectsByType);

export default overallRouter;
