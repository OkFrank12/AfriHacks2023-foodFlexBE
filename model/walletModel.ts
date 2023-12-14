import { Schema, Types, model } from "mongoose";
import { iWalletData } from "../utils/interfaces";

const walletModel = new Schema<iWalletData>(
  {
    amount: {
      type: Number,
    },
    email: {
      type: String,
    },
    userID: {
      type: String,
    },
    user: {
      type: Types.ObjectId,
      ref: "food-flex-auths",
    },
  },
  { timestamps: true }
);

export default model<iWalletData>("foodflex-wallet", walletModel);
