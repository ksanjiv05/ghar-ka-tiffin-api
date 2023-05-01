import mongoose, { Schema } from "mongoose";

import logging from "../config/logging";
import { IOrder } from "../interfaces/IOrder";

const OrderSchema: Schema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  pid: {
    type: String,
    required: true,
  },
  status: [
    {
      state: {
        type: Number,
        required: true,
      },
      updateDate: {
        type: Date,
        default: Date.now,
      },
      description: {
        type: String,
        required: true,
      },
      title: String,
    },
  ],
  comment: {
    type: String,
  },
  expectedDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

OrderSchema.pre<IOrder>("save", async function (next) {
  // const user = this;
  // if (user.isModified("password")) {
  //   user.password = await bcryptjs.hash(user.password, salt);
  // }
  next();
});

OrderSchema.post<IOrder>("save", function () {
  logging.info("Order", "Order just saved: ");
});

export default mongoose.model<IOrder>("Order", OrderSchema);
