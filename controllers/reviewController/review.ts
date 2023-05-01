import { Request, Response } from "express";
import logging from "../../config/logging";
import { HTTP_RESPONSE } from "../../helper/constants";
import { responseObj } from "../../helper/response";
import { IReview } from "../../interfaces/IReview";
import Review from "../../models/Review";

export const addReview = async (req: Request, res: Response) => {
  try {
    const {
      uid = "",
      name = "",
      comment = "",
      rate = -1,
      pid = "",
    }: IReview = req.body;

    if (pid == "" || uid == "" || name == "" || rate == -1)
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid data object",
        error: null,
        resObj: res,
        data: null,
      });

    const newReview: IReview = new Review(req.body);
    await newReview.save();

    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully added new Review",
      error: null,
      resObj: res,
      data: newReview,
    });
  } catch (error) {
    logging.error("Add Review", "unable to add Review", error);
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

const updateReview = async (req: Request, res: Response) => {
  try {
    const { _id = "" } = req.body;
    if (_id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Review ID",
        error: null,
        resObj: res,
        data: null,
      });

    await Review.updateOne(
      { _id },
      {
        ...req.body,
      }
    );
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully updated Review",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error("Update Review", "unable to update Review", error);
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

const deleteReview = async (req: Request, res: Response) => {
  try {
    const { _id = "" } = req.query;
    if (_id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Review ID",
        error: null,
        resObj: res,
        data: null,
      });

    await Review.deleteOne({ _id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully deleted Review",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error("Delete Review", "unable to delete Review", error);
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
export const getReviewes = async (req: Request, res: Response) => {
  try {
    const { pid = "" } = req.query;
    if (pid == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide valid product id",
        error: null,
        resObj: res,
        data: null,
      });
    const Reviewes = await Review.find({ pid });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Reviewes",
      error: null,
      resObj: res,
      data: Reviewes,
    });
  } catch (error) {
    logging.error("Get Reviewes", "unaable to get Reviewes", error);
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
export const getReview = async (req: Request, res: Response) => {
  try {
    const { _id = "" } = req.query;
    if (_id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide valid Review id",
        error: null,
        resObj: res,
        data: null,
      });
    const review = await Review.findOne({ _id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Review",
      error: null,
      resObj: res,
      data: review,
    });
  } catch (error) {
    logging.error("Get Review", "unaable to get Review", error);
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
