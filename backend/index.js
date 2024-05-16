import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import User from "./models/user.js";
import { fakeUserData } from "./data/dataUser.js";

//imports Routers
import userRouter from "./routes/userRouter.js";
import generalRouter from "./routes/generalRouter.js";
import managementRouter from "./routes/managementRouter.js";
import salesRouter from "./routes/salesRouter.js";

// configuracion de la aplicacion
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//Routers
app.use("/user", userRouter);
app.use("/general", generalRouter);
app.use("/management", managementRouter);
app.use("/sales", salesRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
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
