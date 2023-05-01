import mongoose, { Schema } from "mongoose";

import logging from "../config/logging";
import { IDelivery } from "../interfaces/IDelivery";

const DeliverySchema: Schema = new Schema({
  subscriptionId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  morning: {
    isDelivered: Boolean,
    isPaid: Boolean,
    amount: Number,
    transactionId: String,
  },
  afternoon: {
    isDelivered: Boolean,
    isPaid: Boolean,
    amount: Number,
    transactionId: String,
  },
  night: {
    isDelivered: Boolean,
    isPaid: Boolean,
    amount: Number,
    transactionId: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

DeliverySchema.pre<IDelivery>("save", async function (next) {
  next();
});

DeliverySchema.post<IDelivery>("save", function () {
  logging.info("Delivery", "Delivery just saved: ");
});

export default mongoose.model<IDelivery>("Delivery", DeliverySchema);
