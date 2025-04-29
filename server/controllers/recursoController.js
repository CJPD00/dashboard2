import Projecto from "../models/projecto.js";
import Premio from "../models/premio.js";
import Estatuto from "../models/estatuto.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const uploadProjectDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const projecto = await Projecto.findById(id);
    if (!projecto) {
      return res.status(404).json({
        message: "Project not found",
        code: 404,
      });
    }

    if (projecto.recurso) {
      const filePath = `./uploads/projects/${projecto.recurso}`;

      fs.unlinkSync(filePath);
    }

    let filePath = req.files.recurso.path;

    let filesplit = filePath.split("/");

    let fileName = filesplit[filesplit.length - 1];

    let extSplit = fileName.split(".");

    let fileExt = extSplit[1];

    if (fileExt !== "docx" && fileExt !== "doc" && fileExt !== "pdf") {
      console.log("Extensión no válida");
      return res.status(400).send({ message: "Extensión no válida" });
    }

    projecto.recurso = fileName;
    //console.log(user);
    await projecto.save();

    res.status(200).json({
      message: "Recurso subido",
      code: 200,
      avatarName: projecto.avatar,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const downloadProjectDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const projecto = await Projecto.findById(id);

    if (!projecto) {
      return res.status(404).json({
        message: "Project not found",
        code: 404,
      });
    }

    if (!projecto.recurso) {
      return res.status(404).json({
        message: "Recurso no encontrado",
        code: 404,
      });
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(
      __dirname,
      `../uploads/projects/${projecto.recurso}`
    );

    // Verifica si el archivo existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File not found on server",
        code: 404,
      });
    }

    // Establece los encabezados para la descarga del archivo
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${projecto.recurso}"`
    );
    res.setHeader("Content-Type", "application/octet-stream"); // Tipo de contenido genérico para descargas
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    // Envía el archivo para su descarga
    return res.download(filePath, (err) => {
      if (err) {
        console.error("Error al descargar el archivo:", err); // Registra el error en la consola
        // No envíes una respuesta JSON después de que la descarga haya fallado
        return res.status(500).send("Error al descargar el archivo");
      }
    });
  } catch (error) {
    console.error("Error en la función downloadProjectDoc:", error); // Registra el error en la consola
    return res.status(500).json({
      message: "Error interno del servidor",
      code: 500,
    });
  }
};

export const uploadEstatutoDoc = async (req, res) => {

  let filePath = req.files.recurso.path;

  let filesplit = filePath.split("/");

  let fileName = filesplit[filesplit.length - 1];

  let extSplit = fileName.split(".");

  let fileExt = extSplit[1];

  if (fileExt !== "docx" && fileExt !== "doc" && fileExt !== "pdf") {
    console.log("Extensión no válida");
    return res.status(400).send({ message: "Extensión no válida" });
  } 

  //borrar todos los documentos de la coleccion

  try {
    await Estatuto.deleteMany({});
    const estatuto = new Estatuto({
      recurso: fileName,
    });

    await estatuto.save();

    res.status(200).json({
      message: "Recurso subido",
      code: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

export const downloadEstatutoDoc = async (req, res) => {
  try {
    const estatuto = await Estatuto.find();
    if (!estatuto) {
      return res.status(404).json({
        message: "Estatuto not found",
        code: 404,
      });
    }

    //console.log(estatuto);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(
      __dirname,
      `../uploads/estatutos/${estatuto[0].recurso}`
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File not found on server",
        code: 404,
      });
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${estatuto[0].recurso}"`
    );
    res.setHeader("Content-Type", "application/octet-stream"); // Tipo de contenido genérico para descargas
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    return res.download(filePath, (err) => {
      if (err) {
        console.error("Error al descargar el archivo:", err); // Registra el error en la consola
        // No envíes una respuesta JSON después de que la descarga haya fallado
        return res.status(500).send("Error al descargar el archivo");
      }
    });
  } catch (error) {
    console.error("Error en la función downloadProjectDoc:", error); // Registra el error en la consola
    return res.status(500).json({
      message: "Error interno del servidor",
      code: 500,
    });
  }
};

export const sendExtEstatuto = async (req, res) => {
  try {
    const estatuto = await Estatuto.find();

    if (!estatuto[0]) {
      return res.status(404).json({
        message: "Estatuto not found",
        code: 404,
      });
    }

    const ext = estatuto[0].recurso.split(".").pop();
    return res.json({ ext });
  } catch (error) {
    console.log(error);
  }
};

export const getPremioImage = async (req, res) => {
  try {
    const id = req.params.id;
    const premio = await Premio.findById(id);
    console.log(premio)
    const filePath = `./uploads/premios/${premio.recurso}`;

    fs.exists(filePath, (exists) => {
      if (exists) {
        res.sendFile(path.resolve(filePath));
      } else {
        res.status(404).send({ message: "La imagen no existe" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error interno del servidor" });
  }
};
