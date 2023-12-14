import { Schema, model } from "mongoose";
import { iProductsData } from "../utils/interfaces";

const productsModel = new Schema<iProductsData>(
  {
    title: {
      type: String,
      required: true,
    },
    inStock: {
      type: Number,
      required: true,
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
    imageID: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<iProductsData>("food-flex-products", productsModel);
