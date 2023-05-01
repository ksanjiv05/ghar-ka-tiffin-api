import mongoose, { Schema } from "mongoose";

import logging from "../config/logging";
import { IAddress } from "../interfaces/IAddress";

const ContactSchema: Schema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    default: "N/A",
  },
  address: {
    type: String,
    default: "N/A",
  },
  alernativePhone: {
    type: String,
    default: "N/A",
  },
  landmark: {
    type: String,
    default: "N/A",
  },
  state: {
    type: String,
  },

  city: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ContactSchema.pre<IAddress>("save", async function (next) {
  // const user = this;
  // if (user.isModified("password")) {
  //   user.password = await bcryptjs.hash(user.password, salt);
  // }
  next();
});

ContactSchema.post<IAddress>("save", function () {
  logging.info("Address", "Address just saved: ");
});

export default mongoose.model<IAddress>("Contact", ContactSchema);
