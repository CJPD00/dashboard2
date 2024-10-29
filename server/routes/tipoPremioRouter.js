import { Router } from "express";
import {
  getTiposPremios,
  deleteTipoPremio,
  postTipoPremio,
} from "../controllers/tipoPremioController.js";

const tipoPremioRouter = Router();

tipoPremioRouter.get("/", getTiposPremios);
tipoPremioRouter.post("/", postTipoPremio);
tipoPremioRouter.delete("/:id", deleteTipoPremio);

export default tipoPremioRouter;
