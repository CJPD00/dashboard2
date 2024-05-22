import { Router } from "express";
import {
  getDepartamentosWhitCarreras,
  postDepartamento,
} from "../controllers/departamentoController.js";

const departamentoRouter = Router();

//getDepartamentosWhitCarreras
departamentoRouter.get("/", getDepartamentosWhitCarreras);

//postDepartamento
departamentoRouter.post("/", postDepartamento);

export default departamentoRouter;
