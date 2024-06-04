import { Router } from "express";
import {
  createProjecto,
  getProjectos,
} from "../controllers/projectoController.js";

const projectoRouter = Router();

//post
projectoRouter.post("/", createProjecto);

//get all
projectoRouter.get("/", getProjectos);

export default projectoRouter;
