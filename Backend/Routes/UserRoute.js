import express from "express";
import { adminLogin, login, signUp } from "../Controller/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/admin", adminLogin);

export default userRouter;
