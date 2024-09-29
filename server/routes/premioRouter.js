import { Router } from "express";
import {
  getPremios,
  createPremio,
  updatePremio,
  deletePremio,
  getPremiosByIdProject,
  otorgarPremio,
  revocarPremio,
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

//byIdProject
premioRouter.get("/byIdProject/:id", getPremiosByIdProject);

//otorgarPremio
premioRouter.post("/otorgarPremio", otorgarPremio);

//revocarPremio
premioRouter.post("/revocarPremio", revocarPremio);

export default premioRouter;
