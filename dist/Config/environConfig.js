"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.envConfig = {
    PORT: process.env.PORT,
    MONGODB: process.env.MONGODB,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    GOOGLE_URL: process.env.GOOGLE_URL,
    GOOGLE_REFRESH: process.env.GOOGLE_REFRESH,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
};
