import {
  uploadProjectDoc,
  downloadProjectDoc,
  uploadEstatutoDoc,
  downloadEstatutoDoc,
  sendExtEstatuto,
  getPremioImage,
} from "../controllers/recursoController.js";
import express from "express";
import multipart from "connect-multiparty";

const md_upload_doc = multipart({ uploadDir: "./uploads/projects" });
const md_upload_estatuto = multipart({ uploadDir: "./uploads/estatutos" });
const docRouter = express.Router();

docRouter.put("/uploadProjectDoc/:id", [md_upload_doc], uploadProjectDoc);

docRouter.get("/downloadProjectDoc/:id", downloadProjectDoc);

docRouter.post("/uploadEstatutoDoc", [md_upload_estatuto], uploadEstatutoDoc);

docRouter.get("/downloadEstatutoDoc", downloadEstatutoDoc);

docRouter.get("/sendExtEstatuto", sendExtEstatuto);

docRouter.get("/getPremioImage/:id", getPremioImage);

export default docRouter;
