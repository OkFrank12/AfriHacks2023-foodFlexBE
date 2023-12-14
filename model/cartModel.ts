import { Schema, model } from "mongoose";
import { iCartData } from "../utils/interfaces";

const cartModel = new Schema<iCartData>(
  {
    title: {
      type: String,
      required: true,
    },
    inStock: {
      type: Number,
      required: true,
    },
    userID: {
      type: String,
    },
    cost: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<iCartData>("carts", cartModel);
