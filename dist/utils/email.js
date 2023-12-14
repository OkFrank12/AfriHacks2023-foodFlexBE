"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = require("nodemailer");
const googleapis_1 = require("googleapis");
const path_1 = require("path");
const ejs_1 = require("ejs");
const environConfig_1 = require("../Config/environConfig");
const jsonwebtoken_1 = require("jsonwebtoken");
const oAuth = new googleapis_1.google.auth.OAuth2(environConfig_1.envConfig.GOOGLE_ID, environConfig_1.envConfig.GOOGLE_SECRET, environConfig_1.envConfig.GOOGLE_URL);
oAuth.setCredentials({ access_token: environConfig_1.envConfig.GOOGLE_REFRESH });
const sendMail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (yield oAuth.getAccessToken()).token;
        const transport = (0, nodemailer_1.createTransport)({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "elizabethokorie407@gmail.com",
                clientId: environConfig_1.envConfig.GOOGLE_ID,
                clientSecret: environConfig_1.envConfig.GOOGLE_SECRET,
                refreshToken: environConfig_1.envConfig.GOOGLE_REFRESH,
                accessToken,
            },
        });
        const token = (0, jsonwebtoken_1.sign)({ id: user === null || user === void 0 ? void 0 : user._id }, environConfig_1.envConfig.TOKEN_SECRET);
        const passedData = {
            userName: user === null || user === void 0 ? void 0 : user.userName,
            email: user === null || user === void 0 ? void 0 : user.email,
            url: `http://localhost:5173/${token}/verify`,
        };
        const locateEjsFile = (0, path_1.join)(__dirname, "../views/verificationMail.ejs");
        const ejsData = yield (0, ejs_1.renderFile)(locateEjsFile, passedData);
        const mailer = {
            from: "Food Flex <elizabethokorie407@gmail.com>",
            to: user === null || user === void 0 ? void 0 : user.email,
            subject: `Verification Mail`,
            html: ejsData,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.error(error);
    }
});
exports.sendMail = sendMail;
