import { Document } from "mongoose";

interface iAuth {
  userName: string;
  email: string;
  password: string;
  phoneNo: string;
  BVN: string;
  token: string;
  verified: boolean;
  cart: {}[];
  loan: number;
  wallet: number;
  history: Array<{}>;
}

interface iProducts {
  title: string;
  inStock: number;
  cost: number;
  description: string;
  image: string;
  imageID: string;
}

interface iCart {
  title: string;
  inStock: number;
  cost: number;
  description: string;
  image: string;
  userID: string;
}

interface iWallet {
  amount: number;
  email: string;
  userID: string;
  user: {};
}

export interface iWalletData extends iWallet, Document {}
export interface iAuthData extends iAuth, Document {}
export interface iCartData extends iCart, Document {}
export interface iAuthData extends iAuth, Document {}
export interface iProductsData extends iProducts, Document {}
export interface iWalletData extends iWallet, Document {}
