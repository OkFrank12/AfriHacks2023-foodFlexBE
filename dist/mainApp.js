"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const authRouter_1 = __importDefault(require("./router/authRouter"));
const productsRouter_1 = __importDefault(require("./router/productsRouter"));
const cartRouter_1 = __importDefault(require("./router/cartRouter"));
const walletRouter_1 = __importDefault(require("./router/walletRouter"));
const appConfig = (app) => {
    app.use((0, express_1.json)()).use((0, cors_1.default)()).use((0, helmet_1.default)()).use((0, morgan_1.default)("dev"));
    app.set("view engine", "ejs");
    app.use("/api", authRouter_1.default, productsRouter_1.default, cartRouter_1.default, walletRouter_1.default);
    app.get("/", (req, res) => {
        try {
            return res.status(200).json({
                message: "Food Flex APIs 🍑🍍🍇",
            });
        }
        catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    });
};
exports.appConfig = appConfig;
