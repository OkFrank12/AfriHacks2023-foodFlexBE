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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadStream = void 0;
const cloudinary_1 = __importDefault(require("../Config/cloudinary"));
const streamifier_1 = require("streamifier");
const uploadStream = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let stream = yield cloudinary_1.default.uploader.upload_stream((err, result) => {
            if (result) {
                return resolve(result);
            }
            else {
                return reject(err);
            }
        });
        (0, streamifier_1.createReadStream)(req.file.buffer).pipe(stream);
    }));
});
exports.uploadStream = uploadStream;
