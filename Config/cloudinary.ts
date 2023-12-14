import { v2 as cloudinary } from "cloudinary";
import { envConfig } from "./environConfig";

cloudinary.config({
  cloud_name: envConfig.CLOUD_NAME,
  api_key: envConfig.API_KEY,
  api_secret: envConfig.API_SECRET,
  secure: true,
});

export default cloudinary;
