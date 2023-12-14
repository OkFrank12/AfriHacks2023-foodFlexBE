import { Request, Response } from "express";
import cartModel from "../model/cartModel";
import authModel from "../model/authModel";
import productsModel from "../model/productsModel";
import { Types } from "mongoose";

export const createCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID, productsID } = req.params;
    const { title, inStock, cost, description, image } = req.body;
    const user = await authModel.findById(userID);
    const product = await productsModel.findById(productsID);
    const cart = await cartModel.findOne({ title: title });
    if (cart) {
      return res.status(400).json({
        message: "Cart Already Exists",
      });
    } else {
      if (user && product) {
        const carts = await cartModel.create({
          title,
          inStock,
          cost,
          description,
          image,
          userID,
        });

        user.cart.push(new Types.ObjectId(carts?._id));
        user.save();
        return res.status(201).json({
          message: "Created Cart",
          data: carts,
        });
      } else {
        return res.status(400).json({
          message: "Operation Fatal",
        });
      }
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const populateCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;
    const cart = await authModel.findById(userID).populate({
      path: "cart",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(200).json({
      message: "Populated Cart",
      data: cart?.cart,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { cartID } = req.params;
    const carts = await cartModel.findById(cartID);
    const user: any = await authModel.findById(carts?.userID);

    if (user && carts) {
      await cartModel.findByIdAndDelete(cartID);

      user.cart.pull(new Types.ObjectId(cartID));
      user.save();

      return res.status(202).json({
        message: "Deleted Successfully",
      });
    } else {
      return res.status(400).json({
        message: "Can't be deleted",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
