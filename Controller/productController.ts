import { Request, Response } from "express";
import productsModel from "../model/productsModel";
import { uploadStream } from "../utils/uploadStream";

export const createProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title, inStock, cost, description } = req.body;
    const { public_id, secure_url }: any = await uploadStream(req);
    const products = await productsModel.create({
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
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const viewAllProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const products = await productsModel.find();

    return res.status(200).json({
      message: "View All Products",
      data: products,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const viewOneProducts = async (req: Request, res: Response) => {
  try {
    const { productsID } = req.params;

    const products = await productsModel.findById(productsID);

    return res.status(200).json({
      message: "View One Product",
      data: products,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { productsID } = req.params;

    const products = await productsModel.findByIdAndDelete(productsID);

    return res.status(202).json({
      message: "Deleted Products",
      data: products,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

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
