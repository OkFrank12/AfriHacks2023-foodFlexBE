"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../Controller/authController");
const auth = (0, express_1.Router)();
auth.route("/register").post(authController_1.registerUser);
auth.route("/sign-in").post(authController_1.signInUser);
auth.route("/:token/verify").patch(authController_1.verifyUser);
auth.route("/:userID/view-one-user").get(authController_1.viewOneUser);
auth.route("/view-all-users").get(authController_1.viewAllUser);
auth.route("/:userID/delete").delete(authController_1.deleteUser);
exports.default = auth;
