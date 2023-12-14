"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const walletModel = new mongoose_1.Schema({
    amount: {
        type: Number,
    },
    email: {
        type: String,
    },
    userID: {
        type: String,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "food-flex-auths",
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("foodflex-wallet", walletModel);
