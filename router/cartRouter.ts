import { Router } from "express";
import {
  createCart,
  deleteCart,
  populateCart,
} from "../Controller/cartController";

const carts: Router = Router();

carts.route("/:userID/:productsID/create-carts").post(createCart);
carts.route("/:userID/populate-cart").get(populateCart);
carts.route("/:cartID/delete-cart").delete(deleteCart);

export default carts;
