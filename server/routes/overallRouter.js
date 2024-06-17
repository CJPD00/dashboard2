import { Router } from "express";
import {
  getProjectsByType,
  getTotal,
} from "../controllers/overallController.js";

const overallRouter = Router();

overallRouter.get("/projectsByType", getProjectsByType);
overallRouter.get("/total", getTotal);

export default overallRouter;
