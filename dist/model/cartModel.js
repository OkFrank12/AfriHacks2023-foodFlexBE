"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartModel = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    inStock: {
        type: Number,
        required: true,
    },
    userID: {
        type: String,
    },
    cost: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("carts", cartModel);
