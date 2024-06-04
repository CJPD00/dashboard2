import { Router } from "express";
import { createProjecto } from "../controllers/projectoController.js";

const projectoRouter = Router();

//post
projectoRouter.post("/", createProjecto);

export default projectoRouter;
