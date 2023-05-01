import { Request, Response } from "express";
import logging from "../../config/logging";
import { HTTP_RESPONSE } from "../../helper/constants";
import { responseObj } from "../../helper/response";
import { IAddress } from "../../interfaces/IAddress";
import Address from "../../models/Address";

export const addAddress = async (req: Request, res: Response) => {
  try {
    const {
      name = "",
      state = "",
      address = "",
      city = "",
      pinCode = "",
      phone = "",
      country = "",
      alernativePhone = "",
      landmark = "",
    }: IAddress = req.body;
  
    const uid = req.body.user.user_id;
    if (
      uid == "" ||
      name == "" ||
      pinCode == "" ||
      phone == "" ||
      country == "" ||
      address == "" ||
      city == "" ||
      state == ""
    )
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid data object",
        error: null,
        resObj: res,
        data: null,
      });

    const newAddress: IAddress = new Address({ uid, ...req.body });
    await newAddress.save();

    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully added new address",
      error: null,
      resObj: res,
      data: newAddress,
    });
  } catch (error) {
    logging.error("Add Address", "unable to add address", error);
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

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const { _id = "" } = req.body;
    if (_id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid address ID",
        error: null,
        resObj: res,
        data: null,
      });

    await Address.updateOne(
      { _id },
      {
        ...req.body,
      }
    );
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully updated address",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error("Update Address", "unable to update address", error);
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

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid address ID",
        error: null,
        resObj: res,
        data: null,
      });

    await Address.deleteOne({ _id: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully deleted address",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error("Delete Address", "unable to delete address", error);
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
export const getAddresses = async (req: Request, res: Response) => {
  try {
    const uid = req.body.user.user_id;
    if (uid == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide valid user id",
        error: null,
        resObj: res,
        data: null,
      });
    const addresses = await Address.find({ uid });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your addresses",
      error: null,
      resObj: res,
      data: addresses,
    });
  } catch (error) {
    logging.error("Get Addresses", "unaable to get addresses", error);
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
export const getAddress = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide valid address id",
        error: null,
        resObj: res,
        data: null,
      });
    const address = await Address.findOne({ _id: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your address",
      error: null,
      resObj: res,
      data: address,
    });
  } catch (error) {
    logging.error("Get Address", "unaable to get address", error);
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
