import { Router } from "express";
import {
  getEventos,
  createEventos,
  getEventoById,
  updateEventos,
  deleteEventos,
} from "../controllers/eventoGController.js";

const eventoGRouter = Router();

//get
eventoGRouter.get("/", getEventos);

//post
eventoGRouter.post("/", createEventos);

//get by id
eventoGRouter.get("/byId/:id", getEventoById);

//update
eventoGRouter.put("/:id", updateEventos);

//delete
eventoGRouter.delete("/:id", deleteEventos);

export default eventoGRouter;
