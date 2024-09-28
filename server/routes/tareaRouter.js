import { Router } from "express";
import {
  getTareas,
  getTareaById,
  createTarea,
  updateTarea,
  deleteTarea,
} from "../controllers/tareaController.js";

const tareaRouter = Router();

//getAll
tareaRouter.get("/", getTareas);

//getById
tareaRouter.get("/byId/:id", getTareaById);

//post
tareaRouter.post("/", createTarea);

//update
tareaRouter.put("/:id", updateTarea);

//delete
tareaRouter.delete("/:id", deleteTarea);

export default tareaRouter;
