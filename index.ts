import express, { Application } from "express";
import { envConfig } from "./Config/environConfig";
import { appConfig } from "./mainApp";
import { DbConfig } from "./Config/DB";

const port: number = parseInt(envConfig.PORT);
const app: Application = express();

appConfig(app);

const server = app.listen(envConfig.PORT || port, () => {
  DbConfig();
});

process.on("uncaughtException", (error: any) => {
  console.log("uncaughtException: ", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection: ", reason);
  server.close(() => {
    process.exit(1);
  });
});
