import { Router } from "express";
import {
  getTiposEventos,
  postTipoEvento,
  deleteTipoEvento,
} from "../controllers/tipoEventoController.js";

const tipoEventoRouter = Router();

tipoEventoRouter.get("/", getTiposEventos);
tipoEventoRouter.post("/", postTipoEvento);
tipoEventoRouter.delete("/:id", deleteTipoEvento);

export default tipoEventoRouter;
