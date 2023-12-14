"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../Controller/productController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("image");
const products = (0, express_1.Router)();
products.route("/create-products").post(upload, productController_1.createProducts);
products.route("/view-all-products").get(productController_1.viewAllProducts);
products.route("/:productsID/view-one-product").get(productController_1.viewOneProducts);
products.route("/:productsID/delete-product").delete(productController_1.deleteProducts);
exports.default = products;
