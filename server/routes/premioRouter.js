import { Router } from "express";
import {
  getPremios,
  createPremio,
  updatePremio,
  deletePremio,
} from "../controllers/premioController.js";

const premioRouter = Router();

//getAll
premioRouter.get("/", getPremios);

//post
premioRouter.post("/", createPremio);

//update
premioRouter.put("/:id", updatePremio);

//delete
premioRouter.delete("/:id", deletePremio);

export default premioRouter;
