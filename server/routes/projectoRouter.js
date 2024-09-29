import { Router } from "express";
import {
  createProjecto,
  getProjectos,
  deleteProjecto,
  getProjectById,
  updateProjecto,
} from "../controllers/projectoController.js";

const projectoRouter = Router();

//post
projectoRouter.post("/", createProjecto);

//get all
projectoRouter.get("/", getProjectos);

//getById
projectoRouter.get("/byId/:id", getProjectById);

//delete
projectoRouter.delete("/:id", deleteProjecto);

//update
projectoRouter.put("/:id", updateProjecto);

export default projectoRouter;
