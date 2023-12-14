"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandling = void 0;
const mainError_1 = require("./mainError");
const preparedError = (err, res) => {
    res.status(mainError_1.HTTP.BAD).json({
        message: err.message,
        name: err.name,
        status: err.status,
        success: err.success,
        stack: err.stack,
        error: err
    });
};
const errorHandling = (err, req, res, next) => {
    preparedError(err, res);
};
exports.errorHandling = errorHandling;
