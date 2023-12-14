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
exports.deleteCart = exports.populateCart = exports.createCart = void 0;
const cartModel_1 = __importDefault(require("../model/cartModel"));
const authModel_1 = __importDefault(require("../model/authModel"));
const productsModel_1 = __importDefault(require("../model/productsModel"));
const mongoose_1 = require("mongoose");
const createCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, productsID } = req.params;
        const { title, inStock, cost, description, image } = req.body;
        const user = yield authModel_1.default.findById(userID);
        const product = yield productsModel_1.default.findById(productsID);
        const cart = yield cartModel_1.default.findOne({ title: title });
        if (cart) {
            return res.status(400).json({
                message: "Cart Already Exists",
            });
        }
        else {
            if (user && product) {
                const carts = yield cartModel_1.default.create({
                    title,
                    inStock,
                    cost,
                    description,
                    image,
                    userID,
                });
                user.cart.push(new mongoose_1.Types.ObjectId(carts === null || carts === void 0 ? void 0 : carts._id));
                user.save();
                return res.status(201).json({
                    message: "Created Cart",
                    data: carts,
                });
            }
            else {
                return res.status(400).json({
                    message: "Operation Fatal",
                });
            }
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.createCart = createCart;
const populateCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const cart = yield authModel_1.default.findById(userID).populate({
            path: "cart",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(200).json({
            message: "Populated Cart",
            data: cart === null || cart === void 0 ? void 0 : cart.cart,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.populateCart = populateCart;
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartID } = req.params;
        const carts = yield cartModel_1.default.findById(cartID);
        const user = yield authModel_1.default.findById(carts === null || carts === void 0 ? void 0 : carts.userID);
        if (user && carts) {
            yield cartModel_1.default.findByIdAndDelete(cartID);
            user.cart.pull(new mongoose_1.Types.ObjectId(cartID));
            user.save();
            return res.status(202).json({
                message: "Deleted Successfully",
            });
        }
        else {
            return res.status(400).json({
                message: "Can't be deleted",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteCart = deleteCart;
