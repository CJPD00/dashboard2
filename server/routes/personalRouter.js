//importar route de express
import express from "express";
import {
  addPersonal,
  getAllPersonal,
  getPersonalByProject,
  getGeography,
  deletePersonal,
  getPersonalById,
  updatePersonal,
} from "../controllers/personalController.js";

const personalRouter = express.Router();

//getall
personalRouter.get("/", getAllPersonal);

//getGeografia
personalRouter.route("/geografia").get(getGeography);

//getbyproject
personalRouter.route("/byProject/:id").get(getPersonalByProject);

//getById
personalRouter.get("/byId/:id", getPersonalById);

//addPersonal
personalRouter.post("/", addPersonal);

//deletePersonal
personalRouter.delete("/:id", deletePersonal);

//updatePersonal
personalRouter.put("/:id", updatePersonal);

export default personalRouter;
