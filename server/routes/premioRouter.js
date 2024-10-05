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
import multipart from "connect-multiparty";

const premioRouter = Router();
const md_upload_premio = multipart({ uploadDir: "./uploads/premios" });

//getAll
premioRouter.get("/", getPremios);

//post
premioRouter.post("/", [md_upload_premio], createPremio);

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
