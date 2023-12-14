import { Router } from "express";
import {
  deleteUser,
  registerUser,
  signInUser,
  verifyUser,
  viewAllUser,
  viewOneUser,
} from "../Controller/authController";

const auth: Router = Router();

auth.route("/register").post(registerUser);
auth.route("/sign-in").post(signInUser);
auth.route("/:token/verify").patch(verifyUser);
auth.route("/:userID/view-one-user").get(viewOneUser);
auth.route("/view-all-users").get(viewAllUser);
auth.route("/:userID/delete").delete(deleteUser);
export default auth;
