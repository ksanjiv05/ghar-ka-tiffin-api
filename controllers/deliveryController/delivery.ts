import { Request, Response } from "express";
import logging from "../../config/logging";
import { HTTP_RESPONSE } from "../../helper/constants";
import { responseObj } from "../../helper/response";

import Delivery from "../../models/Delivery";
import { IDelivery } from "../../interfaces/IDelivery";
import { SHIFT } from "../../config/enums";

interface ExtraDeliveryProps extends IDelivery {
  shift: SHIFT;
  isPaid: boolean;
  isDelivered: boolean;
  amount: number;
  transactionId: string;
}

export const addDelivery = async (req: Request, res: Response) => {
  try {
    const {
      subscriptionId = "",
      userId = "",
      shift = SHIFT.MORNING,
      isPaid = false,
      isDelivered = false,
      amount = 0,
      transactionId = "",
    }: ExtraDeliveryProps = req.body;

    const date = new Date().getTime();

    if (subscriptionId == "" || userId == "") {
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide valid Delivery details",
        error: null,
        resObj: res,
        data: null,
      });
    }
    if (shift == SHIFT.MORNING) {
      await Delivery.updateOne(
        { subscriptionId, userId, date },
        {
          subscriptionId,
          userId,
          date,
          morning: {
            isDelivered,
            isPaid,
            amount,
            transactionId,
          },
        },
        {
          upsert: true,
        }
      );
    }
    if (shift == SHIFT.AFTERNOON) {
      await Delivery.updateOne(
        { subscriptionId, userId, date },
        {
          subscriptionId,
          userId,
          date,
          afternoon: {
            isDelivered,
            isPaid,
            amount,
            transactionId,
          },
        },
        {
          upsert: true,
        }
      );
    }
    if (shift == SHIFT.NIGHT) {
      await Delivery.updateOne(
        { subscriptionId, userId, date },
        {
          subscriptionId,
          userId,
          date,
          night: {
            isDelivered,
            isPaid,
            amount,
            transactionId,
          },
        },
        {
          upsert: true,
        }
      );
    }

    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully posted new Delivery",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error: any) {
    logging.error("Add Delivery", "unable to add Delivery", error);

    if (error?.message) {
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: error.message.includes("E11000 duplicate key")
          ? "duplicate Delivery"
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

// export const updateDelivery = async (req: Request, res: Response) => {
//   try {
//     const {
//       _id = "",
//       subscriptionId = "",
//       userId = "",
//       shift = SHIFT.MORNING,
//       isPaid = false,
//       isDelivered = false,
//       amount = 0,
//       transactionId = "",
//     }: ExtraDeliveryProps = req.body;
//     // const { _id = "" } = req.body;
//     if (_id == "")
//       return responseObj({
//         statusCode: HTTP_RESPONSE.BED_REQUEST,
//         type: "error",
//         msg: "please provide a valid Delivery ID",
//         error: null,
//         resObj: res,
//         data: null,
//       });

//     await Delivery.updateOne(
//       { _id },
//       {
//         ...req.body,
//       }
//     );
//     return responseObj({
//       statusCode: HTTP_RESPONSE.SUCCESS,
//       type: "success",
//       msg: "hey, you are successfully updated Delivery",
//       error: null,
//       resObj: res,
//       data: null,
//     });
//   } catch (error) {
//     logging.error("Update Delivery", "unaable to update Delivery", error);
//     return responseObj({
//       statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
//       type: "error",
//       msg: "unable to process your request",
//       error: null,
//       resObj: res,
//       data: null,
//     });
//   }
// };

export const getDeliverys = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.uid;
    const deliverys = await Delivery.find({ userId });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Deliverys",
      error: null,
      resObj: res,
      data: deliverys,
    });
  } catch (error) {
    logging.error("Get Deliverys", "unable to get Deliverys", error);
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

export const getDelivery = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Delivery ID",
        error: null,
        resObj: res,
        data: null,
      });
    const delivery = await Delivery.findOne({ _id: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Delivery",
      error: null,
      resObj: res,
      data: delivery,
    });
  } catch (error) {
    logging.error("Get Delivery", "unable to get Delivery", error);
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

export const deleteDelivery = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Delivery ID",
        error: null,
        resObj: res,
        data: null,
      });
    await Delivery.deleteOne({ _id: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Delivery is successfully deleted",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error("Delete Delivery", "unable to delete Delivery", error);
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
