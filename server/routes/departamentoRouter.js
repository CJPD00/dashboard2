import { Router } from "express";
import {
  getDepartamentosWhitCarreras,
  postDepartamento,
  deleteDepartamento,
  updateDepartamento,
} from "../controllers/departamentoController.js";

const departamentoRouter = Router();

//getDepartamentosWhitCarreras
departamentoRouter.get("/", getDepartamentosWhitCarreras);

//postDepartamento
departamentoRouter.post("/", postDepartamento);

//deleteDepartamento
departamentoRouter.delete("/:nombre", deleteDepartamento);

//updateDepartamento
departamentoRouter.put("/:id", updateDepartamento);

export default departamentoRouter;
