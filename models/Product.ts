import mongoose, { Schema } from "mongoose";
import logging from "../config/logging";
import { IProduct } from "../interfaces/IProducts";

const ProductSchema: Schema = new Schema({
  pName: {
    type: String,
    required: true,
  },
  pImage: {
    type: String,
    required: true,
  },
  pDescprition: {
    type: String,
    required: true,
  },
  pDescpritionImages: [
    {
      sn: Number,
      imageUrl: String,
    },
  ],
  pVideo: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  pSize: [
    {
      sizeType: String,
    },
  ],
  offerDiscount: {
    type: Number,
  },
  pBrand: {
    type: String,
    required: true,
  },
  pModel: {
    type: String,
  },
  availableQty: {
    type: Number,
    required: true,
  },
  isReturnable: {
    type: Boolean,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  idealFor: {
    type: Number, //1-men 0-women
    required: true,
  },
  color: {
    type: String,
  },
  shade: {
    type: String,
  },
  pCategory: {
    type: Number, //1-beauty, 2-mens-beauity
    required: true,
  },
});

const salt = 10;

ProductSchema.pre<IProduct>("save", async function (next) {
  // const Product = this;
  // if (Product.isModified("password")) {
  //   Product.password = await bcryptjs.hash(Product.password, salt);
  // }
  next();
});

ProductSchema.post<IProduct>("save", function () {
  logging.info("Mongo", "New product just added ");
});

export default mongoose.model<IProduct>("Product", ProductSchema);
