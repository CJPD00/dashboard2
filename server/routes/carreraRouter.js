import { Router } from "express";
import {
  getAllCarreras,
  getCarrerasByIdDepartamento,
  postCarrera,
  updateCarrera,
  getCarreraById,
  deleteCarrera,
} from "../controllers/carreraController.js";

const carreraRouter = Router();

//get allCarreras
carreraRouter.get("/", getAllCarreras);

//getCarrerasByIdDepartamento
carreraRouter.get(
  "/byIdDepartamento/:id",
  getCarrerasByIdDepartamento
);

//postCarrera
carreraRouter.post("/", postCarrera);

//updateCarrera
carreraRouter.put("/:id", updateCarrera);

//getCarreraById
carreraRouter.get("/byId/:id", getCarreraById);

//deleteCarrera
carreraRouter.delete("/:id", deleteCarrera);

export default carreraRouter;
