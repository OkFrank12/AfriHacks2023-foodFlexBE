import { compare, genSalt, hash } from "bcrypt";
import { Request, Response } from "express";
import authModel from "../model/authModel";
import { sendMail } from "../utils/email";
import { sign, verify } from "jsonwebtoken";
import { envConfig } from "../Config/environConfig";
import crypto from "crypto";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userName, email, password, phoneNo, BVN } = req.body;
    const salted = await genSalt(10);
    const hashed = await hash(password, salted);
    const token = crypto.randomUUID();
    const NGN = "+234";
    const user = await authModel.create({
      userName,
      email,
      password: hashed,
      phoneNo: NGN.concat(phoneNo),
      BVN,
      token,
    });

    sendMail(user).then(() => {
      console.log("Mail sent to registered user...!");
    });

    return res.status(201).json({
      message: "Successfully Registered",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { token } = req.params;
    const getUserID: any = verify(
      token,
      envConfig.TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          throw new Error();
        } else {
          return payload;
        }
      }
    );

    await authModel.findByIdAndUpdate(
      getUserID.id,
      {
        token: "",
        verified: true,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "User has been verified",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const signInUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await authModel.findOne({ email });

    if (user) {
      const validPassword = await compare(password, user.password);
      if (validPassword) {
        if (user.verified && user.token === "") {
          const token = sign({ id: user._id }, envConfig.TOKEN_SECRET);
          return res.status(201).json({
            message: `Welcome Back ${user.userName}`,
            data: token,
          });
        } else {
          return res.status(400).json({
            message: "You is not yet verified",
          });
        }
      } else {
        return res.status(400).json({
          message: "Password is invalid",
        });
      }
    } else {
      return res.status(400).json({
        message: "This user is not in our record",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const viewOneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;

    const user = await authModel.findById(userID);

    return res.status(200).json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const viewAllUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await authModel.find();

    return res.status(200).json({
      message: "All Users found",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;

    await authModel.findByIdAndDelete(userID);

    return res.status(202).json({
      message: "Successfully Deleted Users",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
