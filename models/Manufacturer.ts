import mongoose, { Schema } from "mongoose";

import logging from "../config/logging";
import { IManufacturer } from "../interfaces/IManufacturer";

const ManufacturerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    default: "N/A",
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

ManufacturerSchema.pre<IManufacturer>("save", async function (next) {
  // const user = this;
  // if (user.isModified("password")) {
  //   user.password = await bcryptjs.hash(user.password, salt);
  // }
  next();
});

ManufacturerSchema.post<IManufacturer>("save", function () {
  logging.info("Manufacturer", "Manufacturer just saved: ");
});

export default mongoose.model<IManufacturer>(
  "Manufacturer",
  ManufacturerSchema
);
