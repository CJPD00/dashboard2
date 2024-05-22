import { Router } from "express";
import {
  getAllCarreras,
  getCarrerasByIdDepartamento,
  postCarrera,
} from "../controllers/carreraController.js";

const carreraRouter = Router();

//get allCarreras
carreraRouter.get("/", getAllCarreras);

//getCarrerasByIdDepartamento
carreraRouter.get("/:idDepartamento", getCarrerasByIdDepartamento);

//postCarrera
carreraRouter.post("/", postCarrera);

export default carreraRouter;
