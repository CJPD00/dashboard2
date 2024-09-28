import { Router } from "express";
import {
  getTareas,
  getTareaById,
  createTarea,
} from "../controllers/tareaController.js";

const tareaRouter = Router();

//getAll
tareaRouter.get("/", getTareas);

//getById
tareaRouter.get("/byId:id", getTareaById);

//post
tareaRouter.post("/", createTarea);

export default tareaRouter;
