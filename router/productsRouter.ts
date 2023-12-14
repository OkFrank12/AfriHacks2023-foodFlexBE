import { Router } from "express";
import {
  createProducts,
  deleteProducts,
  viewAllProducts,
  viewOneProducts,
} from "../Controller/productController";
import multer from "multer";

const upload = multer().single("image");
const products: Router = Router();

products.route("/create-products").post(upload, createProducts);
products.route("/view-all-products").get(viewAllProducts);
products.route("/:productsID/view-one-product").get(viewOneProducts);
products.route("/:productsID/delete-product").delete(deleteProducts);

export default products;
