"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const authModel = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    BVN: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    verified: {
        default: false,
        type: Boolean,
    },
    cart: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "carts",
        },
    ],
    loan: {
        type: Number,
        default: 0,
    },
    wallet: {
        type: Number,
        default: 0,
    },
    history: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "loan-history",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("food-flex-auths", authModel);
