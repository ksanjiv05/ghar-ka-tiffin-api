import { Request, Response } from "express";
import logging from "../../config/logging";
import { HTTP_RESPONSE } from "../../helper/constants";
import { responseObj } from "../../helper/response";

import Subscribe from "../../models/Subscribe";
import { ISubscribe } from "../../interfaces/ISubscribe";

export const addSubscribe = async (req: Request, res: Response) => {
  try {
    const {
        subscriptionId="",
        startDate="",
        activeDuration=-1
    }: ISubscribe = req.body;

    if (subscriptionId == ""||startDate==""||activeDuration==-1) {
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide valid subscribe details",
        error: null,
        resObj: res,
        data: null,
      });
    }

    req.body.userId = req.body.user.uid;

    const newSubscribe: ISubscribe = new Subscribe(req.body);
    await newSubscribe.save();

    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully posted new Subscribe",
      error: null,
      resObj: res,
      data: newSubscribe,
    });
  } catch (error: any) {
    logging.error("Add Subscribe", "unable to add Subscribe", error);

    if (error?.message) {
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: error.message.includes("E11000 duplicate key")
          ? "duplicate Subscribe"
          : error.message,
        error: null,
        resObj: res,
        data: null,
      });
    }

    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: error?.message || "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};

export const updateSubscribe = async (req: Request, res: Response) => {
  try {
    const { _id = "" } = req.body;
    if (_id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Subscribe ID",
        error: null,
        resObj: res,
        data: null,
      });

    await Subscribe.updateOne(
      { _id },
      {
        ...req.body,
      }
    );
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully updated Subscribe",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error(
      "Update Subscribe",
      "unaable to update Subscribe",
      error
    );
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

export const getSubscribes = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.uid;
    const Subscribes = await Subscribe.find({userId});
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Subscribes",
      error: null,
      resObj: res,
      data: Subscribes,
    });
  } catch (error) {
    logging.error("Get Subscribes", "unable to get Subscribes", error);
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

export const getSubscribe = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Subscribe ID",
        error: null,
        resObj: res,
        data: null,
      });
    const subscribe = await Subscribe.findOne({ _id: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Subscribe",
      error: null,
      resObj: res,
      data: subscribe,
    });
  } catch (error) {
    logging.error("Get Subscribe", "unable to get Subscribe", error);
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

export const deleteSubscribe = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Subscribe ID",
        error: null,
        resObj: res,
        data: null,
      });
    await Subscribe.deleteOne({ _id: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Subscribe is successfully deleted",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error(
      "Delete Subscribe",
      "unable to delete Subscribe",
      error
    );
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

// export const subscribeOrderDelivered=async(req: Request, res: Response)=>{
//     //subscription id userid
//     //need to pdtae subscription order status
//     const {subscriptionId,userId,isDelivered,isPaid,amount,transactionId}= req.body;

//     const 


// }

