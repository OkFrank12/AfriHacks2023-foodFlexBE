"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = require("../Controller/cartController");
const carts = (0, express_1.Router)();
carts.route("/:userID/:productsID/create-carts").post(cartController_1.createCart);
carts.route("/:userID/populate-cart").get(cartController_1.populateCart);
carts.route("/:cartID/delete-cart").delete(cartController_1.deleteCart);
exports.default = carts;
