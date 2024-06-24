import { Router } from "express";
import { getEventos, createEventos } from "../controllers/eventoGController.js";

const eventoGRouter = Router();

//get
eventoGRouter.get("/", getEventos);

//post
eventoGRouter.post("/", createEventos);

export default eventoGRouter;