import { Document } from "mongoose";

type pDescpritionImage={
  sn:number,
  imageUrl:string
}

type pSize={
  sizeType:string
}

export interface IProduct extends Document {
  pName: string;
  pImage: string;
  pDescprition: string;
  pDescpritionImages:pDescpritionImage[];
  pVideo: string;
  price: number;
  pSize: pSize[];
  offerDiscount: number;
  pBrand: string;
  pModel: string;
  availableQty: number;
  isReturnable: boolean;
  expiryDate: string;
  idealFor: number;
  color: string;
  shade: string;
  pCategory: number;
  createdAt?:string
}
