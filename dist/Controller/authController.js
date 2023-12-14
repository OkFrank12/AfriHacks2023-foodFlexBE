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
exports.deleteUser = exports.viewAllUser = exports.viewOneUser = exports.signInUser = exports.verifyUser = exports.registerUser = void 0;
const bcrypt_1 = require("bcrypt");
const authModel_1 = __importDefault(require("../model/authModel"));
const email_1 = require("../utils/email");
const jsonwebtoken_1 = require("jsonwebtoken");
const environConfig_1 = require("../Config/environConfig");
const crypto_1 = __importDefault(require("crypto"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password, phoneNo, BVN } = req.body;
        const salted = yield (0, bcrypt_1.genSalt)(10);
        const hashed = yield (0, bcrypt_1.hash)(password, salted);
        const token = crypto_1.default.randomUUID();
        const NGN = "+234";
        const user = yield authModel_1.default.create({
            userName,
            email,
            password: hashed,
            phoneNo: NGN.concat(phoneNo),
            BVN,
            token,
        });
        (0, email_1.sendMail)(user).then(() => {
            console.log("Mail sent to registered user...!");
        });
        return res.status(201).json({
            message: "Successfully Registered",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.registerUser = registerUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const getUserID = (0, jsonwebtoken_1.verify)(token, environConfig_1.envConfig.TOKEN_SECRET, (err, payload) => {
            if (err) {
                throw new Error();
            }
            else {
                return payload;
            }
        });
        yield authModel_1.default.findByIdAndUpdate(getUserID.id, {
            token: "",
            verified: true,
        }, { new: true });
        return res.status(200).json({
            message: "User has been verified",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.verifyUser = verifyUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield authModel_1.default.findOne({ email });
        if (user) {
            const validPassword = yield (0, bcrypt_1.compare)(password, user.password);
            if (validPassword) {
                if (user.verified && user.token === "") {
                    const token = (0, jsonwebtoken_1.sign)({ id: user._id }, environConfig_1.envConfig.TOKEN_SECRET);
                    return res.status(201).json({
                        message: `Welcome Back ${user.userName}`,
                        data: token,
                    });
                }
                else {
                    return res.status(400).json({
                        message: "You is not yet verified",
                    });
                }
            }
            else {
                return res.status(400).json({
                    message: "Password is invalid",
                });
            }
        }
        else {
            return res.status(400).json({
                message: "This user is not in our record",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.signInUser = signInUser;
const viewOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield authModel_1.default.findById(userID);
        return res.status(200).json({
            message: "User found",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.viewOneUser = viewOneUser;
const viewAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authModel_1.default.find();
        return res.status(200).json({
            message: "All Users found",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.viewAllUser = viewAllUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        yield authModel_1.default.findByIdAndDelete(userID);
        return res.status(202).json({
            message: "Successfully Deleted Users",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteUser = deleteUser;
