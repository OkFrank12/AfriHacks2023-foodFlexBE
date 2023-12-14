"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environConfig_1 = require("./Config/environConfig");
const mainApp_1 = require("./mainApp");
const DB_1 = require("./Config/DB");
const port = parseInt(environConfig_1.envConfig.PORT);
const app = (0, express_1.default)();
(0, mainApp_1.appConfig)(app);
const server = app.listen(environConfig_1.envConfig.PORT || port, () => {
    (0, DB_1.DbConfig)();
});
process.on("uncaughtException", (error) => {
    console.log("uncaughtException: ", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("unhandledRejection: ", reason);
    server.close(() => {
        process.exit(1);
    });
});
