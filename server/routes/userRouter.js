import { Router } from "express";
import {
  getAllUsers,
  getUser,
  login,
  signUp,
  uploadAvatar,
  getAvatar,
  updateUser,
  activateUser,
} from "../controllers/userController.js";
import { verifyPasswords } from "../middlewares/verifyPasswords.js";
import multipart from "connect-multiparty";
import { ensureAuth } from "../middlewares/authenticate.js";

const md_upload_avatar = multipart({ uploadDir: "./uploads/users" });
const userRouter = Router();

//get
userRouter.get("/:id", getUser);

//getAll
userRouter.get("/", getAllUsers);

//signUp
userRouter.post("/signUp", [verifyPasswords], signUp);

//login
userRouter.post("/login", login);

//upload avatar
userRouter.put(
  "/uploadAvatar/:id",
  [ensureAuth, md_upload_avatar],
  uploadAvatar
);

//get avatar
userRouter.get("/getAvatar/:avatarName", getAvatar);

//update user
userRouter.put("/updateUser/:id", [ensureAuth], updateUser);

//activate user
userRouter.put("/activateUser/:id", activateUser);

export default userRouter;
