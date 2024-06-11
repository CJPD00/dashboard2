//importar route de express
import express from "express";
import {
  addPersonal,
  getAllPersonal,
  getPersonalByProject,
  getGeography,
} from "../controllers/personalController.js";

const personalRouter = express.Router();

//getall
personalRouter.get("/", getAllPersonal);

//getGeografia
personalRouter.route("/geografia").get(getGeography);

//getbyproject
personalRouter.route("/:id").get(getPersonalByProject);

//addPersonal
personalRouter.post("/", addPersonal);

export default personalRouter;
