"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const environConfig_1 = require("./environConfig");
cloudinary_1.v2.config({
    cloud_name: environConfig_1.envConfig.CLOUD_NAME,
    api_key: environConfig_1.envConfig.API_KEY,
    api_secret: environConfig_1.envConfig.API_SECRET,
    secure: true,
});
exports.default = cloudinary_1.v2;
