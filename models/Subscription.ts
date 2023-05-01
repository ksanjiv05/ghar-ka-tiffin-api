import mongoose, { Schema } from "mongoose";

import logging from "../config/logging";
import { ISubscription } from "../interfaces/ISubcription";

const SubscriptionSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

SubscriptionSchema.pre<ISubscription>("save", async function (next) {
  next();
});

SubscriptionSchema.post<ISubscription>("save", function () {
  logging.info("Subscription", "Subscription just saved: ");
});

export default mongoose.model<ISubscription>(
  "Subscription",
  SubscriptionSchema
);
