import { Router } from "express";
import {
  createProjecto,
  getProjectos,
  deleteProjecto,
} from "../controllers/projectoController.js";

const projectoRouter = Router();

//post
projectoRouter.post("/", createProjecto);

//get all
projectoRouter.get("/", getProjectos);

//delete
projectoRouter.delete("/:id", deleteProjecto);

export default projectoRouter;
