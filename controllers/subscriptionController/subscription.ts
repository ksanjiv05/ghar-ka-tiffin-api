import { Request, Response } from "express";
import logging from "../../config/logging";
import { HTTP_RESPONSE } from "../../helper/constants";
import { responseObj } from "../../helper/response";

import Subscription from "../../models/Subscription";
import { ISubscription } from "../../interfaces/ISubcription";
import { SUBSCRIPTION_TYPE } from "../../config/enums";

export const addSubscription = async (req: Request, res: Response) => {
  try {
    const {
      title = "",
      type = SUBSCRIPTION_TYPE.BASIC,
      duration = -1,
      banner = "",
      discount = 0,
      price = -1,
    }: ISubscription = req.body;

    if (title == ""||duration==-1||banner == ""||price==-1) {
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide title,price, duration and banner image",
        error: null,
        resObj: res,
        data: null,
      });
    }
   

    const newSubscription: ISubscription = new Subscription(req.body);
    await newSubscription.save();

    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully posted new Subscription",
      error: null,
      resObj: res,
      data: newSubscription,
    });
  } catch (error: any) {
    logging.error("Add Subscription", "unable to add Subscription", error);

    if (error?.message) {
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: error.message.includes("E11000 duplicate key")
          ? "duplicate Subscription"
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

export const updateSubscription = async (req: Request, res: Response) => {
  try {
    const { _id = "" } = req.body;
    if (_id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Subscription ID",
        error: null,
        resObj: res,
        data: null,
      });

    await Subscription.updateOne(
      { _id },
      {
        ...req.body,
      }
    );
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully updated Subscription",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error(
      "Update Subscription",
      "unaable to update Subscription",
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

export const getSubscriptions = async (req: Request, res: Response) => {
  try {
    const Subscriptions = await Subscription.find();
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Subscriptions",
      error: null,
      resObj: res,
      data: Subscriptions,
    });
  } catch (error) {
    logging.error("Get Subscriptions", "unable to get Subscriptions", error);
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

export const getSubscription = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Subscription ID",
        error: null,
        resObj: res,
        data: null,
      });
    const subscription = await Subscription.findOne({ _id: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Subscription",
      error: null,
      resObj: res,
      data: subscription,
    });
  } catch (error) {
    logging.error("Get Subscription", "unable to get Subscription", error);
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

export const deleteSubscription = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Subscription ID",
        error: null,
        resObj: res,
        data: null,
      });
    await Subscription.deleteOne({ _id: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Subscription is successfully deleted",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error(
      "Delete Subscription",
      "unable to delete Subscription",
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
