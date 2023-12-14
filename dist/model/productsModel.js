"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productsModel = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    inStock: {
        type: Number,
        required: true,
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
    imageID: {
        type: String,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("food-flex-products", productsModel);
