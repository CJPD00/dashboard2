import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// import User from "./models/user.js";
// import { fakeUserData } from "./data/dataUser.js";

//imports Routers
import userRouter from "./routes/userRouter.js";
import departamentoRouter from "./routes/departamentoRouter.js";
import carreraRouter from "./routes/carreraRouter.js";
import projectoRouter from "./routes/projectoRouter.js";
import personalRouter from "./routes/personalRouter.js";
import overallRouter from "./routes/overallRouter.js";
import eventoGRouter from "./routes/eventoGRouter.js";
import authRouter from "./routes/authRouter.js";
import publicacionRouter from "./routes/publicacionRouter.js";
import premioRouter from "./routes/premioRouter.js";
import tareaRouter from "./routes/tareaRouter.js";
import docRouter from "./routes/docRouter.js";
import tipoEventoRouter from "./routes/tipoEventoRouter.js";
import tipoPremioRouter from "./routes/tipoPremioRouter.js";

//config
import { init } from "./init.js";

// configuracion de la aplicacion
dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" })); // Establece el límite a 50 MB
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
  req.setTimeout(500000); // Aumenta el timeout a 500 segundos
  next();
});
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//Routers
app.use("/user", userRouter);
app.use("/departamento", departamentoRouter);
app.use("/carrera", carreraRouter);
app.use("/projecto", projectoRouter);
app.use("/personal", personalRouter);
app.use("/overall", overallRouter);
app.use("/eventog", eventoGRouter);
app.use("/auth", authRouter);
app.use("/publicacion", publicacionRouter);
app.use("/premio", premioRouter);
app.use("/tarea", tareaRouter);
app.use("/doc", docRouter);
app.use("/tipoEvento", tipoEventoRouter);
app.use("/tipoPremio", tipoPremioRouter);

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    const confirm = init();
    if (!confirm) {
      console.log("Error al iniciar la base de datos");
      process.exit(1);
      return;
    }
    app.listen(process.env.PORT, () => {
      console.log(`Backend server is running on port ${process.env.PORT}`);
    });
    console.log("MongoDB connected");

    // User.insertMany(fakeUserData)
    //   .then(() => {
    //     console.log("Data inserted");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  })
  .catch((err) => {
    console.log(err);
  });
