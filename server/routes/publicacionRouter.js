import express from "express";
import {
  getPublicaciones,
  createPublicaciones,
  getPublicacionById,
  updatePublicaciones,
  deletePublicaciones,
} from "../controllers/publicacionController.js";

const publicacionRouter = express.Router();

//getAll
publicacionRouter.get("/", getPublicaciones);

//getById
publicacionRouter.get("/byId/:id", getPublicacionById);

//post
publicacionRouter.post("/", createPublicaciones);

//update
publicacionRouter.put("/:id", updatePublicaciones);

//delete
publicacionRouter.delete("/:id", deletePublicaciones);

export default publicacionRouter;
