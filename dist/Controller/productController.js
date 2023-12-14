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
exports.deleteProducts = exports.viewOneProducts = exports.viewAllProducts = exports.createProducts = void 0;
const productsModel_1 = __importDefault(require("../model/productsModel"));
const uploadStream_1 = require("../utils/uploadStream");
const createProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, inStock, cost, description } = req.body;
        const { public_id, secure_url } = yield (0, uploadStream_1.uploadStream)(req);
        const products = yield productsModel_1.default.create({
            title,
            inStock,
            cost,
            description,
            image: secure_url,
            imageID: public_id,
        });
        return res.status(201).json({
            message: "Created Products",
            data: products,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.createProducts = createProducts;
const viewAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productsModel_1.default.find();
        return res.status(200).json({
            message: "View All Products",
            data: products,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.viewAllProducts = viewAllProducts;
const viewOneProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productsID } = req.params;
        const products = yield productsModel_1.default.findById(productsID);
        return res.status(200).json({
            message: "View One Product",
            data: products,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.viewOneProducts = viewOneProducts;
const deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productsID } = req.params;
        const products = yield productsModel_1.default.findByIdAndDelete(productsID);
        return res.status(202).json({
            message: "Deleted Products",
            data: products,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteProducts = deleteProducts;
// export const payNow = async (req: Request, res: Response) => {
//   try {
//     const { userID } = req.params;
//     const { cost } = req.body;
//     const user: any = await authModel.findById(userID);
//     const params = JSON.stringify({
//       email: user?.email,
//       amount: parseInt(cost) * 100,
//       userID,
//     });
//     const options = {
//       hostname: "api.paystack.co",
//       port: 443,
//       path: "/transaction/initialize",
//       method: "POST",
//       headers: {
//         Authorization:
//           "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
//         "Content-Type": "application/json",
//       },
//     };
//     const ask = https
//       .request(options, (resp) => {
//         let data = "";
//         resp.on("data", (chunk) => {
//           data += chunk;
//         });
//         resp.on("end", () => {
//           console.log(JSON.parse(data));
//           res.status(200).json({
//             message: "Payment successful",
//             data: JSON.parse(data),
//           });
//         });
//       })
//       .on("error", (error) => {
//         console.error(error);
//       });
//     ask.write(params);
//     ask.end();
//   } catch (error: any) {
//     return res.status(500).json({
//       message: "error",
//       data: error.message,
//     });
//   }
// };
