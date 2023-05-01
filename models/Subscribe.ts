import mongoose, { Schema } from "mongoose";

import logging from "../config/logging";
import { ISubscribe } from "../interfaces/ISubscribe";

const SubscribeSchema: Schema = new Schema({
  subscriptionId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  activeDuration: {
    type: Number,
    required: true,
  },
  deliveredDates: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

SubscribeSchema.pre<ISubscribe>("save", async function (next) {
  next();
});

SubscribeSchema.post<ISubscribe>("save", function () {
  logging.info("Subscribe", "Subscribe just saved: ");
});

export default mongoose.model<ISubscribe>("Subscribe", SubscribeSchema);
