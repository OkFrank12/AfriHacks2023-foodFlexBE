import { Router } from "express";
import {
  checkBIN,
  checkoutWithPayStack,
  payLoan,
  requestLoan,
} from "../Controller/walletController";

const wallet: Router = Router();

wallet.route("/:userID/request-loan").post(requestLoan);
wallet.route("/:userID/pay-loan").post(payLoan);
wallet.route("/:userID/check-out").post(checkoutWithPayStack);
wallet.route("/check-BIN").post(checkBIN);

export default wallet;
