import { Request, Response } from "express";
import logging from "../../config/logging";
import { HTTP_RESPONSE } from "../../helper/constants";
import { responseObj } from "../../helper/response";
import { IProduct } from "../../interfaces/IProducts";
import Product from "../../models/Product";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      pName = "",
      pImage = "",
      pDescprition = "",
      pVideo = "",
      price = 0,
      pSize = [],
      offerDiscount = 0,
      pBrand = "",
      pModel = "",
      availableQty = 0,
      isReturnable = false,
      expiryDate,
      idealFor = -1,
      color = "",
      shade = "",
      pCategory = -1,
      pDescpritionImages
    }: IProduct = req.body;

    if (
      pName == "" ||
      pImage == "" ||
      pBrand == "" ||
      pSize.length == 0 ||
      pDescprition == "" ||
      pVideo == "" ||
      price == 0 ||
      availableQty == 0 ||
      idealFor == -1 ||
      pCategory == -1
    ) {
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid data object",
        error: null,
        resObj: res,
        data: null,
      });
    }

    const date = new Date(expiryDate);
    console.log("date is -- ",expiryDate,date);

    const newProduct: IProduct = new Product({
      pName,
      pImage,
      pDescprition,
      pVideo,
      price,
      pSize,
      offerDiscount,
      pBrand,
      pModel,
      availableQty,
      isReturnable,
      expiryDate:date,
      idealFor,
      color,
      shade,
      pCategory,
      pDescpritionImages
    });
    await newProduct.save();

    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully posted new product",
      error: null,
      resObj: res,
      data: newProduct,
    });
  } catch (error) {
    logging.error("Add Product", "unaable to add product", error);
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { _id = "" } = req.body;
    if (_id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid product ID",
        error: null,
        resObj: res,
        data: null,
      });

    await Product.updateOne(
      { _id },
      {
        ...req.body,
      }
    );
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully updated product",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error("Update Product", "unaable to update product", error);
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your products",
      error: null,
      resObj: res,
      data: products,
    });
  } catch (error) {
    logging.error("Get Products", "unaable to get products", error);
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid product ID",
        error: null,
        resObj: res,
        data: null,
      });
    const product = await Product.findOne({ _id:id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your product",
      error: null,
      resObj: res,
      data: product,
    });
  } catch (error) {
    logging.error("Get Product", "unaable to get product", error);
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid product ID",
        error: null,
        resObj: res,
        data: null,
      });
    await Product.deleteOne({ _id:id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your product is successfully deleted",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error("Delete Product", "unable to delete product", error);
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};
