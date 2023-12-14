import { connect } from "mongoose";
import { envConfig } from "./environConfig";

export const DbConfig = () => {
  connect(envConfig.MONGODB).then(() => {
    console.log(`Server and Database is connected`);
  });
};
