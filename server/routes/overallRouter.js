import { Router } from "express";
import {
  getProjectsByType,
  getTotal,
  getTotalRecent,
} from "../controllers/overallController.js";

const overallRouter = Router();

overallRouter.get("/projectsByType", getProjectsByType);
overallRouter.get("/total", getTotal);
overallRouter.get("/totalRecent", getTotalRecent);

export default overallRouter;
